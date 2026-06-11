---
theme: nord
layout: center
logo: false
---

# Type Driven Design

### Typer l’intypable.

Avec **DuploJS**

<img v-drag="[448,301,40,40]" src="./images/duplojs.svg"/>

---

# C'est quoi l'intypable ?

Définir qu'une variable est une `string` c'est facile, mais définir qu'une variable est une **adresse email** l'est beaucoup moins !

```ts
const email: `${string}@${string}.${string}` = "@@@superEmail@@tru....c.commmmmmmmmmm"; 
```

Une **adresse email** n’est pas un **type fondamental** du langage. Le langage sait représenter du texte avec `string`, mais ce n’est pas son rôle de connaître toutes les règles du monde réel. C’est donc au **code de l’application** de vérifier qu’une chaîne de caractères est bien une **adresse email valide**.

L'**intypable**, ce sont les contraintes qui ne peuvent être **vérifiées** qu'à travers l'**exécution de code**.

---
layout: two-cols-header
---

# Quels types existent en TypeScript ?

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

# Quelles possibilités de typage existent en TypeScript ?

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

# Commençons par un exemple simple : une fonction de division

Cette fonction simple prend en entrée le `dividend` et le `divisor`, effectue l'**opération**, puis retourne le **résultat**.

```js
function division(dividend, divisor) {
    return dividend / divisor;
}

division(10, 5);
division("toto", 50);
```



---

# Commençons par un exemple simple : une fonction de division

Première **contrainte** : une **division** ne peut être faite qu'avec des **nombres**.

```ts twoslash
function division(dividend: number, divisor: number) {
    return dividend / divisor;
}

division(10, 5);
division("test", 50);
```

---

# Commençons par un exemple simple : une fonction de division

Deuxième **contrainte** : il est **impossible de diviser par `0`**. Et c'est là que les problèmes commencent...

Certains proposeraient de résoudre ce problème de cette manière :
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

Sauf qu'en **mathématiques**, une **division** ne renvoie jamais `null`. En faisant ça, il y a donc une **incohérence avec le métier**.

---

# Commençons par un exemple simple : une fonction de division

Pour résoudre ce problème, je vous propose de commencer à jouer un peu avec TypeScript :

```ts twoslash
function division(dividend: number, divisor: number & { notZero: unknown }) {
    return dividend / divisor;
}

division(8, 0);
division(8, 2);
```
Ici, on a indiqué que l'argument `divisor` était un `number`, mais également un `objet` possédant une clé nommée `notZero`. Cette **intersection de types** nous empêche de mettre `0`, mais pour l'instant, elle nous empêche aussi de mettre n'importe quel autre `number`.

---

# Commençons par un exemple simple : une fonction de division

Il nous faut donc être capable de fournir le type `number & { notZero: unknown }`. Pour cela, on va devoir créer une nouvelle fonction :

```ts twoslash
function numberIsNotZero(value: number) {
    if (value === 0) return null;
    return value as number & { notZero: unknown };
}

const divisor = numberIsNotZero(12);
//    ^?




```

Dans le cas où la **valeur utilisée** est égale à `0`, cette fonction nous renverra `null`. Sinon, elle renverra le **type** dont nous avons besoin.

---

# Commençons par un exemple simple : une fonction de division

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

Il est donc **impossible** d'utiliser la fonction `division` sans appeler au préalable la fonction `numberIsNotZero`.

---

# Quel est l'avantage de faire ça ?

- La déclaration des fonctions est tout de suite plus explicite et compréhensible. Le **diviseur** est explicitement autre chose que `0`.
- L'exécution est désormais sécurisée grâce au **typage**. Impossible d'utiliser `0`, donc impossible d'obtenir un résultat erroné à l'exécution.
- Le **code de vérification** est factorisé. Cette **contrainte** pourrait être utilisée par d'autres fonctions, ce qui éviterait d'avoir une **condition répétée** et un retour à `null` sur chacune d'entre elles à cause d'un paramètre qui serait égal à zéro.
- Moins de **tests unitaires**. Chaque fonction qui implémenterait cette vérification devrait être accompagnée de tests unitaires validant que les **paramètres fournis** ne créent pas de **résultats problématiques**. Il serait pourtant beaucoup plus pertinent de se concentrer sur des tests qui s'occupent uniquement du **métier**, et non de problèmes liés à des **limitations techniques**.
- Ce genre de **contrat explicite** permet de déléguer plus sereinement des tâches à des **agents IA** pour la partie d'implémentation.

---

# Et avec DuploJS ça donnerait quoi ?

La création de **contraintes** sur l'intypable est native dans **DuploJS**. Ce qui permet très facilement de résoudre la **contrainte métier** d'une division. Le tout est accompagné d'un système de **monade** pour identifier facilement les **résultats**.

