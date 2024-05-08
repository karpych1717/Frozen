#include <stdlib.h>
#include <stdio.h>
#include <math.h>

typedef struct equasion
{
    int n;
    float** matrix;
} Equasion;

typedef struct dots
{
    int n;
    float* x;
    float* y;
} Dots;

// prototypes here, a code is below the main
Dots* getData();
Equasion* setUp (Dots* dots);
void solve (Equasion *eq);
float interpolated (Equasion* solved, float argument);


int main (void)
{
    Dots* dots = getData();
    Equasion* eq = setUp(dots);

    solve(eq);

    // вивести в файл result.dat набір 100 точок з інтервалу
    // циклом, з допомогою interpolated(eq, argument)

    FILE *result;
    result = fopen("result.csv", "w");

    fprintf(result, "x, y\n");
    for (int i = -49; i <= 50; i++)
    {
        fprintf(result, "%d, %f\n", i, interpolated(eq, i));
    }
    
    return 0;
}


Dots* getData()
{
    FILE *file;
    file = fopen("input.dat", "r");
    if (file == NULL) printf("file??");

    Dots* dots = malloc(sizeof(Dots));
    fscanf(file, "%d", &(dots->n));

    dots->x = malloc(dots->n * sizeof(float));
    dots->y = malloc(dots->n * sizeof(float));
    
    for (int i = 0; i < dots->n; i++)
    {
        fscanf(file, "%f", &(dots->x[i]));
        fscanf(file, "%f", &(dots->y[i]));
    }

    return dots;
}

Equasion* setUp (Dots* dots)
{
    Equasion* eq = malloc(sizeof(Equasion));

    eq->n = 2 * (dots->n - 1);
    eq->matrix = malloc(eq->n * sizeof(float*));

    for (int i = 0; i < eq->n; i++)
    {
        eq->matrix[i] = malloc(eq->n * sizeof(float*) + sizeof(float*));
    }

    float matrix[6][7] = {{dots->x[0] * dots->x[0],      dots->x[0],       1,                       0,               0,       0,      dots->y[0]},\
                          {         2 * dots->x[1],               1,       0,         -2 * dots->x[1],              -1,       0,               0},\
                          {dots->x[1] * dots->x[1],      dots->x[1],       1,                       0,               0,       0,      dots->y[1]},\
                          {                      1,               0,       0,                      -1,               0,       0,               0},\
                          {                      0,               0,       0, dots->x[1] * dots->x[1],      dots->x[1],       1,      dots->y[1]},\
                          {                      0,               0,       0, dots->x[2] * dots->x[2],      dots->x[2],       1,      dots->y[2]}};
    
    for (int i = 0; i < eq->n; i++)
    {
        for (int j = 0; j < eq->n; j++)
        {
            eq->matrix[i][j] = matrix[i][j];
        }
    }

    return eq;
}

void solve (Equasion *eq)
{
    float k;
    for (int t = 0; t < eq->n; t++)
    {
        for (int i = 0; i < eq->n; i++)
        {
            if (i == t) continue;
            k = eq->matrix[i][t] / eq->matrix[t][t];
            for (int j = 0; j < eq->n + 1; j++)
            {
                eq->matrix[i][j] = eq->matrix[i][j] - eq->matrix[t][j] * k;
            }
        }
    }

    // O(n^3 - n)   :O

    for (int i = 0; i < eq->n; i++)
    {
        eq->matrix[i][0] =  eq->matrix[i][eq->n] / eq->matrix[i][i];
    }

}

float interpolated (Equasion* solved, float argument) {
    float result = 0, arg = 1;

    for (int i = solved->n - 1; i >= 0; i--)
    {
        result += solved->matrix[i][0] * arg;
        arg *= argument;
    }

    return result;
}
