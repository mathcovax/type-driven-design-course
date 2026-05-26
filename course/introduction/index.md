---
theme: nord
layout: center
logo: false
---

# Type Driven Design

### Introduction

## C'est quoi ?

Avec Duplojs

<img v-drag="[446,320,40,40]" src="./images/duplojs.svg"/>

---

# Type Driven Design : **Signification**

<br/>
<br/>

### `Type Driven Design` === `conception guidée par le type`

<br/>
<br/>

En `Type Driven Design`, quand vous concevez un logiciel, avant de coder, en priorité vous devez typer !

<br/>
<br/>

## Mais **Type** !== **Type**

---

# Type Driven Design : **Typage machine**

<br/>
<br/>

Traditionnellement, lorsque l'on parle de **typage**, on pense directement au **type machine**. 

Et c'est normal ! Car, au départ, c'est pour les machines que ça a été créé :

```c
int main() {
    int age = 23;
    char name[] = "Mathieu";

    return 0;
}
```

Le **typage** a été inventé pour indiquer à la machine comment bien stocker en mémoire une valeur.

```
int age = 23; -> 17 00 00 00
char name[] = "Mathieu"; -> 4D 61 74 68 69 65 75 00
```

### Mais l'utilisation du typage a vite été détournée !

---

# Type Driven Design : **Un allié de la conception**

<br/>

Un nouvel usage a vite été trouvé ! Certes, il permettait d'indiquer à la machine comment le ranger, mais il permettait aux développeurs de réfléchir de manière plus **structurée**.

```ts
interface User {
    name: string
    age: string
}
```
Le **typage** prend ici une autre dimension. Il crée l'**identité** d'une **donnée** en nommant et regroupant plusieurs valeurs.

**TypeScript** est un exemple parfait : le **typage** n'a aucune utilité au runtime et n'est qu'un **outil** pendant le **développement**.

---

# Type Driven Design : **Le meilleur outil de développement**

L'**atout** principal du **typage**, c'est qu'il intervient lors de la phase de **développement**. 

Ce qui était avant un prérequis pour la cohérence de la mémoire devient aujourd'hui des **obligations** !

```ts twoslash
const value: string = "value";
declare function superFunction (input: number): void
superFunction(value);
```

Et les **obligations**/**types** étant des informations **explicites**, il est donc tout à fait possible de lancer un programme sans qu'il n'y ait d'**erreur**, car sinon, votre **compilateur** vous aurait averti en amont.

---
layout: center
---

# Finalement, on fait tous déjà un
# peu de `type driven design` ?

### Spoiler : Absolument pas !

---
layout: two-cols-header
---

# Type Driven Design : **C'est plus que ça**

On pourrait croire que ça se résume à créer des **interfaces** et des **types** pour les `entrées` et `sorties` de nos méthodes/fonctions, afin que le `code métier` à l'intérieur puisse s'**exécuter** plus **sereinement** !

### Pour être sereins, il faudrait que le code exécuté à l'intérieur soit aussi contraint.

::left::
```ts
interface Order {
    id: string;
    createdAt: Date;
    state: "validated" | "inProgress";
    validateDate?: Date;
    paymentMethod?: string;
}

```
::right::
```ts twoslash
interface Order {
    id: string;
    createdAt: Date;
    state: "validated" | "inProgress";
    validateDate?: Date;
    paymentMethod?: string;
}
// ---cut---
function confirmOrder(order: Order): Order {
    return {
        id: order.id,
        createdAt: order.createdAt,
        state: "inProgress",
        paymentMethod: "trololo",
    };  
}
```
Avec une donnée mal pensée, c'est donc **impossible** d'être **serein**.

Il vous faudra **multiplier** les `tests unitaires` !

<style>
.two-cols-header {
  column-gap: 10px;
}
</style>

---
layout: two-cols-header
---

# Type Driven Design : **Sécurisation de la donnée**

En identifiant correctement les différents **états** de la **donnée**, il est donc impossible pour notre cas de se tromper !

::left::
```ts
interface InProgressOrder {
    id: string;
    createdAt: Date;
    state: "inProgress";
}

interface ValidatedOrder {
    id: string;
    createdAt: Date;
    state: "validated";
    validateDate: Date;
    paymentMethod: "bankTransfer" | "creditCard";
}
```
::right::
```ts twoslash
interface InProgressOrder {
    id: string;
    createdAt: Date;
    state: "inProgress";
}

interface ValidatedOrder {
    id: string;
    createdAt: Date;
    state: "validated";
    validateDate: Date;
    paymentMethod: "bankTransfer" | "creditCard";
}
// ---cut---
function confirmOrder(order: InProgressOrder): ValidatedOrder {
    return {
        id: order.id,
        createdAt: order.createdAt,
        state: "inProgress",
        paymentMethod: "trololo",
    };  
}

```

Là, on peut commencer à être serein !

<style>
.two-cols-header {
  column-gap: 10px;
}
</style>

---

# Type Driven Design : **Points essentiels**

La plupart des logiciels sont grosso modo des programmes qui font transiter de la donnée d'**état** en **état**.

Si vous arrivez à **identifier** tous les **états** et à **structurer** votre **donnée** afin qu'elle soit **discriminable** le plus **simplement** possible, le reste ne sera que de l'**implémentation** bête et méchante, impossible à rater !

```ts twoslash
interface InProgressOrder {
    id: string;
    createdAt: Date;
    state: "inProgress";
}

interface ValidatedOrder {
    id: string;
    createdAt: Date;
    state: "validated";
    validateDate: Date;
    paymentMethod: "bankTransfer" | "creditCard";
}
// ---cut---
type Order = InProgressOrder | ValidatedOrder;

declare const order: Order

if (order.state === "validated") {
    order
    // ^?
}
```

---

# Type Driven Design : **Créer des logiciels robustes**

<br/>

La **robustesse** est au cœur du `type driven design`. Ce typage fort peut paraître verbeux, mais à très court terme, lors de l'implémentation ou d'un changement, toute votre codebase va s'illuminer en **rouge** et c'est **génial** ! 

Votre code deviendra résistant aux erreurs qui pourraient se glisser lors de l'exécution et vous fera prendre en compte l'impact de chacun de vos choix. 

### Ah, merde, j'ai 100 erreurs, ou plutôt... Putain ! Il y a 100 impacts identifiés dans le code.

Il ne reste plus qu'à naviguer facilement pour réadapter tout le code concerné. 

*Il y a évidemment plein d'autres concepts à mettre en place pour que ce soit parfait, et je vous les présenterai dans d'autres cours !*

---

# Type Driven Design : **Quel langage utiliser ?**

<br/>

Tous les **langages** typés ne sont pas forcément **optimisés** pour le `type driven design`. Le langage doit obligatoirement avoir :
- Un système de générique avancé
- Une catégorisation des types
- Le support des union types
- Le support des intersections

<br/>

## Le meilleur candidat pour mixer **robustesse** et **vélocité** est:
## **TypeScript** (accompagné de `Duplojs`)
