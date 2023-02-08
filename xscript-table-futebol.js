class Futebol {
    constructor() {
        this._selects = ['over', 'under', 'ambas', 'gols', 'gols-par', 'casa-marca', 'visitante-marca', 'casa-vence', 'visitante-vence'];
        this._filterSelect = "over";
        this._filterColor = "#008000";
        this._savePlacar = {
            copa: 0,
            euro: 0,
            super: 0,
            premier: 0
        };
        this._vitorias = {
            copa: [0, 0],
            euro: [0, 0],
            super: [0, 0],
            premier: [0, 0]
        };
        this._porVitorias = [0, 0];
        this._status = ''
    }
    userVip() {
        if (jsonFutebol.copa.payment != "pended") {
            return
        }
        return !0
    }
    overGols() {
        this._filterSelect = 'over';
        insertTable($(".table-selected select").val().split("/"), liga)
    }
    gols() {
        if (this.userVip()) {
            this._filterSelect = 'gols';
            insertTable($(".table-selected select").val().split("/"), liga)
        }
    }
    underGols() {
        if (this.userVip()) {
            this._filterSelect = 'under';
            insertTable($(".table-selected select").val().split("/"), liga)
        }
    }
    golsPar() {
        if (this.userVip()) {
            this._filterSelect = 'gols-par';
            insertTable($(".table-selected select").val().split("/"), liga)
        }
    }
    casaMarca() {
        if (this.userVip()) {
            this._filterSelect = 'casa-marca';
            insertTable($(".table-selected select").val().split("/"), liga)
        }
    }
    casaVence() {
        if (this.userVip()) {
            this._filterSelect = 'casa-vence';
            insertTable($(".table-selected select").val().split("/"), liga)
        }
    }
    visitanteMarca() {
        if (this.userVip()) {
            this._filterSelect = 'visitante-marca';
            insertTable($(".table-selected select").val().split("/"), liga)
        }
    }
    visitanteVence() {
        if (this.userVip()) {
            this._filterSelect = 'visitante-vence';
            insertTable($(".table-selected select").val().split("/"), liga)
        }
    }
    ambasMarcam() {
        if (this.userVip()) {
            this._filterSelect = 'ambas';
            insertTable($(".table-selected select").val().split("/"), liga)
        }
    }
    resetSelect(add) {
        this._selects.splice(this._selects.indexOf(add), 1);
        this._selects.forEach(element => {
            $(`#${element} option:first`).prop('selected', !0)
        });
        this._selects.push(add)
    }
    modTable(element, elementLiga) {
        switch (this._filterSelect) {
            case 'over':
                if (this.sumPlacar(element) > parseFloat($('#' + this._filterSelect).val())) {
                    this._filterColor = $('#input_green').val();
                    this._vitorias[elementLiga][0]++;
                    this._porVitorias[0]++;
                    this._status = !0
                } else {
                    this._filterColor = $('#input_red').val();
                    this._vitorias[elementLiga][1]++;
                    this._porVitorias[1]++;
                    this._status = !1
                }
                break;
            case 'under':
                if (this.sumPlacar(element) < parseFloat($('#' + this._filterSelect).val())) {
                    this._filterColor = $('#input_green').val();
                    this._vitorias[elementLiga][0]++;
                    this._porVitorias[0]++;
                    this._status = !0
                } else {
                    this._filterColor = $('#input_red').val();
                    this._vitorias[elementLiga][1]++;
                    this._porVitorias[1]++;
                    this._status = !1
                }
                break;
            case "gols":
                switch (this.sumPlacar(element)) {
                    case Number($('#' + this._filterSelect).val()):
                        this._filterColor = $('#input_green').val();
                        this._vitorias[elementLiga][0]++;
                        this._porVitorias[0]++;
                        this._status = !0;
                        break;
                    default:
                        this._filterColor = $('#input_red').val();
                        this._vitorias[elementLiga][1]++;
                        this._porVitorias[1]++;
                        this._status = !1;
                        if ($('#' + this._filterSelect).val() == '5' && this.sumPlacar(element) > 5) {
                            this._filterColor = $('#input_green').val();
                            this._vitorias[elementLiga][0]++;
                            this._porVitorias[0]++;
                            this._status = !0
                        }
                }
                break;
            case 'gols-par':
                if ($('#' + this._filterSelect).val().indexOf(this.sumPlacar(element).toString()) > -1) {
                    this._filterColor = $('#input_green').val();
                    this._vitorias[elementLiga][0]++;
                    this._porVitorias[0]++;
                    this._status = !0
                } else {
                    this._filterColor = $('#input_red').val();
                    this._vitorias[elementLiga][1]++;
                    this._porVitorias[1]++;
                    this._status = !1
                }
                break;
            case 'casa-marca':
                switch ($('#' + this._filterSelect).val()) {
                    case 'yes':
                        if (Number(this.revomeAsc(element)[0]) >= 1) {
                            this._filterColor = $('#input_green').val();
                            this._vitorias[elementLiga][0]++;
                            this._porVitorias[0]++;
                            this._status = !0
                        } else {
                            this._filterColor = $('#input_red').val();
                            this._vitorias[elementLiga][1]++;
                            this._porVitorias[1]++;
                            this._status = !1
                        }
                        break;
                    case 'no':
                        if (Number(this.revomeAsc(element)[0]) < 1) {
                            this._filterColor = $('#input_green').val();
                            this._vitorias[elementLiga][0]++;
                            this._porVitorias[0]++;
                            this._status = !0
                        } else {
                            this._filterColor = $('#input_red').val();
                            this._vitorias[elementLiga][1]++;
                            this._porVitorias[1]++;
                            this._status = !1
                        }
                        break
                }
                break;
            case 'casa-vence':
                let p = this.revomeAsc(element);
                switch ($('#' + this._filterSelect).val()) {
                    case 'yes':
                        if (Number(p[0]) > Number(p[1]) && Number(p[1]) < Number(p[0])) {
                            this._filterColor = $('#input_green').val();
                            this._vitorias[elementLiga][0]++;
                            this._porVitorias[0]++;
                            this._status = !0
                        } else {
                            this._filterColor = $('#input_red').val();
                            this._vitorias[elementLiga][1]++;
                            this._porVitorias[1]++;
                            this._status = !1
                        }
                        break;
                    case 'no':
                        if (Number(p[0]) < Number(p[1]) || Number(p[0]) == Number(p[1])) {
                            this._filterColor = $('#input_green').val();
                            this._vitorias[elementLiga][0]++;
                            this._porVitorias[0]++;
                            this._status = !0
                        } else {
                            this._filterColor = $('#input_red').val();
                            this._vitorias[elementLiga][1]++;
                            this._porVitorias[1]++;
                            this._status = !1
                        }
                        break
                }
                break;
            case 'visitante-marca':
                switch ($('#' + this._filterSelect).val()) {
                    case 'yes':
                        if (Number(this.revomeAsc(element)[1]) >= 1) {
                            this._filterColor = $('#input_green').val();
                            this._vitorias[elementLiga][0]++;
                            this._porVitorias[0]++;
                            this._status = !0
                        } else {
                            this._filterColor = $('#input_red').val();
                            this._vitorias[elementLiga][1]++;
                            this._porVitorias[1]++;
                            this._status = !1
                        }
                        break;
                    case 'no':
                        if (Number(this.revomeAsc(element)[1]) < 1) {
                            this._filterColor = $('#input_green').val();
                            this._vitorias[elementLiga][0]++;
                            this._porVitorias[0]++;
                            this._status = !0
                        } else {
                            this._filterColor = $('#input_red').val();
                            this._vitorias[elementLiga][1]++;
                            this._porVitorias[1]++;
                            this._status = !1
                        }
                        break
                }
                break;
            case 'visitante-vence':
                let p2 = this.revomeAsc(element);
                switch ($('#' + this._filterSelect).val()) {
                    case 'yes':
                        if (Number(p2[1]) > Number(p2[0]) && Number(p2[0]) < Number(p2[1])) {
                            this._filterColor = $('#input_green').val();
                            this._vitorias[elementLiga][0]++;
                            this._porVitorias[0]++;
                            this._status = !0
                        } else {
                            this._filterColor = $('#input_red').val();
                            this._vitorias[elementLiga][1]++;
                            this._porVitorias[1]++;
                            this._status = !1
                        }
                        break;
                    case 'no':
                        if (Number(p2[1]) < Number(p2[0]) || Number(p2[1]) == Number(p2[0])) {
                            this._filterColor = $('#input_green').val();
                            this._vitorias[elementLiga][0]++;
                            this._porVitorias[0]++;
                            this._status = !0
                        } else {
                            this._filterColor = $('#input_red').val();
                            this._vitorias[elementLiga][1]++;
                            this._porVitorias[1]++;
                            this._status = !1
                        }
                        break
                }
                break;
            case 'ambas':
                let placar = this.revomeAsc(element);
                switch ($('#' + this._filterSelect).val()) {
                    case 'yes':
                        if (Number(placar[0]) > 0 && Number(placar[1]) > 0) {
                            this._filterColor = $('#input_green').val();
                            this._vitorias[elementLiga][0]++;
                            this._porVitorias[0]++;
                            this._status = !0
                        } else {
                            this._filterColor = $('#input_red').val();
                            this._vitorias[elementLiga][1]++;
                            this._porVitorias[1]++;
                            this._status = !1
                        }
                        break;
                    case 'no':
                        if (Number(placar[0]) < 1 || Number(placar[1]) < 1) {
                            this._filterColor = $('#input_green').val();
                            this._vitorias[elementLiga][0]++;
                            this._porVitorias[0]++;
                            this._status = !0
                        } else {
                            this._filterColor = $('#input_red').val();
                            this._vitorias[elementLiga][1]++;
                            this._porVitorias[1]++;
                            this._status = !1
                        }
                        break
                }
                break
        }
        let span = $(`<span/>`).attr({
            style: `background-color: ${this._filterColor};`
        }).append(element);
        return {
            color: this._filterColor,
            span,
            status: this._status
        }
    }
    sumPlacar(value) {
        let val;
        val = this.revomeAsc(value);
        if (val == "OUT") {
            return !1
        }
        if ($.isNumeric(val)) {
            val = Number(val[0]) + Number(val[1]);
            return val
        }
    }
    revomeAsc(value) {
        return value.replace("+", "").replace("-", "")
    }
    createColumn(column, placares, elementLiga) {
        let sumPlacares = 0;
        let placar_minify = [];
        let style = '';
        placares.forEach(element => {
            let p = element.resultadoFt;
            if (p != undefined && p != "OUT") {
                placar_minify.push(this.sumPlacar(p))
            }
        });
        sumPlacares = placar_minify.reduce((accumulator, value) => {
            return accumulator + value
        }, 0);
        this._savePlacar[elementLiga] += sumPlacares;
        if (sumPlacares >= 50) {
            style = 'user-ativo'
        }
        let tdGols = $("<td />").attr({
            class: `box-gamer`
        }).append(`<span class='${style}'>${sumPlacares}</span>`);
        column.append(tdGols);
        let porvit = ((((this._porVitorias[0] + this._porVitorias[1]) - this._porVitorias[1]) / (this._porVitorias[0] + this._porVitorias[1])) * 100).toFixed(2);
        if (porvit >= 50) {
            style = 'user-ativo'
        } else {
            style = "user-inativo"
        }
        let tdVitoria = $("<td />").attr({
            class: `box-gamer ${style}`
        }).append(`<span'>${porvit}%</span>`);
        column.append(tdVitoria);
        this._porVitorias = [0, 0]
    }
    statistics(element) {
        $(`.table-hours-${jsonFutebol[element]['competition']} .media-gols`).empty();
        $(`.table-hours-${jsonFutebol[element]['competition']} .media-gols`).append(`<div>Gols: ${this._savePlacar[element]} | <span>MÃ©dia Gols Por Hora: ${(this._savePlacar[element] / Number($(".time-table select").val())).toFixed(2)}</span></div>`);
        let porvit = porcentagemCalc(this._vitorias[element][0], this._vitorias[element][1]);
        $(`.table-hours-${jsonFutebol[element]['competition']} .trend-green`).html(`${porvit}%`);
        $(`.table-hours-${jsonFutebol[element]['competition']} .trend-red`).html(`${(100 - porvit).toFixed(2)}%`);
        this._savePlacar[element] = 0;
        this._vitorias[element] = [0, 0]
    }
    statisticsColumnX(element) {
        $(`.table-hours-${jsonFutebol[element]['competition']} .header-est-js`).empty();
        $(`.table-hours-${jsonFutebol[element]['competition']} .header-est-js`).append('<th>%</th>');
        let win = [0, 0];
        for (let i = 1; i <= 20; i++) {
            for (let y = 1; y <= Number($(".time-table select").val()); y++) {
                if ($(`.table-hours-${jsonFutebol[element]['competition']} tbody > tr:nth-child(${y}) td:nth-child(${i + 1})`).data("status")) {
                    win[0]++
                } else {
                    win[1]++
                }
            }
            let por = porcentagemCalc(win[0], win[1]);
            let style = '';
            if (por >= 50) {
                style = 'user-ativo'
            } else {
                style = "user-inativo"
            }
            $(`.table-hours-${jsonFutebol[element]['competition']} .header-est-js`).append(`<th>
                    <div class="d-flex flex-column">
                        <span>${win[0]}</span>
                        <span class="${style}">${por}%</span>
                    </div>
                </th>`);
            win = [0, 0]
        }
        $(`.table-hours-${jsonFutebol[element]['competition']} .header-est-js`).append('<th>G</th>', '<th>%</th>')
    }
}
var fut = new Futebol();
let modalVip = new bootstrap.Modal($('#staticBackdropVip'), {});
class Validate {
    constructor() {
        this._ids = [];
        this._grens = {
            copa: 0,
            euro: 0,
            super: 0,
            premier: 0
        };
        this._reds = {
            copa: 0,
            euro: 0,
            super: 0,
            premier: 0
        };
        this._elementLiga = "";
        this._placarFind = {
            copa: 0,
            euro: 0,
            super: 0,
            premier: 0
        };
        this._isAnalise = !1
    }
    markup(option = $(".placar-analise")) {
        let placares = option.val().split("/");
        let cont = 0;
        this._ids = [];
        let response = !1;
        if (placares[placares.length - 1].length == 3) {
            $(`.table-hours-${this._elementLiga} td`).css({
                opacity: 1
            });
            $(`.table-hours-${this._elementLiga} td span`).each(function () {
                if ($(this).text().replace("+", "") == placares[0]) {
                    let id = Number($(this).parents().eq(1).data("id"));
                    if (placares.length > 1) {
                        response = validate.multipleScores(id, placares);
                        if (response) {
                            validate._ids.push(response);
                            cont++;
                            validate.notifyPlate(cont, placares)
                        }
                    } else {
                        $(this).parents().eq(1).css({
                            opacity: .5
                        });
                        validate._ids.push(id);
                        cont++;
                        validate.notifyPlate(cont, placares)
                    }
                }
            })
        } else {
            $(`.table-hours-${this._elementLiga} td`).css({
                opacity: 1
            })
        }
        if (this._isAnalise) {
            this._placarFind[this._elementLiga] = cont;
            this.jump()
        } else {
            stopAnalyze()
        }
    }
    jump(option = $(".jump-placar")) {
        $(`.table-hours-${this._elementLiga} .validate-badge`).removeAttr("data-content");
        let number = option.val();
        if ($.isNumeric(number) && Number(number) > -1 && this._ids.length > 0) {
            this._ids.forEach(element => {
                element += Number(number);
                $(`.table-hours-${this._elementLiga} td[data-id=${element}] div.validate-badge`).attr({
                    "data-content": "âž¡ï¸"
                });
                if ($(`.table-hours-${this._elementLiga} td[data-id=${element}]`).length != 0) {
                    this.checkProhibited(element)
                }
            });
            if (this._grens[this._elementLiga] > 0 || this._reds[this._elementLiga] > 0) {
                startAnalyze();
                if (liga.length == 1) {
                    $(`.table-validate tr`).empty()
                }
                $(`.table-validate .${this._elementLiga}`).empty();
                $(`.table-validate .${this._elementLiga}`).append(`
                    <tr class="${this._elementLiga} p-3">
                        <th>${this._elementLiga.toUpperCase()}</th>
                        <td id="plate">PLACARES ${this._placarFind[this._elementLiga]}</td>
                        <td>
                            <div class="d-flex flex-column">
                                <span class="user-ativo fs-4">Greens <span id="greens">0</span> (<span id="greens_por">0.00</span>)</span>
                                <span class="user-inativo fs-4">Reds <span id="reds">0</span> (<span id="reds_por">0.00</span>)</span>
                            </div>
                        </td>
                    </tr>
                    `);
                let porcent = porcentagemCalc(this._grens[this._elementLiga], this._reds[this._elementLiga]);
                $(`.${this._elementLiga} #greens_por`).html(porcent + "%");
                $(`.${this._elementLiga} #reds`).html(this._reds[this._elementLiga]);
                $(`.${this._elementLiga} #greens`).html(this._grens[this._elementLiga]);
                $(`.${this._elementLiga} #reds_por`).html((100 - porcent).toFixed(2) + "%");
                this._grens[this._elementLiga] = this._reds[this._elementLiga] = 0
            }
        } else {
            $(`.table-validate .${this._elementLiga}`).empty()
        }
    }
    checkProhibited(element) {
        let number = $(".check-prohibited").val();
        if ($.isNumeric(number) && Number(number) > 0) {
            number = element + Number(number);
            for (element; element < number; element++) {
                if ($(`.table-hours-${this._elementLiga} td[data-id=${element+1}]`).data("status")) {
                    this._grens[this._elementLiga]++;
                    $(`.table-hours-${this._elementLiga} td[data-id=${element+1}] div.validate-badge`).attr({
                        "data-content": "âœ…"
                    });
                    return !0
                }
                $(`.table-hours-${this._elementLiga} td[data-id=${element+1}] div.validate-badge`).attr({
                    "data-content": "âŒ"
                })
            }
            this._reds[this._elementLiga]++
        }
    }
    multipleScores(id, placares) {
        let idTeste = id;
        let nextIdElement;
        for (let i = 1; i <= placares.length - 1; i++) {
            idTeste++;
            nextIdElement = `.table-hours-${validate._elementLiga} td[data-id=${idTeste}]`;
            if ($(nextIdElement).text().replace("+", "") == placares[i]) {
                $(`.table-hours-${validate._elementLiga} td[data-id=${id}]`).css({
                    opacity: .5
                });
                $(nextIdElement).css({
                    opacity: .5
                })
            } else {
                return !1
            }
        }
        return idTeste
    }
    notifyPlate(cont, placares) {
        if (cont > this._placarFind[this._elementLiga] && $("#flexSwitchCheckDefault").prop("checked")) {
            $(`[data-liga=${validate._elementLiga}]`).notify(`BATEU [ ${placares.join(" ")} ] NA ${validate._elementLiga.toUpperCase()}`, "success", {
                arrowShow: !0
            })
        }
    }
}
var validate = new Validate();
$(function () {
    $(".placar-analise").keyup(function () {
        let re1 = new RegExp(escapeRegExp("/"), 'g');
        let re2 = new RegExp(escapeRegExp("-"), 'g');
        let texto = chunkString($(this).val().replace(re1, "").replace(re2, ""), 2);
        let newPlates = [];
        if (texto != null) {
            texto.forEach(element => {
                if ($.isNumeric(element[0]) && $.isNumeric(element[1])) {
                    newPlates.push(element[0] + "-" + element[1])
                }
            });
            if (texto.length == newPlates.length) $(this).val(newPlates.join("/"));
        }
    })
});
$(function () {
    $(".placar-analise").keyup(function () {
        validate._isAnalise = !1;
        allLigas()
    })
});
$(function () {
    $(".jump-placar").keyup(function () {
        stopAnalyze()
    })
});
$(function () {
    $(".check-prohibited").keyup(function () {
        stopAnalyze()
    })
});
$("#start-analise").click((e) => {
    if (fut.userVip()) {
        e.preventDefault();
        validate._isAnalise = !0;
        allLigas()
    }
});
$("#clear-analise").click((e) => {
    e.preventDefault();
    $(`.placar-analise`).val("");
    $(`.jump-placar`).val("");
    $(`.check-prohibited`).val("");
    $(`.validate-badge`).removeAttr("data-content");
    $(`table td`).css({
        opacity: 1
    });
    stopAnalyze()
});

