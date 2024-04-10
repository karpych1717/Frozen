#include <stdlib.h>
#include <stdio.h>
#include <math.h>

float p(float x)
{
    return 2 * x * x * x - x * x + 20 * x - 50;
}

float pd(float x)
{
    return 6 * x * x - 2 * x + 20;
}

float division(float (*f)(float), float l, float r)
{
    float m;
    int iterations = 0;
    while (1 == 1)
    {
        iterations++;
        m = (l + r) / 2;
        if (f(m)*f(l) > 0)
        {
            if (l - m < 0.001 && m - l < 0.001) break;
            l = m;
        } else {
            if (r - m < 0.001 && m - r < 0.001) break;
            r = m;
        }
    }
    printf("%s%d%s%f%s%f\n", "Finished after ", iterations, " iterations, with answer ", m, ", that gets value ", f(m));
    return m;
}

float chord(float (*f)(float), float l, float r)
{
    float y, k, b, m;
    int iterations = 0;
    while (1 == 1)
    {
        iterations++;
        y = f(l);
        k = (f(r) - y) / (r - l);
        b = y - k * l;
        m = -b / k;
        if (m < 0)
        {
            if (l - m < 0.001 && m - l < 0.001) break;
            l = m;
        } else {
            if (r - m < 0.001 && m - r < 0.001) break;
            r = m;
        }
    }
    printf("%s%d%s%f%s%f\n", "Finished after ", iterations, " iterations, with answer ", m, ", that gets value ", f(m));
    return m;
}

float newton(float (*f)(float), float (*fd)(float), float x)
{
    float k, b, m;
    int iterations = 0;
    while (1 == 1)
    {
        iterations++;
        k = fd(x);
        b = f(x) - k * x;
        m = -b / k;
        if (x - m < 0.001 && m - x < 0.001) break;
        x = m;
    }
    printf("%s%d%s%f%s%f\n", "Finished after ", iterations, " iterations, with answer ", m, ", that gets value ", f(m));
    return m;
}

int main (void)
{

    float l = -10, r = 10, ans;
    printf("\n");

    printf("%s%f%s%f\n", "Running <Division> method, with values : ", l, " ", r);
    ans = division(&p, l, r);
    printf("\n");

    printf("%s%f%s%f\n", "Running <Chord> method, with values : ", l, " ", r);
    ans = chord(&p, l, r);
    printf("\n");

    printf("%s%f\n", "Running <Newton> method, with value : ", r);
    ans = newton(&p, &pd, r);
    printf("\n");
    
    return 0;
}
