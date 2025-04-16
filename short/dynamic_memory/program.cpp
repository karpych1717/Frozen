#include <bits/stdc++.h>
using namespace std;

class dynamic_memory {
private:
    int* data;
    int length;
public:
    dynamic_memory (int size) {
        length = size;
        data = (int*)malloc(length * sizeof(int));
    }

    ~dynamic_memory () {
        delete(data);
    }

    void append(int value) {
        int* data2;
        data2 = (int*)malloc((length + 1) * sizeof(int));
        data2[length] = value;
        for (int i = 0; i < length; i++) {
            data2[i] = data[i];
        }
        data = data2;
    }

    void set(int index, int value) {
        if (index >= length) {
            std::cout << "\a";
            return;
        }
        data[index] = value;
    }

    int get(size_t index) {
        if (index >= length) {
            cout << "\a";
            return 0;
        }
        return data[index];
    }

    int size() {
        return length;
    }
};

int main() {
    return 0;
}