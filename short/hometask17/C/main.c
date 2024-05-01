#include <stdlib.h>
#include <stdio.h>
#include <math.h>

typedef struct equasion
{
    int n;
    float* x;
    float* y;
} equasion;

equasion* setup()
{
    FILE *file;
    file = fopen("input.dat", "r");
    if (file == NULL) printf("file??");

    int n;
    fscanf(file, "%d", &n);

    float* x = malloc(n * sizeof(float));
    float* y = malloc(n * sizeof(float));
    
    for (int i = 0; i < n; i++)
    {
        fscanf(file, "%f", &x[i]);
        fscanf(file, "%f", &y[i]);
    }
    
    equasion* eq = malloc(sizeof(equasion));

    eq->n = n;
    eq->x = x;
    eq->y = y;

    return eq;
}

int main (void)
{
    equasion* eq = setup();
    return 0;
}