function startAnalyze() {
    $("#start-analise i").attr({
        style: "display: block;"
    });
    $(".title-js").text("Analisando");
    $("#flexSwitchCheckDefault").removeAttr("disabled")
}

function stopAnalyze() {
    $("#start-analise i").attr({
        style: "display: none;"
    });
    $(".title-js").text("Analisar");
    $(`.validate-badge`).removeAttr("data-content");
    $(`.table-validate tr`).empty();
    validate._isAnalise = !1;
    $("#flexSwitchCheckDefault").attr({
        "disabled": "disabled"
    });
    $("#flexSwitchCheckDefault").prop("checked", !1)
}

function allLigas() {
    liga.forEach(element => {
        validate._elementLiga = element;
        validate.markup()
    })
}
$("#flexSwitchCheckDefault").click(() => {
    if ($("#flexSwitchCheckDefault").prop("checked")) {
        $(`[data-liga=${validate._elementLiga}]`).notify("NotificaÃ§Ãµes Ativadas", "success")
    } else {
        $(`[data-liga=${validate._elementLiga}]`).notify("NotificaÃ§Ãµes Desativadas", "warn")
    }
});
var jsonFutebol = {
    copa: {},
    euro: {},
    super: {},
    premier: {}
};
var lastUpdated = {
    copa: "",
    euro: "",
    super: "",
    premier: ""
};
var liga = ["copa"];
$(window).on("load", createTableBase(liga));
$(window).on("load", updatData(this, liga));
$(document).ajaxComplete(init);
setInterval(updatDataAutomatic, 10000);

