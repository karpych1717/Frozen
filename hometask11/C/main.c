#include <stdlib.h>

void diver (int *numbers, int length, int *result, int dive);

int main () {
  int length = 5;
  int numbers[5];

  for (int i = 0; i < length; i++) {
    numbers[i] = i + 1;
  }

  int dive;
  int *result = malloc(length * sizeof (int));

  for (int i = 0; i < length; i++) {
    result[0] = numbers[i];
    diver(numbers, length, result, 0);
  }

  free(result);
return 0;
}

void diver (int *numbers, int length, int *result, int dive) {

}