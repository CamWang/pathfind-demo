"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.converter = void 0;
var lodash_1 = require("lodash");
var tile_events = {
    "eventList": [
        {
            "id": 1,
            "type": "source",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 4,
                    "n5": 5,
                    "n6": 6,
                    "n7": 7,
                    "n8": 8,
                    "n0": 0
                },
                "scaffoldValues": {
                    "x": "c",
                    "y": "c"
                }
            }
        },
        {
            "id": 25,
            "type": "destination",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 4,
                    "n5": 5,
                    "n6": 0,
                    "n7": 6,
                    "n8": 7,
                    "n0": 8
                },
                "scaffoldValues": {
                    "x": "c",
                    "y": "b"
                }
            }
        },
        {
            "id": 1,
            "pId": null,
            "type": "generating",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 4,
                    "n5": 5,
                    "n6": 6,
                    "n7": 7,
                    "n8": 8,
                    "n0": 0
                },
                "scaffoldValues": {
                    "x": "c",
                    "y": "c"
                }
            },
            "f": "0.165572",
            "g": "0.582127"
        },
        {
            "id": 1,
            "pId": null,
            "type": "expanding",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 4,
                    "n5": 5,
                    "n6": 6,
                    "n7": 7,
                    "n8": 8,
                    "n0": 0
                },
                "scaffoldValues": {
                    "x": "c",
                    "y": "c"
                }
            },
            "f": "0.252174",
            "g": "0.509215"
        },
        {
            "id": 2,
            "pId": 1,
            "type": "generating",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 4,
                    "n5": 5,
                    "n6": 6,
                    "n7": 7,
                    "n8": 0,
                    "n0": 8
                },
                "scaffoldValues": {
                    "x": "b",
                    "y": "c"
                }
            },
            "f": "0.534285",
            "g": "0.617753"
        },
        {
            "id": 3,
            "pId": 1,
            "type": "generating",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 4,
                    "n5": 5,
                    "n6": 0,
                    "n7": 7,
                    "n8": 8,
                    "n0": 6
                },
                "scaffoldValues": {
                    "x": "c",
                    "y": "b"
                }
            },
            "f": "0.322721",
            "g": "0.820226"
        },
        {
            "id": 1,
            "pId": null,
            "type": "closing",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 4,
                    "n5": 5,
                    "n6": 6,
                    "n7": 7,
                    "n8": 8,
                    "n0": 0
                },
                "scaffoldValues": {
                    "x": "c",
                    "y": "c"
                }
            },
            "f": "0.492609",
            "g": "0.0603113"
        },
        {
            "id": 2,
            "pId": 1,
            "type": "expanding",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 4,
                    "n5": 5,
                    "n6": 6,
                    "n7": 7,
                    "n8": 0,
                    "n0": 8
                },
                "scaffoldValues": {
                    "x": "b",
                    "y": "c"
                }
            },
            "f": "0.879944",
            "g": "0.662947"
        },
        {
            "id": 4,
            "pId": 2,
            "type": "generating",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 4,
                    "n5": 5,
                    "n6": 6,
                    "n7": 0,
                    "n8": 7,
                    "n0": 8
                },
                "scaffoldValues": {
                    "x": "a",
                    "y": "c"
                }
            },
            "f": "0.730471",
            "g": "0.754410"
        },
        {
            "id": 5,
            "pId": 2,
            "type": "generating",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 4,
                    "n5": 0,
                    "n6": 6,
                    "n7": 7,
                    "n8": 5,
                    "n0": 8
                },
                "scaffoldValues": {
                    "x": "b",
                    "y": "b"
                }
            },
            "f": "0.334589",
            "g": "0.729135"
        },
        {
            "id": 2,
            "pId": 1,
            "type": "closing",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 4,
                    "n5": 5,
                    "n6": 6,
                    "n7": 7,
                    "n8": 0,
                    "n0": 8
                },
                "scaffoldValues": {
                    "x": "b",
                    "y": "c"
                }
            },
            "f": "0.933508",
            "g": "0.242002"
        },
        {
            "id": 4,
            "pId": 2,
            "type": "expanding",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 4,
                    "n5": 5,
                    "n6": 6,
                    "n7": 0,
                    "n8": 7,
                    "n0": 8
                },
                "scaffoldValues": {
                    "x": "a",
                    "y": "c"
                }
            },
            "f": "0.653578",
            "g": "0.495427"
        },
        {
            "id": 6,
            "pId": 4,
            "type": "generating",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 0,
                    "n5": 5,
                    "n6": 6,
                    "n7": 4,
                    "n8": 7,
                    "n0": 8
                },
                "scaffoldValues": {
                    "x": "a",
                    "y": "b"
                }
            },
            "f": "0.907213",
            "g": "0.293573"
        },
        {
            "id": 4,
            "pId": 2,
            "type": "closing",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 4,
                    "n5": 5,
                    "n6": 6,
                    "n7": 0,
                    "n8": 7,
                    "n0": 8
                },
                "scaffoldValues": {
                    "x": "a",
                    "y": "c"
                }
            },
            "f": "0.687930",
            "g": "0.678225"
        },
        {
            "id": 6,
            "pId": 4,
            "type": "expanding",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 0,
                    "n5": 5,
                    "n6": 6,
                    "n7": 4,
                    "n8": 7,
                    "n0": 8
                },
                "scaffoldValues": {
                    "x": "a",
                    "y": "b"
                }
            },
            "f": "0.538470",
            "g": "0.732847"
        },
        {
            "id": 7,
            "pId": 6,
            "type": "generating",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 5,
                    "n5": 0,
                    "n6": 6,
                    "n7": 4,
                    "n8": 7,
                    "n0": 8
                },
                "scaffoldValues": {
                    "x": "b",
                    "y": "b"
                }
            },
            "f": "0.777499",
            "g": "0.818796"
        },
        {
            "id": 8,
            "pId": 6,
            "type": "generating",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 0,
                    "n2": 2,
                    "n3": 3,
                    "n4": 1,
                    "n5": 5,
                    "n6": 6,
                    "n7": 4,
                    "n8": 7,
                    "n0": 8
                },
                "scaffoldValues": {
                    "x": "a",
                    "y": "a"
                }
            },
            "f": "0.701176",
            "g": "0.00705306"
        },
        {
            "id": 6,
            "pId": 4,
            "type": "closing",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 0,
                    "n5": 5,
                    "n6": 6,
                    "n7": 4,
                    "n8": 7,
                    "n0": 8
                },
                "scaffoldValues": {
                    "x": "a",
                    "y": "b"
                }
            },
            "f": "0.145388",
            "g": "0.374991"
        },
        {
            "id": 7,
            "pId": 6,
            "type": "expanding",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 5,
                    "n5": 0,
                    "n6": 6,
                    "n7": 4,
                    "n8": 7,
                    "n0": 8
                },
                "scaffoldValues": {
                    "x": "b",
                    "y": "b"
                }
            },
            "f": "0.508514",
            "g": "0.589339"
        },
        {
            "id": 9,
            "pId": 7,
            "type": "generating",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 5,
                    "n5": 6,
                    "n6": 0,
                    "n7": 4,
                    "n8": 7,
                    "n0": 8
                },
                "scaffoldValues": {
                    "x": "c",
                    "y": "b"
                }
            },
            "f": "0.674322",
            "g": "0.301884"
        },
        {
            "id": 10,
            "pId": 7,
            "type": "generating",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 0,
                    "n3": 3,
                    "n4": 5,
                    "n5": 2,
                    "n6": 6,
                    "n7": 4,
                    "n8": 7,
                    "n0": 8
                },
                "scaffoldValues": {
                    "x": "b",
                    "y": "a"
                }
            },
            "f": "0.206905",
            "g": "0.322556"
        },
        {
            "id": 11,
            "pId": 7,
            "type": "generating",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 5,
                    "n5": 7,
                    "n6": 6,
                    "n7": 4,
                    "n8": 0,
                    "n0": 8
                },
                "scaffoldValues": {
                    "x": "b",
                    "y": "c"
                }
            },
            "f": "0.521920",
            "g": "0.557915"
        },
        {
            "id": 7,
            "pId": 6,
            "type": "closing",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 5,
                    "n5": 0,
                    "n6": 6,
                    "n7": 4,
                    "n8": 7,
                    "n0": 8
                },
                "scaffoldValues": {
                    "x": "b",
                    "y": "b"
                }
            },
            "f": "0.454067",
            "g": "0.133271"
        },
        {
            "id": 9,
            "pId": 7,
            "type": "expanding",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 5,
                    "n5": 6,
                    "n6": 0,
                    "n7": 4,
                    "n8": 7,
                    "n0": 8
                },
                "scaffoldValues": {
                    "x": "c",
                    "y": "b"
                }
            },
            "f": "0.883163",
            "g": "0.975181"
        },
        {
            "id": 12,
            "pId": 9,
            "type": "generating",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 0,
                    "n4": 5,
                    "n5": 6,
                    "n6": 3,
                    "n7": 4,
                    "n8": 7,
                    "n0": 8
                },
                "scaffoldValues": {
                    "x": "c",
                    "y": "a"
                }
            },
            "f": "0.596134",
            "g": "0.544864"
        },
        {
            "id": 13,
            "pId": 9,
            "type": "generating",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 5,
                    "n5": 6,
                    "n6": 8,
                    "n7": 4,
                    "n8": 7,
                    "n0": 0
                },
                "scaffoldValues": {
                    "x": "c",
                    "y": "c"
                }
            },
            "f": "0.950494",
            "g": "0.330888"
        },
        {
            "id": 9,
            "pId": 7,
            "type": "closing",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 5,
                    "n5": 6,
                    "n6": 0,
                    "n7": 4,
                    "n8": 7,
                    "n0": 8
                },
                "scaffoldValues": {
                    "x": "c",
                    "y": "b"
                }
            },
            "f": "0.415748",
            "g": "0.865509"
        },
        {
            "id": 13,
            "pId": 9,
            "type": "expanding",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 5,
                    "n5": 6,
                    "n6": 8,
                    "n7": 4,
                    "n8": 7,
                    "n0": 0
                },
                "scaffoldValues": {
                    "x": "c",
                    "y": "c"
                }
            },
            "f": "0.0440166",
            "g": "0.690062"
        },
        {
            "id": 14,
            "pId": 13,
            "type": "generating",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 5,
                    "n5": 6,
                    "n6": 8,
                    "n7": 4,
                    "n8": 0,
                    "n0": 7
                },
                "scaffoldValues": {
                    "x": "b",
                    "y": "c"
                }
            },
            "f": "0.619115",
            "g": "0.885411"
        },
        {
            "id": 13,
            "pId": 9,
            "type": "closing",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 5,
                    "n5": 6,
                    "n6": 8,
                    "n7": 4,
                    "n8": 7,
                    "n0": 0
                },
                "scaffoldValues": {
                    "x": "c",
                    "y": "c"
                }
            },
            "f": "0.447671",
            "g": "0.375085"
        },
        {
            "id": 14,
            "pId": 13,
            "type": "expanding",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 5,
                    "n5": 6,
                    "n6": 8,
                    "n7": 4,
                    "n8": 0,
                    "n0": 7
                },
                "scaffoldValues": {
                    "x": "b",
                    "y": "c"
                }
            },
            "f": "0.0280337",
            "g": "0.766646"
        },
        {
            "id": 15,
            "pId": 14,
            "type": "generating",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 5,
                    "n5": 6,
                    "n6": 8,
                    "n7": 0,
                    "n8": 4,
                    "n0": 7
                },
                "scaffoldValues": {
                    "x": "a",
                    "y": "c"
                }
            },
            "f": "0.0479291",
            "g": "0.0286752"
        },
        {
            "id": 16,
            "pId": 14,
            "type": "generating",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 5,
                    "n5": 0,
                    "n6": 8,
                    "n7": 4,
                    "n8": 6,
                    "n0": 7
                },
                "scaffoldValues": {
                    "x": "b",
                    "y": "b"
                }
            },
            "f": "0.960042",
            "g": "0.872180"
        },
        {
            "id": 14,
            "pId": 13,
            "type": "closing",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 5,
                    "n5": 6,
                    "n6": 8,
                    "n7": 4,
                    "n8": 0,
                    "n0": 7
                },
                "scaffoldValues": {
                    "x": "b",
                    "y": "c"
                }
            },
            "f": "0.488793",
            "g": "0.0252248"
        },
        {
            "id": 16,
            "pId": 14,
            "type": "expanding",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 5,
                    "n5": 0,
                    "n6": 8,
                    "n7": 4,
                    "n8": 6,
                    "n0": 7
                },
                "scaffoldValues": {
                    "x": "b",
                    "y": "b"
                }
            },
            "f": "0.224683",
            "g": "0.0927727"
        },
        {
            "id": 17,
            "pId": 16,
            "type": "generating",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 0,
                    "n5": 5,
                    "n6": 8,
                    "n7": 4,
                    "n8": 6,
                    "n0": 7
                },
                "scaffoldValues": {
                    "x": "a",
                    "y": "b"
                }
            },
            "f": "0.459689",
            "g": "0.238500"
        },
        {
            "id": 18,
            "pId": 16,
            "type": "generating",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 5,
                    "n5": 8,
                    "n6": 0,
                    "n7": 4,
                    "n8": 6,
                    "n0": 7
                },
                "scaffoldValues": {
                    "x": "c",
                    "y": "b"
                }
            },
            "f": "0.988219",
            "g": "0.549594"
        },
        {
            "id": 19,
            "pId": 16,
            "type": "generating",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 0,
                    "n3": 3,
                    "n4": 5,
                    "n5": 2,
                    "n6": 8,
                    "n7": 4,
                    "n8": 6,
                    "n0": 7
                },
                "scaffoldValues": {
                    "x": "b",
                    "y": "a"
                }
            },
            "f": "0.647572",
            "g": "0.883430"
        },
        {
            "id": 16,
            "pId": 14,
            "type": "closing",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 5,
                    "n5": 0,
                    "n6": 8,
                    "n7": 4,
                    "n8": 6,
                    "n0": 7
                },
                "scaffoldValues": {
                    "x": "b",
                    "y": "b"
                }
            },
            "f": "0.409808",
            "g": "0.305554"
        },
        {
            "id": 17,
            "pId": 16,
            "type": "expanding",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 0,
                    "n5": 5,
                    "n6": 8,
                    "n7": 4,
                    "n8": 6,
                    "n0": 7
                },
                "scaffoldValues": {
                    "x": "a",
                    "y": "b"
                }
            },
            "f": "0.815405",
            "g": "0.717622"
        },
        {
            "id": 20,
            "pId": 17,
            "type": "generating",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 0,
                    "n2": 2,
                    "n3": 3,
                    "n4": 1,
                    "n5": 5,
                    "n6": 8,
                    "n7": 4,
                    "n8": 6,
                    "n0": 7
                },
                "scaffoldValues": {
                    "x": "a",
                    "y": "a"
                }
            },
            "f": "0.324724",
            "g": "0.687978"
        },
        {
            "id": 21,
            "pId": 17,
            "type": "generating",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 4,
                    "n5": 5,
                    "n6": 8,
                    "n7": 0,
                    "n8": 6,
                    "n0": 7
                },
                "scaffoldValues": {
                    "x": "a",
                    "y": "c"
                }
            },
            "f": "0.678193",
            "g": "0.00247718"
        },
        {
            "id": 17,
            "pId": 16,
            "type": "closing",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 0,
                    "n5": 5,
                    "n6": 8,
                    "n7": 4,
                    "n8": 6,
                    "n0": 7
                },
                "scaffoldValues": {
                    "x": "a",
                    "y": "b"
                }
            },
            "f": "0.498682",
            "g": "0.594689"
        },
        {
            "id": 21,
            "pId": 17,
            "type": "expanding",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 4,
                    "n5": 5,
                    "n6": 8,
                    "n7": 0,
                    "n8": 6,
                    "n0": 7
                },
                "scaffoldValues": {
                    "x": "a",
                    "y": "c"
                }
            },
            "f": "0.987934",
            "g": "0.464812"
        },
        {
            "id": 22,
            "pId": 21,
            "type": "generating",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 4,
                    "n5": 5,
                    "n6": 8,
                    "n7": 6,
                    "n8": 0,
                    "n0": 7
                },
                "scaffoldValues": {
                    "x": "b",
                    "y": "c"
                }
            },
            "f": "0.977820",
            "g": "0.0912010"
        },
        {
            "id": 21,
            "pId": 17,
            "type": "closing",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 4,
                    "n5": 5,
                    "n6": 8,
                    "n7": 0,
                    "n8": 6,
                    "n0": 7
                },
                "scaffoldValues": {
                    "x": "a",
                    "y": "c"
                }
            },
            "f": "0.817011",
            "g": "0.257924"
        },
        {
            "id": 22,
            "pId": 21,
            "type": "expanding",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 4,
                    "n5": 5,
                    "n6": 8,
                    "n7": 6,
                    "n8": 0,
                    "n0": 7
                },
                "scaffoldValues": {
                    "x": "b",
                    "y": "c"
                }
            },
            "f": "0.401490",
            "g": "0.317394"
        },
        {
            "id": 23,
            "pId": 22,
            "type": "generating",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 4,
                    "n5": 5,
                    "n6": 8,
                    "n7": 6,
                    "n8": 7,
                    "n0": 0
                },
                "scaffoldValues": {
                    "x": "c",
                    "y": "c"
                }
            },
            "f": "0.0763298",
            "g": "0.146320"
        },
        {
            "id": 24,
            "pId": 22,
            "type": "generating",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 4,
                    "n5": 0,
                    "n6": 8,
                    "n7": 6,
                    "n8": 5,
                    "n0": 7
                },
                "scaffoldValues": {
                    "x": "b",
                    "y": "b"
                }
            },
            "f": "0.479452",
            "g": "0.873721"
        },
        {
            "id": 22,
            "pId": 21,
            "type": "closing",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 4,
                    "n5": 5,
                    "n6": 8,
                    "n7": 6,
                    "n8": 0,
                    "n0": 7
                },
                "scaffoldValues": {
                    "x": "b",
                    "y": "c"
                }
            },
            "f": "0.466727",
            "g": "0.778669"
        },
        {
            "id": 23,
            "pId": 22,
            "type": "expanding",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 4,
                    "n5": 5,
                    "n6": 8,
                    "n7": 6,
                    "n8": 7,
                    "n0": 0
                },
                "scaffoldValues": {
                    "x": "c",
                    "y": "c"
                }
            },
            "f": "0.165785",
            "g": "0.210175"
        },
        {
            "id": 25,
            "pId": 23,
            "type": "generating",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 4,
                    "n5": 5,
                    "n6": 0,
                    "n7": 6,
                    "n8": 7,
                    "n0": 8
                },
                "scaffoldValues": {
                    "x": "c",
                    "y": "b"
                }
            },
            "f": "0.849340",
            "g": "0.152557"
        },
        {
            "id": 23,
            "pId": 22,
            "type": "closing",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 4,
                    "n5": 5,
                    "n6": 8,
                    "n7": 6,
                    "n8": 7,
                    "n0": 0
                },
                "scaffoldValues": {
                    "x": "c",
                    "y": "c"
                }
            },
            "f": "0.902319",
            "g": "0.0860060"
        },
        {
            "id": 25,
            "pId": 23,
            "type": "expanding",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 4,
                    "n5": 5,
                    "n6": 0,
                    "n7": 6,
                    "n8": 7,
                    "n0": 8
                },
                "scaffoldValues": {
                    "x": "c",
                    "y": "b"
                }
            },
            "f": "0.157621",
            "g": "0.0856888"
        },
        {
            "id": 26,
            "pId": 25,
            "type": "generating",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 4,
                    "n5": 0,
                    "n6": 5,
                    "n7": 6,
                    "n8": 7,
                    "n0": 8
                },
                "scaffoldValues": {
                    "x": "b",
                    "y": "b"
                }
            },
            "f": "0.459500",
            "g": "0.931170"
        },
        {
            "id": 27,
            "pId": 25,
            "type": "generating",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 0,
                    "n4": 4,
                    "n5": 5,
                    "n6": 3,
                    "n7": 6,
                    "n8": 7,
                    "n0": 8
                },
                "scaffoldValues": {
                    "x": "c",
                    "y": "a"
                }
            },
            "f": "0.369479",
            "g": "0.415776"
        },
        {
            "id": 25,
            "pId": 23,
            "type": "closing",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 4,
                    "n5": 5,
                    "n6": 0,
                    "n7": 6,
                    "n8": 7,
                    "n0": 8
                },
                "scaffoldValues": {
                    "x": "c",
                    "y": "b"
                }
            },
            "f": "0.609693",
            "g": "0.246135"
        },
        {
            "id": 26,
            "pId": 25,
            "type": "end",
            "state_variables": {
                "overrideDefaultValues": {
                    "n1": 1,
                    "n2": 2,
                    "n3": 3,
                    "n4": 4,
                    "n5": 0,
                    "n6": 5,
                    "n7": 6,
                    "n8": 7,
                    "n0": 8
                },
                "scaffoldValues": {
                    "x": "b",
                    "y": "b"
                }
            },
            "f": "0.459500",
            "g": "0.931170"
        }
    ]
};
function converter() {
    var newEventList = [];
    console.log(1);
    for (var eventName in tile_events.eventList) {
        var currentEvent = tile_events.eventList[eventName];
        var newObject = {};
        var counter = 1;
        for (var x in (0, lodash_1.range)(1, 4)) {
            for (var y in (0, lodash_1.range)(1, 4)) {
                newObject["".concat(x).concat(y)] = currentEvent["state_variables"]["overrideDefaultValues"]["n".concat(counter)];
                counter += 1;
            }
        }
        newEventList.push(__assign({ "id": currentEvent["id"], "type": currentEvent["type"] }, newObject));
    }
    console.log(newEventList);
}
exports.converter = converter;
console.log(2);
converter();