function updatData(option, ligaValue = liga) {
    $(document).ready(function () {
        ligaValue.forEach(element => {
            $.ajax({
                type: "GET",
                dataType: "json",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                url: URL_FUTEBOL + `/${element}/` + (option.value ? option.value : $(".time-table select").val()),
                success: function (data) {
                    let spanValue = $(`.table-hours-${element} .table-selected select`).val().split("/");
                    lastUpdated[element] = data.lastUpdated;
                    jsonFutebol[element] = data;
                    recreationTable(element);
                    $(`.table-hours-${element} .name-liga`).html(`${element} &#x26BD;`.toUpperCase());
                    insertTable(spanValue, [element]);
                    contrastElement(effectsSelected[spanValue[0]], spanValue[0], !1);
                    loadingPage()
                }
            })
        })
    })
};

function updatDataAutomatic() {
    $.ajax({
        type: "POST",
        dataType: "json",
        data: {
            "liga_1": "copa",
            "liga_2": "euro",
            "liga_3": "super",
            "liga_4": "premier",
        },
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        url: URL_FUTEBOL_LAST_UPDAT + `/last_updated`,
        success: function (data) {
            liga.forEach(element => {
                if (data[element] > lastUpdated[element]) {
                    updatData(this, [element])
                }
            });
            return
        }
    })
};

