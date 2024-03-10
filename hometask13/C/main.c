#include <stdlib.h>
#include <stdio.h>
float f(float t)
{
    return 1000 - 4.9 * t * t;
}
int main (void)
{
    FILE *file = fopen("output.csv", "w");
    float dx = 0.3;
    float p,v,vold=0,a;
    for (float x = 0; x <= 300; x += dx)
    {
        p = f(x);
        v = (f(x + dx) - f(x)) / dx;
        a = (vold - v) / dx;
        vold = v;
        fprintf(file, "%f, %f, %f, %f\n", x, p, v, a);
    }
    return 0;
}
