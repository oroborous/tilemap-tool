$(init);

function init() {
    $("#redrawMapButton").click(changeTileSize);

    $(".copyButton").click(function () {
        let textBox = $(this).prev(".infoText")[0];
        textBox.select();
        textBox.setSelectionRange(0, 99999);
        document.execCommand("copy");
    });

    $(".mapSize").keyup(updateSizes);
    $(".mapSize").change(updateSizes);

    $("#map").css("background-image", "url('desert_map0.png')");

    changeTileSize();
}

function updateSizes() {
    let tileSize = Number($("#tileSize").val());
    let widthTiles = Number($("#widthTiles").val());
    let heightTiles = Number($("#heightTiles").val());
    let widthPixels = Number($("#widthPixels").val());
    let heightPixels = Number($("#heightPixels").val());

    let whatChanged = this.id;

    if (whatChanged === "tileSize") {
        $("#widthPixels").val(tileSize * widthTiles);
        $("#heightPixels").val(tileSize * heightTiles);
    } else if (whatChanged === "widthTiles") {
        $("#widthPixels").val(tileSize * widthTiles);
    } else if (whatChanged === "heightTiles") {
        $("#heightPixels").val(tileSize * heightTiles);
    } else if (whatChanged === "widthPixels") {
        $("#widthTiles").val(widthPixels / tileSize);
    } else if (whatChanged === "heightPixels") {
        $("#heightTiles").val(heightPixels / tileSize);
    }
}

const TOP_LEFT = "top-left";
const CENTER = "center";
const ROW_COL = "row-column";

let startTile = null;
let endTile = null;

function clickTile(event) {
    let selectedId = this.id;
    if (event.ctrlKey) {
        if (endTile) {
            endTile.removeClass("endTile");
            endTile = endTile.attr("id") === selectedId ? null : $(this);
        } else {
            endTile = $(this);
        }

        if (endTile) {
            endTile.addClass("endTile").removeClass("startTile");
        }

        showTileInfo(endTile, "#endTileRowCol", "#endTileTopLeft", "#endTileCenter");

    } else {
        if (startTile) {
            startTile.removeClass("startTile");
            startTile = startTile.attr("id") === selectedId ? null : $(this);
        } else {
            startTile = $(this);
        }

        if (startTile) {
            startTile.addClass("startTile").removeClass("endTile");
        }
        showTileInfo(startTile, "#startTileRowCol", "#startTileTopLeft", "#startTileCenter");
    }

    showDistance();
}

function formatPythonTuple(jsArray) {
    return "(" + jsArray.join(", ") + ")";
}

function showTileInfo(tile, rowColInputId, topLeftInputId, centerInputId) {
    $(rowColInputId).val(tile ? formatPythonTuple(tile.data(ROW_COL)) : "");
    $(topLeftInputId).val(tile ? formatPythonTuple(tile.data(TOP_LEFT)) : "");
    $(centerInputId).val(tile ? formatPythonTuple(tile.data(CENTER)) : "");
}

function showDistance() {
    let distanceInput = $("#distance");
    if (!startTile || !endTile) {
        distanceInput.val("");
    } else {
        let startCoords = startTile.data(CENTER);
        let endCoords = endTile.data(CENTER);
        let distance = [endCoords[0] - startCoords[0], endCoords[1] - startCoords[1]];
        distanceInput.val(formatPythonTuple(distance));
    }
}


function changeTileSize() {
    let newTileSize = Number($("#tileSize").val());
    let widthTiles = Number($("#widthTiles").val());
    let heightTiles = Number($("#heightTiles").val());

    $("#info").width(window.innerWidth - (newTileSize * widthTiles) - 50);

    let map = $("#map");
    map.empty();
    map.height(newTileSize * heightTiles);
    map.width(newTileSize * widthTiles);

    for (let y = heightTiles; y >= 1; y--) {
        for (let x = 1; x <= widthTiles; x++) {
            let tile = $("<span>");
            tile.attr("id", (x - 1 * widthTiles) + y);
            tile.width(newTileSize);
            tile.height(newTileSize);
            tile.addClass("tile");
            tile.data(ROW_COL, [x, y]);
            tile.data(TOP_LEFT, [Math.round((x - 1) * newTileSize), Math.round(y * newTileSize)]);
            tile.data(CENTER, [Math.round((x - 0.5) * newTileSize), Math.round((y - 0.5) * newTileSize)]);
            tile.html("x=" + x + "<br>y=" + y);
            tile.click(clickTile);
            map.append(tile);
        }
    }

}

function changeBackgroundImage() {

}