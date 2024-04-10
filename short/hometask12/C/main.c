#include <stdlib.h>
#include <stdio.h>

typedef struct longn
{
    char isPositiv;
    int arr[1024];
    int len;
} longn;

void setup (int number, longn *longnum)
{
    clear(longnum, 1024);

    longnum->isPositiv = 1;
    if (number < 0) {longnum->isPositiv = 0; number = 0 - number;}

    longnum->len = 0;
    if (number == 0) longnum->len = 1;
    while (number > 0) {
        longnum->arr[longnum->len] = number % 10;
        number /= 10;
        longnum->len++;
    }
}

void clear (longn *longnum, int length)
{
    for (int i = 0; i < length; i++) longnum->arr[i] = 0;
}

void print (longn *longnum)
{
    if (longnum->isPositiv == 0) printf("-");
    for (int i = longnum->len - 1; i >= 0; i--) printf("%d", longnum->arr[i]);
}

char compare (longn *lnum1, longn *lnum2)
{
    if (lnum1->len > lnum2->len) return 1;
    if (lnum1->len < lnum2->len) return 0;
    for (int i=lnum1->len - 1; i >= 0; i--) {
        if (lnum1->arr[i] > lnum2->arr[i]) return 1;
        if (lnum1->arr[i] < lnum2->arr[i]) return 0;
    }
    return 2;
}

void add (longn *lnum1, longn *lnum2)
{
    if (lnum1->isPositiv == lnum2->isPositiv)
    {
        for (int i = 0; i < 1024; i++)
        {
            if (i >= lnum2->len && lnum1->arr[i] < 10) break;
            lnum1->arr[i] += lnum2->arr[i];
            if (i >= lnum1->len) lnum1->len = i + 1;
            if (lnum1->arr[i] > 9)
            {
                lnum1->arr[i] -= 10;
                if (i != 1023)
                {
                    lnum1->arr[i + 1]++;
                    if (i + 1 >= lnum1->len) lnum1->len = i + 2;
                } else lnum1->isPositiv = 'E';
            }
        }
    } else {
        lnum2->isPositiv = lnum1->isPositiv;
        subtract(lnum1, lnum2);
    }
}

void subtract (longn *lnum1, longn *lnum2)
{
    if (lnum1->isPositiv == lnum2->isPositiv)
    {
        if (compare(lnum1, lnum2) != 0)
        {
            for (int i = 0; i < 1024; i++) {
                if (i >= lnum2->len && lnum1->arr[i] >= 0) break;
                lnum1->arr[i] = lnum1->arr[i] - lnum2->arr[i];
                if (lnum1->arr[i] < 0) {
                    lnum1->arr[i] += 10;
                    if (i != 1023) lnum1->arr[i + 1]--;
                    else lnum1->isPositiv = 'E';
                }
            }
        } else
        {
            lnum1->isPositiv = (lnum1->isPositiv + 1) % 2;
            for (int i = 0; i < 1024; i++) {
                if (i >= lnum2->len && lnum1->arr[i] >= 0) break;
                lnum1->arr[i] = lnum2->arr[i] - lnum1->arr[i];
                if (lnum1->arr[i] < 0) {
                    lnum1->arr[i] += 10;
                    if (i != 1023) lnum1->arr[i + 1]++;
                    else lnum1->isPositiv = 'E';
                }
            }
        }
        while (lnum1->arr[lnum1->len - 1] == 0 && lnum1->len > 1) lnum1->len--;
    } else {
        lnum2->isPositiv = lnum1->isPositiv;
        add(lnum1, lnum2);
    }
}

void multiply (longn *lnum1, longn *lnum2)
{
    int multiplied[1024] = {0}, length = lnum1->len + lnum2->len - 1;
    if (length <= 1024)
    {
        for (int i = 0; i < lnum1->len; i++)
        {
            for (int j = 0; j < lnum2->len; j++)
            {
                multiplied[i + j] += lnum1->arr[i] * lnum2->arr[j];
            }
        }
        clear(lnum1, lnum1->len);
        for (int i = 0; i < 1024; i++)
        {
            lnum1->arr[i] += multiplied[i];
            if (lnum1->arr[i] > 9)
            {
                if (i > 1023) {lnum1->isPositiv = 'E'; break;}
                lnum1->arr[i + 1] += lnum1->arr[i] / 10;
                if (i + 1 >= length) length = i + 2;
                lnum1->arr[i] %= 10;
            }
        }
    } else lnum1->isPositiv = 'E';
    lnum1->isPositiv = 1 - (lnum1->isPositiv + lnum2->isPositiv) % 2;
    lnum1->len = length;
}

void divide (longn *lnum1, longn *lnum2)
{
    if (lnum2->arr[0] == 0 && lnum2->len == 1) lnum1->isPositiv = 'E';
    else
    {
        longn ten;
        longn lnum3;
        longn lnum3a;
        longn lnum3b;
        longn lnum3c;
        longn divided;
        setup(10, &ten);
        setup(0, &lnum3);
        setup(0, &divided);
        while (compare(lnum1, lnum2) != 0)
        {
            setup(0, &lnum3);
            setup(1, &lnum3b);
            add(&lnum3, lnum2);
            while (compare(&lnum3, lnum1) == 0) {multiply(&lnum3, &ten); multiply(&lnum3b, &ten);}
            if (compare(&lnum3, lnum1) == 1)
            {
                setup(0, &lnum3a);
                add(&lnum3a, &lnum3);
                lnum3a.len--;
                for (int i = 0; i < lnum3a.len; i++) lnum3a.arr[i] = lnum3a.arr[i + 1];
                setup(0, &lnum3c);
                add(&lnum3c, &lnum3b);
                lnum3c.len--;
                for (int i = 0; i < lnum3c.len; i++) lnum3c.arr[i] = lnum3c.arr[i + 1];
                lnum3c.arr[lnum3c.len] = 0;
                while (compare(&lnum3, lnum1) == 1) {subtract(&lnum3, &lnum3a); subtract(&lnum3b, &lnum3c);}
            }
            add(&divided, &lnum3b);
            subtract(lnum1, &lnum3);
        }
        clear(lnum1, lnum1->len);
        lnum1->len = 1;
        lnum1->isPositiv = 1 - (lnum1->isPositiv + lnum2->isPositiv) % 2;
        add(lnum1, &divided);
    }
}

int main (void)
{
    int n1=2, n2=2;
    longn a, b;
    setup(n1, &a);
    setup(n2, &b);

    printf("number 1 : ");
    print(&a);
    printf("\n");
    printf("number 2 : ");
    print(&b);
    printf("\n");

    add(&a, &b);
    printf("answered : ");
    print(&a);

    return 0;
}
