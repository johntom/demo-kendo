import { version } from 'aurelia-kendoui-bridge';
import { api } from '../Utils/api'
import moment from 'moment';
import { inject } from 'aurelia-dependency-injection';
import { AppRouter } from 'aurelia-router';
// import { ListViewModel } from '../list-view-model';
// import products from '../data/editing-custom-editor.json!';

import { activationStrategy } from 'aurelia-router';


@inject(AppRouter)

// export class Aboutktemp extends ListViewModel {
export class Kendotemplate {

  data = [{
    text: 'All',
    value: '-1'
  }, {
    text: 'Town1',
    value: '1'
  }, {
    text: 'Town2',
    value: '2'
  }, {
    text: 'Town3',
    value: '3'
  }
    , {
    text: 'Town4',
    value: '4'
  }, {
    text: 'Town5',
    value: '5'
  }, {
    text: 'Town6',
    value: '6'
  }, {
    text: 'Town7',
    value: '7'
  }, {
    text: 'Town8',
    value: '8'
  }, {
    text: 'Town9',
    value: '9'
  }
  ];



  constructor(router) {
    //   constructor(router) {
    // super('two', router);
    this.router = router;
    this.version = version;
    this.ss1;
    this.ss2;
    this.capColor = 1
    localStorage.removeItem("kendo-grid-liability");
    localStorage.removeItem("kendo-grid-names");
    this.gridnames = localStorage["kendo-grid-names"]
    if (this.gridnames === undefined) this.gridnames = ''
  }

  search() {
    // this.datasource.read();
    let s1 = moment(this.startDatePicker).format('MM-DD-YYYY')
    let s2 = moment(this.endDatePicker).format('MM-DD-YYYY')
    let rt = 'lia'
    this.router.navigate(rt + '?town=' + this.capColor + '&d1=' + s1 + '&d2=' + s2);
    console.log('this.route ', this.route)
  }

  townChanged() {
    $(this.town)
      .toggleClass('town-1', this.capColor === '1')
      .toggleClass('town-2 ', this.capColor === '2')
      .toggleClass('town-3', this.capColor === '3')
      .toggleClass('town-4', this.capColor === '4')
      .toggleClass('town-5 ', this.capColor === '5')
      .toggleClass('town-6', this.capColor === '6')
      .toggleClass('town-7', this.capColor === '7')
      .toggleClass('town-8 ', this.capColor === '8')
      .toggleClass('town-9', this.capColor === '9')
      .toggleClass('town-10', this.capColor === '-1')

  }

  determineActivationStrategy() {
    return activationStrategy.replace; //replace the viewmodel with a new instance
    // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
    // or activationStrategy.noChange to explicitly use the default behavior

  }

  activate(params, queryString, routeConfig) {

    let d1 = params.d1
    if (d1 === undefined) {
      this.capColor = 1
      this.ss1 = '1-1-2016'
      this.ss2 = '10-10-2016'
    } else {
      this.capColor = params.town
      this.ss1 = params.d1
      this.ss2 = params.d2
    }

  }


