export interface Topic {
  id: string;
  title: string;
}

export interface Unit {
  id: string;
  title: string;
  topics: Topic[];
}

export const COURSE_STRUCTURE: Unit[] = [
  {
    id: "unit1",
    title: "Unidad 1: Listas Ligadas",
    topics: [
      { id: "singly-linked", title: "Listas simplemente ligadas" },
      { id: "doubly-linked", title: "Listas doblemente ligadas" },
      { id: "header-nodes", title: "Listas con registro cabeza" },
      { id: "circular-lists", title: "Listas circulares" },
      { id: "multilists", title: "Multilistas" },
      { id: "python-lists", title: "Listas en Python" },
    ],
  },
  {
    id: "unit2",
    title: "Unidad 2: Pilas y Colas",
    topics: [
      { id: "stacks-lifo", title: "Pilas (LIFO) y operaciones" },
      { id: "queues-fifo", title: "Colas (FIFO) y operaciones" },
      { id: "linked-stacks-queues", title: "Pilas y Colas con Listas Ligadas" },
      { id: "circular-queues", title: "Colas Circulares" },
      { id: "n-stacks-queues", title: "N-Pilas y N-Colas en Arreglos" },
    ],
  },
  {
    id: "unit3",
    title: "Unidad 3: Análisis de Algoritmos",
    topics: [
      { id: "complexity-concepts", title: "Costo computacional temporal y espacial" },
      { id: "asymptotic-notation", title: "Notación Big Oh, Omega y Theta" },
      { id: "sorting-analysis", title: "Análisis de algoritmos de ordenamiento" },
      { id: "search-analysis", title: "Búsqueda lineal y binaria" },
    ],
  },
  {
    id: "unit4",
    title: "Unidad 4: Recursión",
    topics: [
      { id: "recursion-concepts", title: "Concepto de recursión directa e indirecta" },
      { id: "master-theorem", title: "Teorema y Método Maestro" },
      { id: "recursive-sorting", title: "MergeSort y QuickSort" },
      { id: "fast-multiplication", title: "Algoritmos para multiplicación rápida" },
    ],
  },
  {
    id: "unit5",
    title: "Unidad 5: Árboles y Grafos",
    topics: [
      { id: "graph-basics", title: "Grafos: Conceptos y algoritmos (BFS, DFS)" },
      { id: "shortest-paths", title: "Dijkstra y Floyd" },
      { id: "tree-basics", title: "Árboles: Conceptos y tipos" },
      { id: "mst-algorithms", title: "Prim y Kruskal (MST)" },
      { id: "balanced-trees", title: "Árboles Binarios y AVL" },
      { id: "heaps", title: "Heaps y HeapSort" },
    ],
  },
  {
    id: "unit6",
    title: "Unidad 6: Programación Dinámica",
    topics: [
      { id: "dp-concepts", title: "Conceptos de Programación Dinámica" },
      { id: "dp-vs-recursion", title: "Programación Dinámica vs Recursión" },
      { id: "dp-problems", title: "Solución de problemas con DP" },
    ],
  },
  {
    id: "unit7",
    title: "Unidad 7: NP-Completitud",
    topics: [
      { id: "np-concepts", title: "Problemas NP-Completitud" },
      { id: "reductions", title: "Reducciones de dureza elementales" },
      { id: "p-vs-np", title: "Problemas P vs NP" },
    ],
  },
];
