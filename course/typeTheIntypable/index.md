---
theme: nord
layout: center
logo: false
---

# Type Driven Design

### Typer l’intypable.

Avec Duplojs

<img v-drag="[444,301,40,40]" src="./images/duplojs.svg"/>

---

# C'est quoi l'intypable ?

Définir qu'une variable est une `string` c'est facile, mais définir qu'une variable est une **adresse email** l'est beaucoup moins !

```ts
const email: `${string}@${string}.${string}` = "@@@superEmail@@tru....c.commmmmmmmmmm"; 
```

Une **adresse email** n’est pas un type fondamental du langage. Le langage sait représenter du texte avec `string`, mais ce n’est pas son rôle de connaître toutes les règles du monde réel. C’est donc au code de l’application de vérifier qu’une chaîne de caractères est bien une adresse email valide.

L'**intypable**, ce sont les contraintes qui ne peuvent être **vérifiées** qu'à travers de l'**exécution de code**.

---
layout: two-cols-header
---

# Qu'elle type existe en typescript ?

::left::
```ts twoslash
<!--@include: ./examples/existingType.ts{1,21} -->
```

::right::
```ts twoslash
<!--@include: ./examples/existingType.ts{22,41} -->
```

<style>
.two-cols-header {
  column-gap: 10px;
}
</style>
---
layout: two-cols-header
---

# Qu'elle possibilité de typage en typescript ?

::left::
```ts twoslash
<!--@include: ./examples/typePossibility.ts{1,19} -->
```
::right::
```ts twoslash
<!--@include: ./examples/typePossibility.ts{1,19} -->
//---cut---
<!--@include: ./examples/typePossibility.ts{20,40} -->
```
<style>
.two-cols-header {
  column-gap: 10px;
}
</style>
---

# Commencez par un exemple simple : une function de division

Fonction simple, prends en entrée le `dividende` et le `diviseur`, effectue l'opération à l'intérieur et retourne le résultat.

```js
function division(dividend, divisor) {
    return dividend / divisor;
}

division(10, 5);
division("toto", 50);
```



---

# Commencez par un exemple simple : une function de division

Première contrainte : une division ne peut qu'être faite avec des nombres.

```ts twoslash
function division(dividend: number, divisor: number) {
    return dividend / divisor;
}

division(10, 5);
division("test", 50);
```

---

# Commencez par un exemple simple : une function de division

Deuxième contrainte, il est impossible de diviser par `0`. Et c'est là que les problèmes commencent...

Certains proposeraient de résoudre ce problème de cette manière.
```ts twoslash
function division(dividend: number, divisor: number) {
    if(divisor === 0) {
        return null;
    }

    return dividend / divisor;
}

const result = division(8, 0);
//    ^?
```

Sauf qu'en mathématiques, une division ne renvoie jamais `null`. En faisant ça, il y a donc une incohérence avec le métier.

---

# Commencez par un exemple simple : une function de division

Pour résoudre ce problème, je vous propose de commencer à jouer un peu avec TypeScript :

```ts twoslash
function division(dividend: number, divisor: number & { notZero: unknown }) {
    return dividend / divisor;
}

division(8, 0);
division(8, 2);
```
Ici on a indiqué que l'argument divisor était un `number` mais également en même temps un `objet` possédant une clé nommée `notZero`. Cette **intersection** de type nous empêche de mettre `0` mais pour l'instant, elle nous empêche aussi de mettre n'importe quel autre `number`.

---

# Commencez par un exemple simple : une function de division

Il nous faut donc être capable de fournir le type `number & { notZero: unknown }`. Pour cela on va devoir créer une nouvelle fonction :

```ts twoslash
function numberIsNotZero(value: number) {
    if (value === 0) return null;
    return value as number & { notZero: unknown };
}

const divisor = numberIsNotZero(12);
//    ^?




```

Dans le cas où la valeur utiliser est égale à `0`, cette fonction nous renverra un `null`. Sinon, elle renverra le type dont nous avons besoin.

---

# Commencez par un exemple simple : une function de division

Il ne reste plus qu'à utiliser tout ça.

```ts twoslash
function division(dividend: number, divisor: number & { notZero: unknown }) {
    return dividend / divisor;
}

function numberIsNotZero(value: number) {
    if (value === 0) return null;
    return value as number & { notZero: unknown };
}

// ---cut---
const divisor = numberIsNotZero(Math.random());
if (divisor !== null) {
    division(8, divisor);
}

division(8, Math.random());
```

Il donc impossible d'utiliser la fonction `division` sans appeler au préalable la fonction `numberIsNotZero`. 

---

# Quel est l'avantage de faire ça ?

- La déclaration des fonctions est tout de suite plus explicite et compréhensible. Le **diviseur** est explicitement autre chose que `0`.
- L'exécution est désormais safe grâce au **typage**. Impossible d'utiliser `0`, donc impossible d'avoir un résultat erroné a l'execution.
- Le code de vérification est factorisé. Cette contrainte pourrait être utilisée par d'autres fonctions, ce qui éviterait d'avoir une condition répétée et un retour à null sur chacune d'entre elles à cause d'un paramètre qui serait égale a zero.
- Moins de tests unitaires. Chaque fonction qui implémenterait cette vérification se verrait targuée de tests unitaires pour qu'ils valideraient que les paramètres rentrés ne créent pas de résultats problématiques. Alors qu'il serait beaucoup plus pertinent de se concentrer sur des tests qui s'occupent uniquement du métier et non pas a des problème liés à des limitations techniques.
- Ce genre de contract explicite permet de déléguer plus Sereinement des taches à des agents IA pour la partie d'implémentation.

---

# Après la théorie, la pratique avec duplojs !

DuploJS a tout un arsenal d'outils pour qualifier facilement les contraintes.

À votre disposition, vous avez :
- Les `DataParser`
- Les `ConstainedType`
- Les `NewType`
- Les `Primitive`

---

# DuploJS : Les `DataParser`