    attached() {
    //  $(`#${this.id}`).tabs();

    jQuery(this.grid).kendoGrid({
      toolbar: ["excel"],
      excel: {
        fileName: "Kendo UI Grid Export.xlsx",
        proxyURL: "//demos.telerik.com/kendo-ui/service/export",
        filterable: true,
         allPages: true
      },
      excelExport:
      function (e) {
        var rows = e.workbook.sheets[0].rows;

        for (var ri = 0; ri < rows.length; ri++) {
          var row = rows[ri];

          if (row.type == "group-footer" || row.type == "footer") {
            for (var ci = 0; ci < row.cells.length; ci++) {
              var cell = row.cells[ci];
              // Use jQuery.fn.text to remove the HTML and get only the text
              // must have a <div> or it blows
              if (cell.value) {
                cell.value = $(cell.value).text();
                // Set the alignment
                cell.hAlign = "right";
              }
            }
          }
        }

      },
      dataSource: {
        type: "odata",
        transport: {
          read: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
        },
        schema: {
          model: {
            fields: {
              UnitsInStock: { type: "number" },
              ProductName: { type: "string" },
              UnitPrice: { type: "number" },
              UnitsOnOrder: { type: "number" },
            
              SupplierID: { type: "number" },
              CategoryID: { type: "number" }
            }
          }
        },
        pageSize: 7,
        group: {
          field: "SupplierID", aggregates: [
            { field: "ProductName", aggregate: "count" },
            { field: "UnitPrice", aggregate: "sum" },
            { field: "UnitsOnOrder", aggregate: "average" },
            { field: "UnitsInStock", aggregate: "count" },
            { field: "SupplierID", aggregate: "count" }
          ]
        },
        aggregate: [
          { field: "ProductName", aggregate: "count" },
          { field: "UnitPrice", aggregate: "sum" },
          { field: "UnitsOnOrder", aggregate: "average" },
          { field: "UnitsInStock", aggregate: "min" },
          { field: "UnitsInStock", aggregate: "max" },
          { field: "SupplierID", aggregate: "count" },

        ]
      },
      sortable: true,
      pageable: true,
      groupable: true,
      filterable: true,
      columnMenu: true,
      reorderable: true,
      resizable: true,
      columns: [
        {
          width: 300, locked: true, field: "ProductName", title: "Product Name", aggregates: ["count"],

          footerTemplate: "<div style='float: right'>#= kendo.toString(count, '0') #</div>",
          groupFooterTemplate: "<div style='float: right'>#= kendo.toString(count, '0') #</div>"
        },

        { width: 300, field: "UnitPrice", title: "Unit Price", aggregates: ["sum"] },
        {
          width: 300, field: "UnitsOnOrder", title: "-Units On Order-",
          headerAttributes: { style: "text-align:right" },
          attributes: { class: "text-right" },
          format: "{0:00.0}",
          aggregates: ["average"],

          footerTemplate: "<div style='float: right'>#= kendo.toString(average, '0.00') #</div>", 
          groupFooterTemplate: "<div style='float: right'>#= kendo.toString(average, '0.00') #</div>"
        },

        {
          width: 300, field: "UnitsInStock", title: "Units In Stock", aggregates: ["min", "max", "count"],
         
           footerTemplate: "<div> Min: #= min # Max: #= max #</div>",
          groupHeaderTemplate: "<div>Units In Stock: #= value # (Count: #= count#)</div>"
        },
        {
          width: 100, field: "SupplierID", title: " SupplierID", aggregates: ["count"],
          groupHeaderTemplate: "SupplierID: #= value # (Count: #= count#)"
        },

        { width: 100, locked: true, field: "CategoryID", title: "CategoryID" }

      ]
    });
  }

  pageable = {
    refresh: true,
    pageSizes: true,
    buttonCount: 10
  }


  loadGrid() {

    // var options = localStorage["kendo-grid-options"];
    var options = localStorage["kendo-grid-liability" + this.gridname]
    if (options) {
      this.grid.setOptions(JSON.parse(options));
    }

  }
  clearGrid() {

    localStorage.removeItem("kendo-grid-liability");

  }


  saveGrid() {
    // localStorage["kendo-grid-options"] = kendo.stringify(this.grid.getOptions());
    let gnames = localStorage["kendo-grid-names"]
    if (gnames === undefined) {
      localStorage["kendo-grid-names"] = this.gridname
    } else { localStorage["kendo-grid-names"] = gnames + ',' + this.gridname }

    this.gridnames = localStorage["kendo-grid-names"]
    if (this.gridname === undefined) this.gridname = ''

    localStorage["kendo-grid-liability" + this.gridname] = kendo.stringify(this.grid.getOptions());
    alert("Saved to storage. Reload now and click the Load button")
  }
  loadData(town) {

    let s2 = '1-1-2016';
    let s3 = '10-21-2016';
    let twos
    return api.getLiability(town, s2, s3)
      .then((jsonRes) => {
        twos = jsonRes
        console.log('this.twos ', twos)
        return twos

      })
  }
}