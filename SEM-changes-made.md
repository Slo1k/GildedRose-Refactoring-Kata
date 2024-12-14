# Changes Made to Gilded Rose Codebase

## Mikołaj Krakowiak

### 1. Adjusted main for loop of the program
- It ensures better readability of the code and makes the structure simpler by avoiding the indices

### 2. Simplified nested conditions
- Reduces complexity and enhances clarity by minimizing unnecessary nesting.

### 3. Meged conditions for certain items
- Removes redundancy and ensures items rules are easier to maintain.

### 4. Removed repeating quality conditions
- Eliminates duplication, reducing potential errors and improving maintainability.


## Jakub Kozłowski

### 1. Implemented update functions for each item type
- It ensures easy code maintenance and clarity.

### 2. Added constructor types
- It ensured type safety to the class.

### 3. Added const variables
- When it comes to changing the common value, it requires only one place to update it.

### 4. Implemented quality value manipulation functions
- It is easier to read what piece of code does and also helps with future implementation.

## Adam Kopiec
### 1. Added Strategy Pattern

**Changes:**
- Created strategy classes: `AgedBrieStrategy`, `BackstagePassesStrategy`, `SulfurasStrategy`, `ConjuredStrategy`, `DefaultStrategy`.
- Added `strategyRegistry` to map item types to strategies.

**Justification:**
- Makes the code cleaner and easier to extend. No more big `switch` statements.

### 2. Improved Backstage Passes Logic

**Changes:**
- Added a list of thresholds for quality increase in `BackstagePassesStrategy`.
- Created `getQualityIncrement` method.

**Justification:**
- Makes it easier to adjust quality rules for Backstage Passes without changing the whole code.

### 3. Added Conjured Item Support

**Changes:**
- Added `ConjuredStrategy` to handle items like "Conjured Mana Cake".

**Justification:**
- Implemented behavior for Conjured items, which was missing.

- By using a dedicated strategy, we ensure the logic is separate from other items and adheres to the rules for conjured items.
