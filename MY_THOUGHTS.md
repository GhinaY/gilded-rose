 I'll use this document to write down my thoughts behind the changes in each commit:

### Commit 1: Adding unit tests.
Basic TDD practice; To make sure none of my future changes break the existing functionality, I've added exhaustive unit tests with 100% coverage. With every future change I make, I'll run the tests to make sure everything still works as expected.

### Commit 2: Basic refactor.
I've started the refactoring work with a simplification of the `if...else` blocks and replacing them with `switch` statements whereever it's straight forward. This just makes it easier to read and follow along. The refactor is not done yet, but I will be incrementally commiting working versions to make it easier to debug in case I break something. \
Of course another added benefit is cleaner, more efficeint code. Instead of having to go through a million branches to find the right one, each item is now contained within a single case in each of the `switch` statements. 

### Commit 3: Helper functions for capping quality values
A lot of code was being repeated multiple times, so it made sense to reduce that:
- **Separate functions that handle limitting the item quality values to between 0-50:** for the sake of decoupling concerns, cleaner code, less chances of bugs/errors caused by repetitions, easier testing (as evident by the removal of many repetetive tests without reducing the test coverage), easier future changes if needed (e.g. if we want to change the cap from 50 to another number), etc.
- **Move the Sulfuras check to the top of the function:** adding the check and the return statement at the top means we don't have to check for it in the `switch` statements, or worry about its quality or sellIn values being incorrectly updated. Also just makes it clearer to see immedietely by looking at the function that this specific item is not ever edited. 

### Commit 4: More helper functions to reduce redundencies
Instead of incrementally updating the quality by 1 each time, it makes more sense and is easier to read if we determine how much we need to change the value by and make the update once. It also once again means less repetitive code, decoupled concerns, easier testing and easier future changes.

### Commit 5: Creating a list for legendary items
Hard-coding the Sulfuras to be the only exception case where the `sellIn` and `quality` values are never changed seemed very rigid and not scalable. This is a very small change but with a big impact: now we can very easily add more "legendary" items in the future just by adding them to the array. Makes the code more flexible and extendable. 

### Commit 6: Update tests to use variables 
Small changes to the tests for readability's sake. I found while going through them again that I kept forgetting the order of the `Item` constructor parameters (i.e. confusing `quality` and `sellIn`), so I opted for using named variables instead. I also set default values for those variables in higher-level `beforeEach` statements so they can be reused by tests and reduce the workload when creating new tests. \
I also found myself having to check the variable numbers again to know what values should be in the `expect` statements, so I opted for replacing hard values with the mathematical operations (e.g. `expect...(itemQuality - 1)` instead of `expect...(9)`).