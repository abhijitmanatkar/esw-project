#include <Wire.h>
#include "max32664.h"
#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include "time.h"
#include <WiFiUdp.h>
#include <NTPClient.h>
#include <Arduino_JSON.h>



#define WIFI_TIMEOUT_MS 20000
#define SSID "zola"
#define PWD "18121999"

#define RESET_PIN 04
#define MFIO_PIN 02
#define RAWDATA_BUFFLEN 250

const char *CERT =
    "-----BEGIN CERTIFICATE-----\n"
    "MIIDdTCCAl2gAwIBAgILBAAAAAABFUtaw5QwDQYJKoZIhvcNAQEFBQAwVzELMAkG\n"
    "A1UEBhMCQkUxGTAXBgNVBAoTEEdsb2JhbFNpZ24gbnYtc2ExEDAOBgNVBAsTB1Jv\n"
    "b3QgQ0ExGzAZBgNVBAMTEkdsb2JhbFNpZ24gUm9vdCBDQTAeFw05ODA5MDExMjAw\n"
    "MDBaFw0yODAxMjgxMjAwMDBaMFcxCzAJBgNVBAYTAkJFMRkwFwYDVQQKExBHbG9i\n"
    "YWxTaWduIG52LXNhMRAwDgYDVQQLEwdSb290IENBMRswGQYDVQQDExJHbG9iYWxT\n"
    "aWduIFJvb3QgQ0EwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDaDuaZ\n"
    "jc6j40+Kfvvxi4Mla+pIH/EqsLmVEQS98GPR4mdmzxzdzxtIK+6NiY6arymAZavp\n"
    "xy0Sy6scTHAHoT0KMM0VjU/43dSMUBUc71DuxC73/OlS8pF94G3VNTCOXkNz8kHp\n"
    "1Wrjsok6Vjk4bwY8iGlbKk3Fp1S4bInMm/k8yuX9ifUSPJJ4ltbcdG6TRGHRjcdG\n"
    "snUOhugZitVtbNV4FpWi6cgKOOvyJBNPc1STE4U6G7weNLWLBYy5d4ux2x8gkasJ\n"
    "U26Qzns3dLlwR5EiUWMWea6xrkEmCMgZK9FGqkjWZCrXgzT/LCrBbBlDSgeF59N8\n"
    "9iFo7+ryUp9/k5DPAgMBAAGjQjBAMA4GA1UdDwEB/wQEAwIBBjAPBgNVHRMBAf8E\n"
    "BTADAQH/MB0GA1UdDgQWBBRge2YaRQ2XyolQL30EzTSo//z9SzANBgkqhkiG9w0B\n"
    "AQUFAAOCAQEA1nPnfE920I2/7LqivjTFKDK1fPxsnCwrvQmeU79rXqoRSLblCKOz\n"
    "yj1hTdNGCbM+w6DjY1Ub8rrvrTnhQ7k4o+YviiY776BQVvnGCv04zcQLcFGUl5gE\n"
    "38NflNUVyRRBnMRddWQVDf9VMOyGj/8N7yy5Y0b2qvzfvGn9LhJIZJrglfCm7ymP\n"
    "AbEVtQwdpf5pLGkkeB6zpxxxYu7KyJesF12KwvhHhm4qxFYxldBniYUr+WymXUad\n"
    "DKqC5JlR3XC321Y9YeRq4VzW9v493kHMB65jUr9TU/Qr6cf9tveCX4XSQRjbgbME\n"
    "HMUfpIBvFSDJ3gyICh3WZlXi/EjJKSZp4A==\n"
    "-----END CERTIFICATE-----\n";

String URL = "https://esw-onem2m.iiit.ac.in/~/in-cse/in-name/Team-23/Node-1/Data/";
String CREDS = "FYPudLSp3y:82LrMU7aZV";
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP);
//const char* ntpServer = "pool.ntp.org";

max32664 MAX32664(RESET_PIN, MFIO_PIN, RAWDATA_BUFFLEN);
const long  gmtOffset_sec = 19800;



bool connectToWiFi()
{
    if (WiFi.status() == WL_CONNECTED)
        return true;

    long unsigned startTime = millis();
    Serial.print("Connecting to Wifi");
    WiFi.begin(SSID, PWD);

    while (WiFi.status() != WL_CONNECTED && millis() - startTime < WIFI_TIMEOUT_MS)
    {
        Serial.print(".");
        delay(100);
    }

    if (WiFi.status() == WL_CONNECTED)
    {
        Serial.println("Connected!\n");
        return true;
    }

    Serial.println("Connection timed out!\n");
    return false;
}