```ts twoslash
<!--@include: ./examples/divisionDuplojs.ts --> 
```

---

# Après la théorie, la pratique avec DuploJS !

**DuploJS** a tout un arsenal d'outils pour qualifier facilement les **contraintes**.

À votre disposition, vous avez :
- Les `DataParsers`
- Les `Primitives`
- Les `Constraints`
- Les `NewTypes`

---

# DuploJS : Les `DataParsers`

Les `DataParsers` sont des outils qui permettent de représenter le **type** et les **spécificités** d'une donnée au `runtime`. Ils vont servir de **guards**, car même si le **type** est correct, il faut bien que les données entrantes soient **validées** par quelque chose.

```ts twoslash
<!--@include: ./examples/dataParser.ts -->
```

---

# DuploJS : Les `DataParsers`

Les `DataParsers` sont accompagnés de `Checkers` pour définir des **spécificités** à la donnée.

Exemple : sur une `string`, on souhaiterait qu'elle ait un **minimum de `5` caractères**. Le `DataParser` va vérifier le **type** et le `Checker` va vérifier la **longueur** de la `string`.

```ts twoslash
<!--@include: ./examples/checker.ts -->
```

---

# DuploJS : Les `DataParsers`

Il existe au total plus de 20 `DataParsers`. Ils vous aideront à définir correctement une **donnée** et/ou à la **transformer**. Il est possible de récupérer le **type** inféré de vos `DataParsers` à travers les interfaces `Input` et `Output`. Ici, la valeur de `prop2` se retrouve stringifiée en sortie.

```ts twoslash
<!--@include: ./examples/dataParserDetails.ts -->
```

---

# DuploJS : Les `Primitives`

Les `Primitives` sont un **élément central**. Elles créent une structure qui enveloppe une **valeur** dans un objet, ce qui permet de cumuler des **attributs** comme des `Constraints`. Les primitives peuvent seulement envelopper les types : `string`, `number`, `bigint`, `boolean`, `TheDate` et `TheTime`.

```ts twoslash
<!--@include: ./examples/primitive.ts -->
```

En cas d'échec, `create` retourne un `Left<"createPrimitiveError", PrimitiveError<"...">>`. La variante `createOrThrow` lève une `CreatePrimitiveError` qui conserve le **nom de la primitive**, la **donnée reçue** et l'**erreur du DataParser**.

La valeur définie est **inaccessible**. Pour la **manipuler**, il est donc **obligatoire** d'utiliser les **opérateurs** qui peuvent être fournis par la librairie ou par vous-même.

```ts twoslash
<!--@include: ./examples/primitiveOperator.ts -->
```

---

# DuploJS : Les `Constraints`

Les `Constraints` permettent de vérifier qu'une **valeur** respecte une **condition** qui ne peut être vérifiée qu'au `runtime`. Pour créer une `Constraint`, il suffit d'indiquer un **nom**, la `Primitive` concernée et un ou plusieurs `checkers`.

```ts twoslash
<!--@include: ./examples/constraint.ts -->
```

En cas d'échec, `create` retourne un `Left<"createConstrainedTypeError", ConstraintError<"...">>`. La variante `createOrThrow` lève une `CreateConstrainedTypeError` qui conserve le **nom de la contrainte**, la **donnée reçue** et l'**erreur du DataParser**.

Pour créer le **contrat**, il suffit de déclarer un **type** et d'appeler l'interface `GetConstraint`.

---

# DuploJS : Les `Constraints`

Pour ensuite **exiger la contrainte**, il suffit d'appeler le **type défini**.

```ts twoslash
<!--@include: ./examples/useConstraint.ts -->
```

Il est donc maintenant **impossible** d'appeler notre fonction avec autre chose qu'un **numéro de téléphone**, ce qui nous garantit, avant même l'**exécution**, que tout se passera correctement.

---

# DuploJS : Les `Constraints`

Mais dans la réalité, nous sommes souvent dépendants de plusieurs contraintes. C'est là que **DuploJS** amène les `ConstraintSet`.

```ts twoslash
<!--@include: ./examples/constraintSet.ts -->



```

Pour créer notre `ConstraintSet`, ici nous utilisons des **contraintes fournies par la lib**. On peut observer que la **valeur obtenue** est une `Primitive` en combinaison avec toutes les contraintes définies dans le set.

---

# DuploJS : Les `Constraints`

Et à l'usage, il est encore tout à fait possible de demander **autant de contraintes qu'on le souhaite**.

```ts twoslash
<!--@include: ./examples/useConstraintSet.ts -->
```

---

# DuploJS : Les `Constraints`

Les **types contraints** sont aussi capables d'être utilisés avec les **opérateurs**.

```ts twoslash
<!--@include: ./examples/constraintOperator.ts -->


```

