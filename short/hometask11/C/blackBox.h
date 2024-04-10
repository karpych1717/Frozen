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

void prepare (int *length, int **numbers)
{
    FILE *file;

    file = fopen("numbers.dat", "r");

    if (file == NULL)
    {
        printf("file??");
    }

    fscanf(file, "%d", length);
    printf("got length = %d\n", *length);

    *numbers = (int *) malloc(*length * sizeof (int));

    for(int i = 0; i < *length; i++)
    {
        fscanf(file, "%d", *numbers + i);
    }

    printf("got input data:\n");
    printArray(*numbers, *length);

    fclose(file);
}