void post(String url, String content)
{
    HTTPClient http;
    http.begin(url, CERT);
    http.addHeader("Content-Type", "application/json;ty=4");
    http.addHeader("X-M2M-Origin", CREDS);
    http.addHeader("Connection", "close");
    http.addHeader("Content-Length", String(content.length()));
    int httpResponseCode = http.POST(content);
    if (httpResponseCode > 0)
    {
        String response = http.getString();
        Serial.println(httpResponseCode);
        Serial.println(response);
    }
    else
    {
        Serial.print("Error on sending POST: ");
        Serial.println(httpResponseCode);
    }
    http.end();
}



void mfioInterruptHndlr(){
  //Serial.println("i");
}

void enableInterruptPin(){

  //pinMode(mfioPin, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(MAX32664.mfioPin), mfioInterruptHndlr, FALLING);

}

void loadAlgomodeParameters(){

  algomodeInitialiser algoParameters;
  /*  Replace the predefined values with the calibration values taken with a reference spo2 device in a controlled environt.
      Please have a look here for more information, https://pdfserv.maximintegrated.com/en/an/an6921-measuring-blood-pressure-MAX32664D.pdf
      https://github.com/Protocentral/protocentral-pulse-express/blob/master/docs/SpO2-Measurement-Maxim-MAX32664-Sensor-Hub.pdf
  */

  algoParameters.calibValSys[0] = 120;
  algoParameters.calibValSys[1] = 122;
  algoParameters.calibValSys[2] = 125;

  algoParameters.calibValDia[0] = 80;
  algoParameters.calibValDia[1] = 81;
  algoParameters.calibValDia[2] = 82;

  algoParameters.spo2CalibCoefA = 1.5958422;
  algoParameters.spo2CalibCoefB = -34.659664;
  algoParameters.spo2CalibCoefC = 112.68987;

  MAX32664.loadAlgorithmParameters(&algoParameters);
}
String getJson(float timestamp, float sys, float dia, float hr, float sp, float skin_con)
{
    JSONVar bp;
    bp["sys"] = sys;
    bp["dia"] = dia;

    JSONVar con;
    con["bp"] = bp;
    con["pulse"] = hr;
    con["spo2"] = sp;
    con["conductance"] = skin_con;

    JSONVar inner;
    inner["con"] = JSON.stringify(con);

    JSONVar outer;
    outer["m2m:cin"] = inner;

    String jsonString = JSON.stringify(outer);
    return jsonString;
}



void setup(){

  Serial.begin(9600);
  WiFi.mode(WIFI_STA);

  while (!connectToWiFi())
      delay(1000);
  Serial.println("Connected to Wifi");
    

  Wire.begin();
  pinMode(33, INPUT);
  loadAlgomodeParameters();

  int result = MAX32664.hubBegin();
  if (result == CMD_SUCCESS){
    Serial.println("Sensorhub begin!");
  }else{
    //stay here.
    while(1){
      Serial.println("Could not communicate with the sensor! please make proper connections");
      delay(5000);
    }
  }

  bool ret = MAX32664.startBPTcalibration();
  while(!ret){

    delay(10000);
    Serial.println("failed calib, please retsart");
    //ret = MAX32664.startBPTcalibration();
  }
  //init and get the time
  //configTime(gmtOffset_sec, 0 , ntpServer);
  timeClient.begin();


  delay(1000);

  //Serial.println("start in estimation mode");
  ret = MAX32664.configAlgoInEstimationMode();
  while(!ret){

    //Serial.println("failed est mode");
    ret = MAX32664.configAlgoInEstimationMode();
    delay(10000);
  }

  //MAX32664.enableInterruptPin();
  Serial.println("Getting the device ready..");
  delay(1000);
}

void loop(){

  uint8_t num_samples = MAX32664.readSamples();
  double sys = -1 , dia =  -1, hr = -1 , sp = -1;

  if(num_samples){
	
    sys = MAX32664.max32664Output.sys;
    dia = MAX32664.max32664Output.dia;
    hr = MAX32664.max32664Output.hr;
    sp = MAX32664.max32664Output.spo2;
    Serial.print("sys = ");
    Serial.print(sys);
    Serial.print(", dia = ");
    Serial.print(dia);
    Serial.print(", hr = ");
    Serial.print(hr);
    Serial.print(" spo2 = ");
    Serial.println(sp);
    

  }
  // gsr vlue
  double sum = 0;
  for(int i = 0; i < 10; i++ ) {
    double sensorValue=  analogRead( 33 );
    sum += sensorValue;
    delay(5);
  }
  Serial.println( sum / 10.0 );
  int skin_con = sum / 10;
  timeClient.forceUpdate();
  int timestamp = timeClient.getEpochTime();
  String con = "{ \"timestamp\":" + String(timestamp) + ", \"bp\": { \"sys\": " + String(sys) + " , \"dia\": " + String(dia) + " }, \"pulse\": " + String(hr) + ", \"spo2\": " + String(sp) + " , \"conductance\": " + String(skin_con) + " }";

 String json = getJson(timestamp, sys, dia, hr, sp, skin_con);
  Serial.println(json);
  post(URL, json);
  delay(1000);
}