function insertTable(spanValue, ligaValue) {
    if (!effectsSelected[spanValue[0]]) return;
    ligaValue.forEach(elementLiga => {
        $(`.table-hours-${jsonFutebol[elementLiga]['competition']} tbody`).empty();
        jsonFutebol[elementLiga].linhas.forEach(element => {
            let tr = $("<tr />").addClass("box").append(`<td class="hour">${element.hora}</td>`);
            $(`.table-hours-${jsonFutebol[elementLiga]['competition']} tbody`).append(tr);
            element.colunas.forEach(element => {
                let spanValuePrint = [];
                let values = element.id ? fut.modTable(element.resultado, elementLiga) : '';
                switch (spanValue[0]) {
                    case "odd":
                        spanValuePrint.push(`<span style="background-color: ${values.color};">${element.odds ? parseFloat(element.odds.split("|")[$(`.table-hours-${jsonFutebol[element].competition}.table-selected select`).val().split("/")[1]]).toFixed(2) : ""}</span>`);
                        break;
                    default:
                        spanValue.forEach(select => {
                            spanValuePrint.push(`<span style="background-color: ${values.color};">${element[select] ?? ""}</span>`)
                        })
                };
                let td = $("<td/>").attr({
                    title: `${element.timeA ?? ""} ${element.resultado ?? ""} ${element.timeB ?? ""}`,
                    class: element.id ? `box-gamer` : "",
                    "data-id": element.id,
                    "data-status": values.status
                }).append(`<div class="d-flex flex-column">${spanValuePrint.join("")}</div>`, "<div class='validate-badge'></div>");
                tr.append(td)
            });
            fut.createColumn(tr, element.colunas, elementLiga)
        })
    });
    ligaValue.forEach(element => {
        fut.statisticsColumnX(element);
        fut.statistics(element);
        validate._elementLiga = element;
        validate.markup()
    })
};