Et en toute logique, le **type** perdra les **contraintes** qu'il avait, car après **opération**, il n'est plus sûr de les respecter.

---

# DuploJS : Les `Constraints`

Il est aussi tout à fait possible de `caster` des contraintes dans le cas où, logiquement, une **contrainte implique l'autre**. La fonction `castConstraint` permet, à travers un **calcul de typage**, de pouvoir réassigner une contrainte.

```ts twoslash
<!--@include: ./examples/castConstraint.ts -->
```

Dans le cas inverse, si une **contrainte n'inclut pas l'autre**, une **erreur de typage** sera indiquée.

---

# DuploJS : Les `NewTypes`

Les `NewTypes` viennent donner une **identité** à la donnée. Pour en créer, il suffit d'utiliser soit une `Primitive`, soit un `DataParser` pour des **structures composées**.

```ts twoslash
<!--@include: ./examples/newtype.ts -->
```

En cas d'échec, `create` retourne un `Left<"createNewTypeError", NewTypeError<"...">>`. La variante `createOrThrow` lève une `CreateNewTypeError` qui conserve le **nom du NewType**, la **donnée reçue** et l'**erreur du DataParser**.

Il est également possible de fournir des `Constraints` afin de rendre notre `NewType` **éligible à ces contraintes**.

---

# DuploJS : Les `NewTypes`

Il s'utilise de la même manière que les `Constraints` et les `Primitives`.

```ts twoslash
<!--@include: ./examples/useNewType.ts -->
```

Il est également possible de **manipuler** les `NewTypes` avec des `Constraints` ou des `Primitives` pour réobtenir une nouvelle `Primitive`.

---

# Ça donne quoi dans une situation réelle ?

Pour illustrer le **flux de travail** que vous pouvez avoir avec ces éléments, je vous propose de réaliser une **création de compte** sur une application.

Lorsqu'un **utilisateur** veut créer son compte sur mon application, il est obligé de fournir :
- une **adresse email**
- un **nom**
- un **âge**.

**Contraintes** :
- L'**adresse email** ne doit pas déjà être utilisée.
- Le **nom** doit uniquement contenir des **lettres** et doit contenir entre **5 et 35 caractères**.
- L'**âge** doit être supérieur ou égal à **13 ans**.

---

# Création d'un utilisateur

La première chose à faire est de déclarer nos **champs** avec toutes leurs **contraintes**.

```ts twoslash
<!--@include: ./examples/implementation.ts{1,3} -->
// ---cut---
<!--@include: ./examples/implementation.ts{4,22} -->
```

---

# Création d'un utilisateur

Ensuite, on vient créer notre **fonction** qui s'assure que l'**email est correctement disponible**.

```ts twoslash
<!--@include: ./examples/implementation.ts{1,22} -->
// ---cut---
<!--@include: ./examples/implementation.ts{24,27} -->
```

L'**implémentation** de celle-ci n'a pas beaucoup d'importance. Ici, on illustre juste les **contrats d'entrée et de sortie**.

On peut observer ici un nouveau type qui se nomme `Evidence`. Il sert de **preuve de passage** à un endroit. Il peut être ajouté à un `NewType`, une `Primitive` ou une `Constraint`.

---

# Création d'un utilisateur

Après, on crée notre **fonction** qui crée l'**utilisateur**.

```ts twoslash
<!--@include: ./examples/implementation.ts{1,27} -->
// ---cut---
<!--@include: ./examples/implementation.ts{29,33} -->
```

Encore une fois, ici, l'intérêt de l'exemple ne réside pas dans l'**implémentation**, mais dans le **contrat** qui oblige à faire certaines choses. On peut voir ici que j'utilise l'interface `GetEvidentResult`, puis que je cite la fonction `userEmailIsAvailable` et `available`, la **preuve exigée**.

---

# Création d'un utilisateur

Pour aller plus loin dans l'**implémentation**, on va utiliser la librairie `@duplojs/http`, qui permet de créer des **serveurs HTTP typés**. Elle met à disposition la méthode `toExtractParser`, qui crée un `DataParser` capable de transformer une **valeur simple** en `NewType` avec ses **contraintes**.

```ts
<!--@include: ./examples/implementation.ts{35,53} -->
```

---
layout: center
---

# Pour conclure

Nous pouvons observer que grâce au **Type Driven Design** et aux outils de **DuploJS**, il est tout à fait possible de **typer tous les aspects de nos données**. Cela permet de **définir précisément** ce que nous souhaitons et de **sécuriser l'exécution du code**. Cela crée en plus une **source de vérité unique**, qui peut être utilisée à tous les niveaux, que ce soit pour valider en `backend` ou même en `frontend` dans des formulaires.

---
layout: center
---

# Fin du chapitre de l'intypable.
## Prochain chapitre : Les entités.
