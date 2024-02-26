#include <stdlib.h>
#include <stdio.h>

#include "blackBox.h"
int check(int number, int *result, int depth)
{
    for (int i = 0; i < depth; i++) if (number == result[i]) return 1;
    return 0;
}

void dive (int *numbers, int length, int *result, int depth)
{
    if (depth < length) {
        for (int i = 0; i < length; i++) {
            if (check(numbers[i], result, depth) == 0) {
                result[depth] = numbers[i];
                dive(numbers, length, result, depth + 1);
            }
        }
    } else printArray(result, length);
}


int main (void)
{
    int length;
    int *numbers = NULL;
    int *result = NULL;

    prepare(&length, &numbers);
    result = (int *) malloc(length * sizeof (int));


    for (int i = 0; i < length; i++)
    {
        result[0] = numbers[i];
        dive(numbers, length, result, 1);
    }

    free(numbers);
    free(result);
    return 0;
}
