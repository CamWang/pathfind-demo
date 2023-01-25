import { parseComps, isComputedProp, potRawCompProp, parseProperty, parseViews } from "./Parser";
import { Component, Event } from "./types";
/**
 * {{}} (double bracers) means everything inside will be executed as JavaScript in context with variables refering to the properties in the current component
 * 
 * Additionally, there is a variable called context, which contains the current event information, parent component information and etc which the user can write to access this information 
 * {{context[x]}} => context[context[x]]
 * 
 * 
 * 
 * 
   {{context[`${x}${y}`]] + 1}} => context[`${x}${y}`] + 1
 * "{{x}}"" means that it will be of whatever type x is (number, string, etc)
 * "{{`${x}`}}" means it will be a string

 */


/**
 * Tests for isCompProp function
 */

// True tests
test('isComputedProp TC1', () => {
  expect(isComputedProp("{{x}}")).toBe(true);
});

test('isComputedProp TC2', () => {
  expect(isComputedProp("Test {{`${x}`}}")).toBe(true);
});

// Invalid Syntax tests
test('isComputedProp TC3', () => {
  expect(isComputedProp("{{`${x}`}")).toBe(false);
});

test('isComputedProp TC4', () => {
  expect(isComputedProp("{`${x}`}}")).toBe(false);
});

test('isComputedProp TC5', () => {
  expect(isComputedProp("{`${x}`}")).toBe(false);
});

test('isComputedProp TC6', () => {
  expect(isComputedProp("[[x]]")).toBe(false);
});

// Other Basic False Tests
test('isComputedProp TC7', () => {
  expect(isComputedProp("Test")).toBe(false);
});

test('isComputedProp TC8', () => {
  expect(isComputedProp(1)).toBe(false);
});

test('isComputedProp TC9', () => {
  expect(isComputedProp("")).toBe(false);
});

test('isComputedProp TC10', () => {
  expect(isComputedProp(undefined)).toBe(false);
});

test('isComputedProp TC11', () => {
  expect(isComputedProp(null)).toBe(false);
});

/**
 * Tests for potRawCompProp function
 */

// True Tests
test('potRawCompProp TC1', () => {
  expect(potRawCompProp("{{x}}")).toBe(true);
});

test('potRawCompProp TC2', () => {
  expect(potRawCompProp("{{`${x}`}}")).toBe(true);
});

test('potRawCompProp TC3', () => {
  expect(potRawCompProp("{{x+y}}")).toBe(true);
});

test('potRawCompProp TC4', () => {
  expect(potRawCompProp("{{context[x]}}")).toBe(true);
});


// False Tests
test('potRawCompProp TC5', () => {
  expect(potRawCompProp("{{x}}+{{y}}")).toBe(false);
});

test('potRawCompProp TC6', () => {
  expect(potRawCompProp("Tile {{y}}")).toBe(false);
});


/**
 * Tests for parseProperty function
 */

// Tests basic parsing of simpliest computed property which accesses value from the context
test('parseProperty TC1', () => {
  expect(parseProperty("{{x}}", {})({ "x": 1, "y": 2 })).toBe(1);
});

// Tests basic parsing of where it is not a raw computed property
test('parseProperty TC2', () => {
  expect(parseProperty("{{x}} + {{y}}", {})({ "x": 1, "y": 2 })).toBe("1 + 2");
});

// Tests basic parsing where it is a raw computed property but uses `${}
test('parseProperty TC3', () => {
  expect(parseProperty("{{`${x}`}}", {})({ "x": 1, "y": 2 })).toBe("1");
});

// Test Case 2 but as a raw computed property
test('parseProperty TC4', () => {
  expect(parseProperty("{{`${x} + ${y}`}}", {})({ "x": 1, "y": 2 })).toBe("1 + 2");
});

// Tests parsing of slightly more complex raw computed properties
test('parseProperty TC5', () => {
  expect(parseProperty("{{x + y}}", {})({ "x": 1, "y": 2 })).toBe(3);
});

// Tests parsing of the "context" string
test('parseProperty TC6', () => {
  expect(parseProperty("{{context[`${x}${y}`]}}", {})({ "x": 1, "y": 2, "12": 3 })).toBe(3);
});

// Tests parsing of a string and computed part (accessing from context)
test('parseProperty TC7', () => {
  expect(parseProperty("Test {{x}}", {})({ "x": 1, "y": 2 })).toBe("Test 1");
});

