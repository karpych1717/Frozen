#include <stdlib.h>
#include <stdio.h>
#include <math.h>

typedef struct equasion
{
    int n;
    float** arr;
} equasion;

equasion* setup()
{
    FILE *file;
    file = fopen("input.dat", "r");
    if (file == NULL) printf("file??");

    int n;
    float x1, y1, x2, y2, x3, y3;
    fscanf(file, "%d", &n);
    fscanf(file, "%f", &x1);
    fscanf(file, "%f", &y1);
    fscanf(file, "%f", &x2);
    fscanf(file, "%f", &y2);
    fscanf(file, "%f", &x3);
    fscanf(file, "%f", &y3);

    float matrix[6][7] = {{x1 * x1,      x1,       1,       0,       0,       0,      y1},\
                          { 2 * x2,       1,       0, -2 * x2,      -1,       0,       0},\
                          {x2 * x2,      x2,       1,       0,       0,       0,      y2},\
                          {      1,       0,       0,      -1,       0,       0,       0},\
                          {      0,       0,       0, x2 * x2,      x2,       1,      y2},\
                          {      0,       0,       0, x3 * x3,      x3,       1,      y3}};
    
    float** array = malloc(6 * sizeof(float*));
    for (int i = 0; i < 6; i++)
    {
        float* arr = malloc(7 * sizeof(float));
        for (int j = 0; j < 7; j++)
        {
            arr[j] = matrix[i][j];
        }
        array[i] = arr;
    }
    
    equasion* eq = malloc(sizeof(equasion));
    eq->n = 6;
    eq->arr = array;

    return eq;
}

void print(equasion* eq)
{
    for (int i = 0; i < eq->n; i++)
    {
        for (int j = 0; j < eq->n + 1; j++)
        {
            printf("%f ", eq->arr[i][j]);
        }
        printf("\n");
    }
    printf("\n");
}

float* solve(equasion* eq)
{
    float k;
    for (int t = 0; t < eq->n; t++)
    {
        for (int i = 0; i < eq->n; i++)
        {
            if (i == t) continue;
            k = eq->arr[i][t] / eq->arr[t][t];
            for (int j = 0; j < eq->n + 1; j++)
            {
                eq->arr[i][j] = eq->arr[i][j] - eq->arr[t][j] * k;
            }
        }
    }

    // O(n^3 - n)   :O

    float* answer = malloc((eq->n) * sizeof(float));
    for (int i = 0; i < eq->n; i++)
    {
        answer[i] = eq->arr[i][eq->n] / eq->arr[i][i];
    }
    return answer;
}

float point(float* arr, float x)
{
    return arr[0] * x * x + arr[1] * x + arr[2];
}

int main (void)
{
    equasion* eq = setup();
    print(eq);
    float* arr = solve(eq);
    for (int i = 0; i < eq->n; i++) printf("%f ", arr[i]);
    return 0;
}
