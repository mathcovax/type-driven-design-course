---
theme: nord
layout: center
---

# Type Driven Design

### Introduction

## C'est quoi ?

---

# Type Driven Design : Signification

<br/>
<br/>

### `Type Driven Design` === `conception guider pars le type`

<br/>
<br/>

En `Type Driven Design` quand vous concevez un logiciel, avant de coder, en priorité vous devez typé !

<br/>
<br/>

## Mais **Type** !== **Type**

---

# Type Driven Design : Typage machine

<br/>
<br/>

Traditionnellement, lorsque l'on parle de **typage**, on pense directement au **type machine**. 

Et c'est normal ! car en premier, c'est pour les machine que ça a été créé :

```c
int main() {
    int age = 23;
    char name[] = "Mathieu";

    return 0;
}
```

En premier, le typage a été inventé pour indiquer à la machine comment bien stocker en mémoire une valeur.

```
int age = 23; -> 17 00 00 00
char name[] = "Mathieu"; -> 4D 61 74 68 69 65 75 00
```

---

