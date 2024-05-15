#define ENC_A 22
#define ENC_B 23
// #define NR_OF_PULSES_PER_ROTATION 20

volatile int8_t direction = 0;

// Defined as per https://www.youtube.com/watch?v=fgOfSHTYeio
void IRAM_ATTR read_encoder() {
  static uint8_t old_AB = 3;
  static int8_t encval = 0;
  static const int8_t enc_states[] = {0, -1, 1, 0, 1, 0, 0, -1, -1, 0, 0, 1, 0, 1, -1, 0};
  static int oldA = 1;
  static int oldB = 1;
  
  int a = digitalRead(ENC_A);
  int b = digitalRead(ENC_B);

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
    direction = 1;
    encval = 0;
  }
  // lower than 3 -> direction=1
  if(encval < -3) {
    direction = -1;
    encval = 0;
  }
}

void setup() {
  pinMode(ENC_A, INPUT_PULLUP);
  pinMode(ENC_B, INPUT_PULLUP);

  attachInterrupt(digitalPinToInterrupt(ENC_A), read_encoder, CHANGE);
  attachInterrupt(digitalPinToInterrupt(ENC_B), read_encoder, CHANGE);

  Serial.begin(115200);
  Serial.println("start");
}

void loop() {
  // If a direction was set, print it and set direction back to 0;
  if(direction != 0) {
    Serial.println(direction);
    direction = 0;
  }
}