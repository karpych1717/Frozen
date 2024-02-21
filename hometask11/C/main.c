#include <stdlib.h>
#include <stdio.h>

#include "blackBox.h"


void dive (int *numbers, int length, int *result, int dive);


int main (void)
{
    int length;
    int *numbers = NULL;
    int *result = NULL;

    prepare(&length, &numbers);
    result = malloc(length * sizeof (int));


    for (int i = 0; i < length; i++)
    {
        result[0] = numbers[i];
        dive(numbers, length, result, 0);
    }

    free(result);
    return 0;
}


void dive (int *numbers, int length, int *result, int depth)
{
    printf("dive (depth = %d) occures here.\n", depth);
    printf("current numbers array:\n");
    printArray(numbers, length); // for printing array "numbers" or "result"
}
