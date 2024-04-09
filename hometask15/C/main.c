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
    file = fopen("eq.dat", "r");
    if (file == NULL) printf("file??");
    int n;
    fscanf(file, "%d", &n);
    float** matrix = malloc(n*sizeof(float*));
    for (int i = 0; i < n; i++)
    {
        float* arr = malloc((n + 1)*sizeof(float));
        for (int j = 0; j < n + 1; j++)
        {
            fscanf(file, "%f", &arr[j]);
        }
        matrix[i] = arr;
    }
    equasion* eq = malloc(sizeof(equasion));
    eq->n = n;
    eq->arr = matrix;
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

void clear(equasion* eq)
{
    float k;
    for (int t = 0; t < eq->n; t++)
    {
        for (int i = 0; i < eq->n; i++)
        {
            if (i == t) continue;
            k = eq->arr[t][t] / eq->arr[i][t];
            for (int j = 0; j < eq->n + 1; j++)
            {
                eq->arr[i][j] = eq->arr[t][j] - eq->arr[i][j] * k;
                if (eq->arr[i][j] < 0.000001 && eq->arr[i][j] > -0.000001 && i == j) eq->arr[i][j] = 0.000001;
            }
        }
    }
    // O(n^3 - n)   :O
}

float* solve(equasion* eq)
{
    float* answer = malloc((eq->n) * sizeof(float));
    for (int i = 0; i < eq->n; i++)
    {
        answer[i] = eq->arr[i][eq->n] / eq->arr[i][i];
    }
    return answer;
}

int main (void)
{
    equasion* eq = setup();
    print(eq);
    clear(eq);
    print(eq);
    float* arr = solve(eq);
    for (int i = 0; i < eq->n; i++) printf("%f ", arr[i]);
    return 0;
}
