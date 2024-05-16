#include <cstdint>
#define ENC_A1 22
#define ENC_B1 23
#define ENC_A2 19
#define ENC_B2 21
#define ENC_A3 5
#define ENC_B3 18
// #define NR_OF_PULSES_PER_ROTATION 20

volatile int8_t inputNumber = 0;
volatile int8_t direction = 0;

// Defined as per https://www.youtube.com/watch?v=fgOfSHTYeio
void IRAM_ATTR read_encoder(int enca, int encb, int inputNr) {
  static uint8_t old_AB = 3;
  static int8_t encval = 0;
  static const int8_t enc_states[] = {0, -1, 1, 0, 1, 0, 0, -1, -1, 0, 0, 1, 0, 1, -1, 0};
  static int oldA = 1;
  static int oldB = 1;
  
  int a = digitalRead(enca);
  int b = digitalRead(encb);

  // only trigger if there is an actual change
  if (a != oldA || b != oldB){
    
    // shift current state to the left 000000ab -> 0000ab00
    old_AB <<=2;

    // add either 01 or 10 to as the last to bits
    if (a==1) old_AB |= 0x02; // 0000ab10
    if (b==1) old_AB |= 0x01; // 0000ab01

    uint8_t index = (old_AB & 0x0f); // take the number of the right most 4 bits as the index (0-15)
    encval += enc_states[ index ];
    
    oldA = a;
    oldB = b;
  }
  
  // after 4 steps a full step was taken.
  // higher than 3 -> direction=1
  if(encval > 3) {
    inputNumber = inputNr;
    direction = 1;
    encval = 0;
  }
  // lower than 3 -> direction=1
  if(encval < -3) {
    inputNumber = inputNr;
    direction = -1;
    encval = 0;
  }
}

void IRAM_ATTR read_encoder1() {
  read_encoder(ENC_A1, ENC_B1, 1);
}

void IRAM_ATTR read_encoder2() {
  read_encoder(ENC_A2, ENC_B2, 2);
}

void IRAM_ATTR read_encoder3() {
  read_encoder(ENC_A3, ENC_B3, 3);
}

void setup() {
  pinMode(ENC_A1, INPUT_PULLUP);
  pinMode(ENC_B1, INPUT_PULLUP);
  pinMode(ENC_A2, INPUT_PULLUP);
  pinMode(ENC_B2, INPUT_PULLUP);
  pinMode(ENC_A3, INPUT_PULLUP);
  pinMode(ENC_B3, INPUT_PULLUP);

  attachInterrupt(digitalPinToInterrupt(ENC_A1), read_encoder1, CHANGE);
  attachInterrupt(digitalPinToInterrupt(ENC_B1), read_encoder1, CHANGE);

  attachInterrupt(digitalPinToInterrupt(ENC_A2), read_encoder2, CHANGE);
  attachInterrupt(digitalPinToInterrupt(ENC_B2), read_encoder2, CHANGE);

  attachInterrupt(digitalPinToInterrupt(ENC_A3), read_encoder3, CHANGE);
  attachInterrupt(digitalPinToInterrupt(ENC_B3), read_encoder3, CHANGE);

  Serial.begin(115200);
  Serial.println("start");
}

void loop() {
  // If a direction was set, print it and set direction back to 0;
  if(direction != 0 && inputNumber != 0) {
    Serial.print(inputNumber);
    Serial.print(":");
    Serial.println(direction);
    direction = 0;
    inputNumber = 0;
  }
}