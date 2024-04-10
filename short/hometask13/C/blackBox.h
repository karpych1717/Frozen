#include <stdlib.h>
#include <stdio.h>

void printArray (int *numbers, int length)
{
    for (int i = 0; i < length; i++)
    {
        printf("%d ", numbers[i]);
    }

    printf("\n\n");
}

void prepare (int *n1, int *n2)
{
    FILE *file;

    file = fopen("numbers.dat", "r");

    if (file == NULL)
    {
        printf("file??");
    }

    fscanf(file, "%d", n1);
    fscanf(file, "%d", n2);
    printf("number 1 = %d\n", *n1);
    printf("number 2 = %d\n", *n2);

    fclose(file);
}