function selectOption(option, ligaValue) {
    if (fut.userVip()) {
        insertTable(option.value.split("/"), [ligaValue]);
        contrastElement(effectsSelected[option.value.split("/")[0]], option.value.split("/"), !1);
        init()
    } else {
        $(`.table-selected option:nth-child(2)`).prop('selected', !0)
    }
};
var effectsSelected = {
    "resultadoHt": [],
    "resultadoFt": [],
    "odd": []
};

function init() {
    let option = $(".table-selected select").val().split("/");
    $("td.box-gamer").unbind("click").on("click", function () {
        let values = [$(this).children("div").html()];
        contrastElement(values, option[0])
    });
    $(".table-selected .clear-effects").unbind("click").on("click", function () {
        let option = $("select").val();
        $("td.box-gamer").removeAttr("selected style");
        cleanData(effectsSelected, option)
    })
};

function contrastElement(values, option, isClick = !0) {
    if (!effectsSelected[option] || !Array.isArray(values)) {
        return
    };
    if (!$("td.box-gamer:not([selected])").length) {
        $("td.box-gamer").removeAttr("selected style");
        cleanData(effectsSelected)
    };
    values.forEach(value => {
        if (isClick) {
            if (effectsSelected[option].indexOf(value) === -1) {
                effectsSelected[option].push(value)
            } else {
                let index = effectsSelected[option].indexOf(value);
                effectsSelected[option].splice(index, 1)
            };
            if (!effectsSelected[option].length && $("td[style]").length) {
                $("td.box-gamer").removeAttr("selected style");
                cleanData(effectsSelected);
                return
            }
        };
        $("td.box-gamer").each(function () {
            if ($(this).children("div").html() != value && !$(this).attr("selected") || $(this).children("div").html() == value && $(this).attr("selected")) {
                $(this).css({
                    opacity: .5
                }).removeAttr("selected")
            } else {
                $(this).attr("selected", " ").removeAttr("style")
            }
        })
    })
};