// Tests parsing of a string and computed part (accessing from injectedContext)
test('parseProperty TC8', () => {
  expect(parseProperty("Test {{x}}", { "x": 5 })({})).toBe("Test 5");
});

// Tests parsing of a string and computed part (with both context and injectContext should take from the context)
test('parseProperty TC9', () => {
  expect(parseProperty("Test {{x}}", { "x": 5 })({ "x": 1 })).toBe("Test 1");
});

// Tests parsing of a simple number within the computed property
test('parseProperty TC10', () => {
  expect(parseProperty("{{100}}", {})({ "x": 1 })).toBe(100);
});

// Tests parsing of simple arithmetics with computed property
test('parseProperty TC11', () => {
  expect(parseProperty("{{x + 1}}", {})({ "x": 1 })).toBe(2);
});

// Tests parsing of variable containing all the different valid characters of a variable name
test('parseProperty TC12', () => {
  expect(parseProperty("{{_aA01}}", {})({ "_aA01": 1 })).toBe(1);
});

describe('parseProperty tests for parsing double indexing', () => {

  // context['parent']['x']
  it("Parses a nested computed property using dot (.) accessing 1", () => {
    expect(parseProperty(
      "{{ parent.x }}", {})({ "parent": { "type": "test", "id": 1, "x": 3, "y": 4 } })).toBe(3);
  })

  // context['parent']['x']
  it("Parses a nested computed property using bracket ([]) accessing 1", () => {
    expect(parseProperty(
      "{{ parent['x'] }}", {})({ "parent": { "type": "test", "id": 1, "x": 3, "y": 4 } })).toBe(3);
  })

  // context['parent'][context['x']]
  it("Parses a nested computed property using bracket ([]) accessing with multiple brackets", () => {
    expect(parseProperty(
      "{{ parent[x] }}", {})({ "x": "y", "parent": { "type": "test", "id": 1, "x": 3, "y": 4 } })).toBe(4);
  })

  // context['parent']['x']['y']
  it("Parses a nested computed property using dot (.) accessing ", () => {
    expect(parseProperty(
      "{{ parent.x.y }}", {})({ "parent": { "type": "test", "id": 1, "x": { "y": 1 }, "y": 4 } })).toBe(1);
  })

  // context['parent']['x']['y']
  it("Parses a nested computed property using dot (.) accessing ", () => {
    expect(parseProperty(
      "{{ parent['x']['y'] }}", {})({ "parent": { "type": "test", "id": 1, "x": { "y": 1 }, "y": 4 } })).toBe(1);
  })

  // context['parent']['x']['y']
  it("", () => {
    expect(parseProperty(
      "{{ parent['x'].y }}", {})({ "parent": { "type": "test", "id": 1, "x": { "y": 1 }, "y": 4 } })).toBe(1);
  })

  // context['parent'][context['x']]['y']
  it("", () => {
    expect(parseProperty(
      "{{ parent[x]['y'] }}", {})({ "x": "x", "parent": { "type": "test", "id": 1, "x": { "y": 1 }, "y": 4 } })).toBe(1);
  })
})

describe('parseProperty tests for parsing arrays and objects', () => {

  // context['parent']['x']
  it("Parses a nested computed property using dot (.) accessing 1", () => {
    expect(parseProperty(["{{x}}", "{{y}}"], {})({ "x":1, "y":2})).toStrictEqual([1,2]);
  })


})

/**
 * Tests for parseComp function
 */
const userComponents = {
  "tile": [
    {
      "$": "rect",
      "width": 1,
      "height": 1,
      "text": "{{context[`${x}${y}`]}}"
    }
  ],
  "tilerow": [
    {
      "$": "tile",
      "x": 1
    },
    {
      "$": "tile",
      "x": 2
    },
    {
      "$": "tile",
      "x": 3
    }
  ],
  "tileboard": [
    {
      "$": "tilerow",
      "y": 1
    },
    {
      "$": "tilerow",
      "y": 2
    },
    {
      "$": "tilerow",
      "y": 3
    }
  ]
}

function toValue(component: Component, event: Event) {
  for (const prop in component) {
    if (typeof component[prop] === "function" && prop !== "converter") {
      component[prop] = component[prop](event);
    }
  }
  return component
}


