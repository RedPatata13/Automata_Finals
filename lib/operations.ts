export const operations = {
  union: {
    label: "Union",
    definition: "A ∪ B = { x | x ∈ A or x ∈ B }",
    unary: false,
  },
  intersection: {
    label: "Intersection",
    definition: "A ∩ B = { x | x ∈ A and x ∈ B }",
    unary: false,
  },
  difference: {
    label: "Difference (A - B)",
    definition: "A − B = { x | x ∈ A and x ∉ B }",
    unary: false,
  },
  concatenation: {
    label: "Concatenation",
    definition: "AB = { xy | x ∈ A and y ∈ B }",
    unary: false,
  },
  kleene: {
    label: "Kleene Closure (A*)",
    definition: "A* = A⁰ ∪ A¹ ∪ A² ∪ …",
    unary: true,
  },
  positive: {
    label: "Positive Closure (A+)",
    definition: "A+ = A¹ ∪ A² ∪ A³ ∪ …",
    unary: true,
  },
} as const;

export type OperationKey = keyof typeof operations;

export const operationItems = Object.fromEntries(
  Object.entries(operations).map(([key, op]) => [key, op.label]),
);
