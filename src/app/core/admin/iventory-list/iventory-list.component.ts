import {
  Component,
  OnInit,
  NgZone,
  OnDestroy,
  TemplateRef,
} from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import swal from "sweetalert2";
import { ToastrService } from "ngx-toastr";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_moonrisekingdom from "@amcharts/amcharts4/themes/moonrisekingdom";
import am4themes_spiritedaway from "@amcharts/amcharts4/themes/spiritedaway";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
import am4themes_dataviz from "@amcharts/amcharts4/themes/dataviz";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-iventory-list",
  templateUrl: "./iventory-list.component.html",
  styleUrls: ["./iventory-list.component.scss"],
})
export class IventoryListComponent implements OnInit, OnDestroy {
  //table
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows: any = [
    {
      name: "Tiger Nixon",
      typeDoc: "System Architect",
      office: "Edinburgh",
      clientId: "61",
      date: "2011/04/25",
      salary: "$320,800",
      status: "success",
      apiName: "/account_user/",
      apiVersion: "1.0.3",
      totalCall: "87",
    },
    {
      name: "Garrett Winters",
      typeDoc: "Accountant",
      office: "Tokyo",
      clientId: "63",
      date: "2011/07/25",
      salary: "$170,750",
      status: "cancel",
      apiName: "/profix_fpx/",
      apiVersion: "2.9.8",
      totalCall: "76",
    },
    {
      name: "Ashton Cox",
      typeDoc: "Junior Technical Author",
      office: "San Francisco",
      clientId: "66",
      date: "2009/01/12",
      salary: "$86,000",
      status: "success",
      apiName: "/exchange_rate/",
      apiVersion: "3.0.1",
      totalCall: "34",
    },
    {
      name: "Cedric Kelly",
      typeDoc: "Senior Javascript Developer",
      office: "Edinburgh",
      clientId: "22",
      date: "2012/03/29",
      salary: "$433,060",
      status: "cancel",
      apiName: "/account_user/",
      apiVersion: "1.1.0",
      totalCall: "46",
    },
    {
      name: "Airi Satou",
      typeDoc: "Accountant",
      office: "Tokyo",
      clientId: "33",
      date: "2008/11/28",
      salary: "$162,700",
      status: "success",
      apiName: "/profix_fpx/",
      apiVersion: "2.6.5",
      totalCall: "84",
    },
    {
      name: "Brielle Williamson",
      typeDoc: "Integration Specialist",
      office: "New York",
      clientId: "61",
      date: "2012/12/02",
      salary: "$372,000",
      status: "cancel",
      apiName: "/exchange_rate/",
      apiVersion: "2.2.2",
      totalCall: "98",
    },
    {
      name: "Herrod Chandler",
      typeDoc: "Sales Assistant",
      office: "San Francisco",
      clientId: "59",
      date: "2012/08/06",
      salary: "$137,500",
      status: "cancel",
      apiName: "/account_user/",
      apiVersion: "1.9.5",
      totalCall: "36",
    },
    {
      name: "Rhona Davidson",
      typeDoc: "Integration Specialist",
      office: "Tokyo",
      clientId: "55",
      date: "2010/10/14",
      salary: "$327,900",
      status: "success",
      apiName: "/profix_fpx/",
      apiVersion: "1.0.3",
      totalCall: "46",
    },
    {
      name: "Colleen Hurst",
      typeDoc: "Javascript Developer",
      office: "San Francisco",
      clientId: "39",
      date: "2009/09/15",
      salary: "$205,500",
      status: "cancel",
      apiName: "/exchange_rate/",
      apiVersion: "3.4.5",
      totalCall: "53",
    },
    {
      name: "Sonya Frost",
      typeDoc: "Software Engineer",
      office: "Edinburgh",
      clientId: "23",
      date: "2008/12/13",
      salary: "$103,600",
      status: "success",
      apiName: "/account_user/",
      apiVersion: "2.2.5",
      totalCall: "21",
    },
    {
      name: "Jena Gaines",
      typeDoc: "Office ManclientIdr",
      office: "London",
      clientId: "30",
      date: "2008/12/19",
      salary: "$90,560",
      status: "success",
      apiName: "/profix_fpx/",
      apiVersion: "1.1.1",
      totalCall: "57",
    },
    {
      name: "Quinn Flynn",
      typeDoc: "Support Lead",
      office: "Edinburgh",
      clientId: "22",
      date: "2013/03/03",
      salary: "$342,000",
      status: "cancel",
      apiName: "/exchange_rate/",
      apiVersion: "1.0.3",
      totalCall: "78",
    },
    {
      name: "Charde Marshall",
      typeDoc: "Regional Director",
      office: "San Francisco",
      clientId: "36",
      date: "2008/10/16",
      salary: "$470,600",
      status: "success",
      apiName: "/account_user/",
      apiVersion: "1.0.3",
      totalCall: "34",
    },
    {
      name: "Haley Kennedy",
      typeDoc: "Senior Marketing Designer",
      office: "London",
      clientId: "43",
      date: "2012/12/18",
      salary: "$313,500",
      status: "success",
      apiName: "/profix_fpx/",
      apiVersion: "1.0.3",
      totalCall: "51",
    },
    {
      name: "Tatyana Fitzpatrick",
      typeDoc: "Regional Director",
      office: "London",
      clientId: "19",
      date: "2010/03/17",
      salary: "$385,750",
      status: "cancel",
      apiName: "/exchange_rate/",
      apiVersion: "1.0.3",
      totalCall: "23",
    },
  ];
  SelectionType = SelectionType;