// Tests the parsing of a single Component which will parse directly to a primitive component.
test('parseComp TC1', () => {
  expect(parseComps([
    {
      "$": "rect",
      "width": 1,
      "height": 1,
      "text": "{{context[`${x}${y}`]}}"
    }
  ]
    , {}, userComponents).map((ele) => {
      return toValue(ele, { "type": "test", "id": 1, "x": 1, "y": 2, '12': 3 })
    }))
    .toStrictEqual([{
      "$": "rect",
      "width": 1,
      "height": 1,
      "text": 3
    }])
})



// Tests parsing a group of components (3 tiles) which will each be parsed into a primitive component
test('parseComp TC2', () => {
  expect(parseComps([
    {
      "$": "tilerow",
      "y": 1
    }
  ]
    , {}, userComponents).map((ele) => {
      return toValue(ele, { "type": "test", "id": 1, '11': 1, '21':2, "31":3 })
    }))
    .toStrictEqual(
      [{ "$": "rect", "height": 1, "text": 1, "width": 1, "x": 1, "y": 1 },
      { "$": "rect", "height": 1, "text": 2, "width": 1, "x": 2, "y": 1 },
      { "$": "rect", "height": 1, "text": 3, "width": 1, "x": 3, "y": 1 }])
})

// Tests parsing a large group of components (3 tile rows, 9 tiles)
test('parseComp TC3', () => {
  expect(parseComps([
    {
      "$": "tilerow",
      "y": 1
    },
    {
      "$": "tilerow",
      "y": 2
    },
    {
      "$": "tilerow",
      "y": 3
    }
  ]
    , {}, userComponents).map((ele) => {
      return toValue(ele, { "type": "test", "id": 1, '11': 1, '21':2, "31":3, '12': 4, '22':5, "32":6, '13': 7, '23':8, "33":9 })
    }))
    .toStrictEqual(
      [{ "$": "rect", "height": 1, "text": 1, "width": 1, "x": 1, "y": 1 },
      { "$": "rect", "height": 1, "text": 2, "width": 1, "x": 2, "y": 1 },
      { "$": "rect", "height": 1, "text": 3, "width": 1, "x": 3, "y": 1 },
      { "$": "rect", "height": 1, "text": 4, "width": 1, "x": 1, "y": 2 },
      { "$": "rect", "height": 1, "text": 5, "width": 1, "x": 2, "y": 2 },
      { "$": "rect", "height": 1, "text": 6, "width": 1, "x": 3, "y": 2 },
      { "$": "rect", "height": 1, "text": 7, "width": 1, "x": 1, "y": 3 },
      { "$": "rect", "height": 1, "text": 8, "width": 1, "x": 2, "y": 3 },
      { "$": "rect", "height": 1, "text": 9, "width": 1, "x": 3, "y": 3 }])
})

// Tests parsing a component with an invalid name (will need to fix later)
test('parseComp TC4', () => {
  expect(parseComps([
    {
      "$": "fasfasf",
      "width": 1,
      "height": 1,
      "text": "{{context[`${x}${y}`]}}"
    }
  ]
    , {}, userComponents)).toStrictEqual([])
})

/**
 * Tests for parseViews function
 */

// Tests parsing a relative complex group of components (taken from the tile puzzle render)
test("parseViews TC1 - Tile View", () => {
  const views = parseViews({
    "components": {
      "tile": [
        {
          "$": "rect",
          "width": 1,
          "height": 1,
          "text": "{{context[`${x}${y}`]}}"
        }
      ],
      "tilerow": [
        {
          "$": "tile",
          "x": 1
        },
        {
          "$": "tile",
          "x": 2
        },
        {
          "$": "tile",
          "x": 3
        }
      ],
      "tileboard": [
        {
          "$": "tilerow",
          "y": 1
        },
        {
          "$": "tilerow",
          "y": 2
        },
        {
          "$": "tilerow",
          "y": 3
        }
      ]
    },
    "views": {
      "tiles": { "renderer": "2d-pixi", "components": [{ "$": "tileboard" }] },
      "main": { "renderer": "2d-pixi", "components": [{ "$": "tree" }] }
    }
  }).tiles.components.map((ele) => {
    return toValue(ele, { "type": "test", "id": 1, '11': 1, '21':2, "31":3, '12': 4, '22':5, "32":6, '13': 7, '23':8, "33":9 })
  })
  const arr = [];
  let counter = 1
  console.log(views)
  for (const comp of views) {
    expect(comp["$"]).toBe("rect");
    expect(comp.height).toBe(1);
    expect(comp.width).toBe(1);
    expect(comp.text ).toBe(counter)
    counter += 1
  }
})
