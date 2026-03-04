# Riverbraid-Temporal-Gold

Sequence integrity and order validation petal (v1.3.0).

Temporal here means governed ordering of operations — not clocks or timestamps.
No Date, no Math.random, no entropy.

## Functions

- `validateSequence(steps)` — verifies steps are in ascending index order
- `assertPrecedes(requiredName, dependentName, steps)` — asserts one step comes before another
- `getStatus()` — returns STATIONARY status

## Invariant Status

[Signal: SEQUENCE-INTEGRITY | Braid: CLOSED-LOOP]
