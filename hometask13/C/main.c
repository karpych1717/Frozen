#include <stdlib.h>
#include <stdio.h>
#include <math.h>
float f(float t)
{
    return 1000 - 4.9 * t * t;
}
int main (void)
{
    FILE *file1 = fopen("derivative.csv", "w");
    FILE *file2 = fopen("function.csv", "w");
    float dx = 0.8;
    float d = 0;    
    fprintf(file1, "y, x\n");
    fprintf(file2, "x, y\n");
    for (float x = 0; x <= 20; x += dx)
    {
        d = d + cos(x) * dx;
        fprintf(file1, "%f, %f\n", x, cos(x));
        fprintf(file2, "%f, %f\n", x, d);
    }
    free(file1);
    free(file2);
    return 0;
}
