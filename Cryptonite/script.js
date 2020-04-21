$(document).ready(() => {
    var arrcoins = [];
    var arrfav = [];
    var counter = 0;

    function loading(page) {

        $.ajax({
            type: "GET",
            url: `${page}.html`,
            success: function(result) {
                $("#content-container").append(result);
                if (page == "portfolio") {
                    indexPageLoader();
                }
            }
        })
    }

    loading("portfolio");
    loading("liveReport");
    loading("about");
    $("#homeButton").click(function() {
        $("#liveReportContent").hide();
        $("#aboutContent").hide();
        $("#homePageContent").show();
    })
    $("#liveReportButton").click(function() {
        $("#homePageContent").hide();
        $("#aboutContent").hide();
        $("#liveReportContent").show();
        liveReport();
    })
    $("#aboutButton").click(function() {
        $("#homePageContent").hide();
        $("#liveReportContent").hide();
        $("#aboutContent").show();
    })

    function cardCreator(symbol, name, id) {
        counter++;
        $("#homePageContent").append(
            `<div class="card" >
            <div class="card-header">${symbol} 
            <label class="switch">
                <input type="checkbox" class="checkinput" id="customSwitch${symbol}">
                <lable class="slider"></lable>
            </label>
            </div>
            <div class="card-body">
            <h4 class="card-title">${name.toLowerCase()}</h4>
            <button class="btn btn-warning moreinfo" data-toggle="collapse" data-target="#collapseExample${id}" aria-expanded="false" aria-controls="collapseExample${id}">More info</button>
            <div class="collapse" id="collapseExample${id}">
                <div id="${id}">
                
                </div>
            </div>
        </div>`
        )
    }

    function indexPageLoader() {
        $.ajax({
            type: "GET",
            url: `https://api.coingecko.com/api/v3/coins/list`,
            success: function(result) {
                arrcoins = result;
                for (let i = 0; i < 100; i++) {
                    cardCreator(arrcoins[i].symbol, arrcoins[i].name, arrcoins[i].id);
                }
                seeMore();
                toggleButton()
                search()
            }
        });
    }

    function search() {
        $("#searchButton").on("click", () => {
            let searchInput = $("#wantedCoin").val().toLowerCase();
            $(".card-title").each(function(index, element) {
                if ($(element).html() == searchInput) {
                    let card = $(element).closest(".card")[0];
                    $(".card").hide()
                    $(card).show()
                } else if (searchInput == "") {
                    $(".card").show()
                }
            })
        })
    }

    function toggleButton() {
        $(".checkinput").click(function() {
            let div = $(this).closest(".card")[0];
            if ($(this).prop('checked')) {
                checkFavorites(div);
            } else if ($(this).prop('checked'), true) {
                let uncheckedDiv = arrfav.indexOf(div)
                arrfav.splice(uncheckedDiv, 1);
            }
        })
    }

    function checkFavorites(card) {
        if (arrfav.length == 5) {
            extraCard = card;
            myModal();
            $(".exampleModal").empty();
        } else {
            arrfav.push(card);
        }
    }

    function myModal() {
        $("#modalBody").empty()
        let symbol;
        let name;
        for (let i = 0; arrfav.length > i; i++) {
            symbol = $(arrfav[i]).find(".card-header").text()
            name = $(arrfav[i]).find("h4").text()
            buildModalBody(symbol, name, i);
            actioveModalSwitch(i, symbol)
        }
        ModalCancelButton()
        $("#exampleModal").modal('show')
    }

    function buildModalBody(symbol, name, index) {
        $("#modalBody").append(`
        <div class="card" >
            <div class="card-header">
              <h4 class="coin-symbol">${symbol}</h4>
            </div>
            <div class="custom-control custom-switch">
              <input type="checkbox" class="custom-control-input" id="switch${index}" checked>
              <label class="custom-control-label" for="switch${index}"></label>
            </div>
            <div class="card-body">
              <h4 class="card-title">${name}</h4>
            </div>
          </div>
        `);
    }

    function actioveModalSwitch(index, symbol) {
        $("#switch" + index).click(function() {
            $(arrfav[0]).find(".custom-control-input").prop('checked', false);
            $(`#customSwitch${symbol}`).prop('checked', false);
            arrfav.splice(index, 1);
            arrfav.push(extraCard);
            $('#exampleModal').modal('hide');
        })
    }

    function ModalCancelButton() {
        $("#modalCloser,#modalLitleCloser").click(() => {
            $(extraCard).find(".checkinput").prop('checked', false);
        });
    }

    function seeMore() {
        $(".moreinfo").on("click", function(event) {
                let coinId = event.target.parentElement.children[2].children[0].id;
                waitAjaxforcoin(coinId)
                let timeout = 120000;
                let current_time = Date.now();
                let available_coin = JSON.parse(localStorage.getItem(`${coinId}`));
                if ((available_coin != null) && (current_time - available_coin.ajax_time < timeout)) {
                    $(`#${coinId}`).empty();
                    $(`#${coinId}`).html(`
                    <br>
                    <img class="tumbImage" src="${available_coin.image.thumb}">
                    <br>
                    <span>NIS ₪  : ${available_coin.market_data.current_price.ils.toFixed(3)}</span>
                    <br>
                    <span>USD $  : ${available_coin.market_data.current_price.usd.toFixed(3)}</span>
                    <br>
                    <span>EUR €  : ${available_coin.market_data.current_price.eur.toFixed(3)}</span>
                    `)
                } else {
                    $.ajax({
                        type: 'GET',
                        url: `https://api.coingecko.com/api/v3/coins/${coinId}`,
                        success: function(result) {
                            result.ajax_time = Date.now();
                            localStorage.setItem(`${coinId}`, JSON.stringify(result));
                            $(`#${result.id}`).empty();
                            $(`#${result.id}`).html(`
                                <br>
                                <img class="tumbImage" src="${result.image.thumb}">
                                <br>
                                <span>NIS  ₪ : ${result.market_data.current_price.ils.toFixed(3)}</span>
                                <br>
                                <span>USD  $ : ${result.market_data.current_price.usd.toFixed(3)}</span>
                                <br>
                                <span>EUR  € : ${result.market_data.current_price.eur.toFixed(3)}</span>
                                `)
                        }
                    })
                }
            }

        )


    }

    function waitAjaxforcoin(idelemnt) {
        $(`#${idelemnt}`).html(`
        <div class="text-center">
            <div class="spinner-border text-dark" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        `)

    }

    function liveReport() {

        if (arrfav.length == 0) {
            $("#liveReportContent").hide();
            $("#homePageContent").show();
            alert("Please choose currencies to analyze.");

        } else {

            $("#liveReportContent").empty();


            $("liveReportContent").html(`<div id="chartContainer" style="height: 500px; width: 100%;"></div>`);

            currencyOne = [];
            currencyTwo = [];
            currencyThree = [];
            currencyFour = [];
            currencyFive = [];
            currency_graph_names = [];

            function dataFetch() {
                let one = $(arrfav[0]).find(".card-header").text().toUpperCase()
                let two = $(arrfav[1]).find(".card-header").text().toUpperCase()
                let three = $(arrfav[2]).find(".card-header").text().toUpperCase()
                let four = $(arrfav[3]).find(".card-header").text().toUpperCase()
                let five = $(arrfav[4]).find(".card-header").text().toUpperCase()
                $.ajax({

                    type: 'GET',

                    url: `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${one.trim()},${two.trim()},${three.trim()},${four.trim()},${five.trim()}&tsyms=USD`,

                    success: function(result) {

                        if (result.Response == "Error") {
                            alert("There's no data to analyze from your currencies. Try another choices.");
                            clearInterval(Interval_id);
                            $("#homePage").click();
                        } else {

                            var time = new Date();

                            let counter = 1

                            for (let key in result) {

                                if (counter == 1) {

                                    currencyOne.push({ x: time, y: result[key].USD });
                                    currency_graph_names.push(key);

                                }

                                if (counter == 2) {

                                    currencyTwo.push({ x: time, y: result[key].USD });
                                    currency_graph_names.push(key);

                                }

                                if (counter == 3) {

                                    currencyThree.push({ x: time, y: result[key].USD });
                                    currency_graph_names.push(key);

                                }

                                if (counter == 4) {

                                    currencyFour.push({ x: time, y: result[key].USD });
                                    currency_graph_names.push(key);

                                }

                                if (counter == 5) {

                                    currencyFive.push({ x: time, y: result[key].USD });
                                    currency_graph_names.push(key);

                                }

                                counter++;

                            }

                            graphCreator();

                        }

                    }

                })

            }

            Interval_id = setInterval(function() {
                dataFetch();

            }, 2000)

        }


        function graphCreator() {

            var chart = new CanvasJS.Chart("liveReportContent", {
                exportEnabled: true,
                animationEnabled: false,
                title: {
                    text: "Your top cryptocurrency"
                },
                subtitles: [{
                    text: "Hover the charts to see currency rate"
                }],
                axisX: {
                    valueFormatString: "HH:mm:ss"

                },
                axisY: {
                    title: "Currency Rate",
                    titleFontColor: "#4F81BC",
                    lineColor: "#4F81BC",
                    labelFontColor: "#4F81BC",
                    tickColor: "#4F81BC",
                    includeZero: false
                },
                axisY2: {
                    title: "",
                    titleFontColor: "#C0504E",
                    lineColor: "#C0504E",
                    labelFontColor: "#C0504E",
                    tickColor: "#C0504E",
                    includeZero: false
                },
                toolTip: {
                    shared: true
                },
                legend: {
                    cursor: "pointer",
                    itemclick: toggleDataSeries
                },
                data: [

                    {

                        type: "spline",
                        name: currency_graph_names[0],
                        showInLegend: true,
                        xValueFormatString: "HH:mm:ss",
                        dataPoints: currencyOne

                    },

                    {

                        type: "spline",
                        name: currency_graph_names[1],
                        axisYType: "secondary",
                        showInLegend: true,
                        xValueFormatString: "HH:mm:ss",
                        dataPoints: currencyTwo

                    },

                    {

                        type: "spline",
                        name: currency_graph_names[2],
                        axisYType: "secondary",
                        showInLegend: true,
                        xValueFormatString: "HH:mm:ss",
                        dataPoints: currencyThree

                    },

                    {

                        type: "spline",
                        name: currency_graph_names[3],
                        axisYType: "secondary",
                        showInLegend: true,
                        xValueFormatString: "HH:mm:ss",
                        dataPoints: currencyFour

                    },

                    {

                        type: "spline",
                        name: currency_graph_names[4],
                        axisYType: "secondary",
                        showInLegend: true,
                        xValueFormatString: "HH:mm:ss",
                        dataPoints: currencyFive

                    }

                ]
            });

            chart.render();

            function toggleDataSeries(e) {
                if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                    e.dataSeries.visible = false;
                } else {
                    e.dataSeries.visible = true;
                }
                e.chart.render();
            }

        }
    }

})