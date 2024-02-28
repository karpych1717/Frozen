#include <stdio.h>

typedef struct weirdo_1 {
    char chr;
    int dec;
} Weirdo_1;

typedef struct weirdo_2 {
    int dec;
    char chr;   
} Weirdo_2;

int main (void)
{
    // structure type 1
    Weirdo_1 structure_1;
    
    structure_1.chr = 'F';
    structure_1.dec = 666;

    printf("structure_1:\nchr: '%c', dec: %d\n", structure_1.chr, structure_1.dec);

    char *chr_1 = (char *) &structure_1;
    int *dec_1   = (int *) (chr_1 + 1);

    printf("weird 1:\nchr: '%c', dec: %d\n", *chr_1, *dec_1);


    // structure type 2
    Weirdo_2 structure_2;

    structure_2.chr = 'S';
    structure_2.dec = 777;

    printf("\nstructure_2:\ndec: '%d', chr: %c\n", structure_2.dec, structure_2.chr);

    int *dec_2   = (int *) &structure_2;
    char *chr_2 = (char *) (dec_2 + 1);
    

    printf("weird 2:\ndec: '%d', chr: %c\n", *dec_2, *chr_2);

    
    return 0;
}
