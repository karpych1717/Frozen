#include <bits/stdc++.h>
using namespace std;

class dynamic_memory {
private:
    int* data;
    int length;
public:
    dynamic_memory (int l) {
        length = l;
        data = (int*)malloc(length * sizeof(int));
    }

    ~dynamic_memory () {
        free(data);
    }

    void append(int value) {
        int* data2;
        data2 = (int*)malloc((length + 1) * sizeof(int));
        data2[length] = value;
        for (int i = 0; i < length; i++) {
            data2[i] = data[i];
        }
        data = data2;
        length++;
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
    int n, x;
    cin >> n;
    dynamic_memory num(n);
    for (int i = 0; i < n; i++) {
        cin >> x;
        num.set(i, x);
    }
    num.append(123);
    for (int i = 0; i < num.size(); i++) {
        cout << num.get(i) << " ";
    }
    cout << "\n";
    return 0;
}
