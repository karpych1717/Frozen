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
float interpolated (Equasion *solved, float argument);


int main (void)
{
    Dots* dots = getData();
    Equasion* eq = setUp(dots);

    solve(eq);

    // вивести в файл result.dat набір 100 точок з інтервалу
    // циклом, з допомогою interpolated(eq, argument)
    
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
    eq->matrix = malloc( eq->n * sizeof(float*));

    for (int i = 0; i < eq->n; i++)
    {
        eq->matrix[i] = malloc(eq->n * sizeof(float*) + sizeof(float*));
    }

    //
    //

    return eq;
}

void solve (Equasion *eq)
{
    //
    //

}

float interpolated (Equasion *solved, float argument) {
    float result;

    //

    return result;
}
