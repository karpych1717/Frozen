#include <stdlib.h>
#include <stdio.h>
#include <math.h>

float f(float x)
{
    return x * x * x - 1;
}

float step(float x1, float x2)
{
    float y1 = f(x1);
    float k = (y1 - f(x2)) / (x1 - x2);
    float b = y1 - k * x1;
    return -b / k;
}

int main (void)
{

    float l = -5, r = 5, m;
    printf("%f%s%f\n", l, " ", r);
    for (int i = 0; i < 100; i++)
    {
        m = step(l, r);
        if (m < 0) l = m;
        else r = m;
        printf("%f%s%f\n", l, " ", r);
    }
    return 0;
}