function cleanData(object, option = null) {
    if (option) {
        object[option] = [];
        return
    };
    Object.keys(object).forEach(key => {
        object[key] = []
    })
};
$(".select-ligas button").click((data) => {
    if (data.currentTarget.id == "all-ligas") {
        if (fut.userVip() == undefined) {
            return
        }
    }
    window.scroll(0, 0);
    $(".container-loading").css("display", "flex");
    liga = data.currentTarget.dataset.liga.split("/");
    createTableBase();
    updatData(this, liga)
});

function recreationTable(element) {
    $(`.table-hours-${jsonFutebol[element]['competition']} .header-js`).empty();
    $(`.table-hours-${jsonFutebol[element]['competition']} .header-js`).append('<th>H</th>');
    for (let minute = parseInt(jsonFutebol[element].start); minute <= 59; minute += 3) {
        $(`.table-hours-${jsonFutebol[element]['competition']} .header-js`).append(`<th>${minute}</th>`)
    }
    $(`.table-hours-${jsonFutebol[element]['competition']} .header-js`).append('<th>&#x26BD;</th>', '<th>&#x1F4CA;</th>')
}

function createTableBase() {
    $(".table-futebol .table-dynamic").empty();
    liga.forEach(element => {
        $(".table-futebol .table-dynamic").append(`
            <table class="table-hours-${element}">
                <thead>
                    <tr>
                        <th colspan="100%">
                            <section class="container-thead">
                                <div class="table-selected">
                                    <select onchange="javascript:selectOption(this, '${element}');">
                                        <optgroup label="Placar FT e HT">
                                            <option value="resultadoHt">Resultado HT</option>
                                            <option selected="" value="resultadoFt">Resultado FT</option>
                                            <option value="resultadoHt/resultadoFt">Mosaico (HT e FT)</option>
                                        </optgroup>
                                        <!-- <optgroup label="Odd Ambas">
                                            <option value="odd/8">Sim</option>
                                        </optgroup> -->
                                    </select>
                                    <div class="d-flex">
                                        <div title="Green" class="trend-green d-flex align-items-center me-3 px-4 fs-3 rounded-pill"></div>
                                        <div class="name-liga fs-2"></div>
                                        <div title="Red" class="trend-red d-flex align-items-center ms-3 px-4 fs-3 rounded-pill"></div>
                                    </div>
                                    <div class="media-gols"></div>
                                    <span title="Limpar Efeitos"><i class="bi bi-x-circle fs-1 clear-effects"></i></span>
                                </div>
                            </section>
                        </th>
                    </tr>
                    <tr class="box header header-est-js">
                    </tr>
                    <tr class="box header header-js">
                        <!-- Created Js -->
                    </tr>
                </thead>
                <tbody></tbody>
            </table>`)
    })
}