  //modal
  modalRef: BsModalRef;

  // Chart
  private chart1: any;
  private chart2: any;
  private chart3: any;

  constructor(
    private zone: NgZone,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {
    this.temp = this.rows.map((prop, key) => {
      return {
        ...prop,
        id: key,
      };
    });
  }

  ngOnInit() {
    this.getCharts();
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart1) {
        console.log("Chart disposed");
        this.chart1.dispose();
      }
      if (this.chart2) {
        console.log("Chart disposed");
        this.chart2.dispose();
      }
      if (this.chart3) {
        console.log("Chart disposed");
        this.chart3.dispose();
      }
    });
  }

  getCharts() {
    this.zone.runOutsideAngular(() => {
      this.getChartAdminListBar();
      this.getChartAdminListPie();
    });
  }

  getChartAdminListBar() {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_dataviz);
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create("chartdivadminlist1", am4charts.XYChart);
    chart.padding(40, 40, 40, 40);

    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "network";
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryY = "network";
    series.dataFields.valueX = "MAU";
    series.tooltipText = "{valueX.value}";
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusBottomRight = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;

    let labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.horizontalCenter = "left";
    labelBullet.label.dx = 10;
    labelBullet.label.text =
      "{values.valueX.workingValue.formatNumber('#.0as')}";
    labelBullet.locationX = 1;

    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add("fill", function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    categoryAxis.sortBySeries = series;
    chart.data = [
      {
        network: "Facebook",
        MAU: 2255250000,
      },
      {
        network: "Google+",
        MAU: 430000000,
      },
      {
        network: "Instagram",
        MAU: 1000000000,
      },
      {
        network: "Pinterest",
        MAU: 246500000,
      },
      {
        network: "Reddit",
        MAU: 355000000,
      },
      {
        network: "TikTok",
        MAU: 500000000,
      },
      {
        network: "Tumblr",
        MAU: 624000000,
      },
      {
        network: "Twitter",
        MAU: 329500000,
      },
      {
        network: "WeChat",
        MAU: 1000000000,
      },
      {
        network: "Weibo",
        MAU: 431000000,
      },
      {
        network: "Whatsapp",
        MAU: 1433333333,
      },
      {
        network: "YouTube",
        MAU: 1900000000,
      },
    ];
    this.chart1 = chart;
  }

  getChartAdminListPie() {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_dataviz);
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create("chartdivadminlist2", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    //chart.legend = new am4charts.Legend();

    chart.data = [
      {
        country: "Electronic",
        litres: 501.9,
      },
      {
        country: "Stationery",
        litres: 301.9,
      },
      {
        country: "House Necessity",
        litres: 201.1,
      },
      {
        country: "Food",
        litres: 165.8,
      },
    ];

    let series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "litres";
    series.dataFields.category = "country";

    this.chart2 = chart;
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }
  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.rows.filter(function (d) {
      for (var key in d) {
        if (d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  successSwal(task) {
    swal.fire({
      title: "Success",
      text: "Successfully " + task + "!",
      type: "success",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success",
    });
    this.modalRef.hide();
  }
}
