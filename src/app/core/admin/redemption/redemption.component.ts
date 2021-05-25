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
  selector: "app-redemption",
  templateUrl: "./redemption.component.html",
  styleUrls: ["./redemption.component.scss"],
})
export class RedemptionComponent implements OnInit, OnDestroy {
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
      totalCall: "123",
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
      totalCall: "764",
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
      totalCall: "342",
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
      totalCall: "466",
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
      totalCall: "468",
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
      totalCall: "981",
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
      totalCall: "246",
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
      totalCall: "468",
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
      totalCall: "853",
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
      totalCall: "212",
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
      totalCall: "578",
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
      totalCall: "789",
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
      totalCall: "346",
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
      totalCall: "578",
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
      totalCall: "234",
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
      this.getChartAdminRedemptionSemiPie();
      this.getChartAdminRedemptionPieDonut();
      this.getChartAdminRedemptionBar();
    });
  }

  getChartAdminRedemptionSemiPie() {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_dataviz);
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create("chartdivadminredemption1", am4charts.PieChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = [
      {
        country: "Active",
        value: 401,
      },
      {
        country: "Expired",
        value: 300,
      },
    ];
    chart.radius = am4core.percent(70);
    chart.innerRadius = am4core.percent(40);
    chart.startAngle = 180;
    chart.endAngle = 360;

    let series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "value";
    series.dataFields.category = "country";

    series.slices.template.cornerRadius = 10;
    series.slices.template.innerCornerRadius = 7;
    series.slices.template.draggable = true;
    series.slices.template.inert = true;
    series.alignLabels = false;

    series.hiddenState.properties.startAngle = 90;
    series.hiddenState.properties.endAngle = 90;

    //chart.legend = new am4charts.Legend();
    this.chart1 = chart;
  }

  getChartAdminRedemptionPieDonut() {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_dataviz);
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create("chartdivadminredemption2", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    //chart.legend = new am4charts.Legend();

    chart.data = [
      {
        country: "Already Redeem",
        litres: 501.9,
      },
      {
        country: "Not Redeem",
        litres: 301.9,
      },
    ];

    chart.innerRadius = 100;

    let series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "litres";
    series.dataFields.category = "country";

    this.chart2 = chart;
  }

  getChartAdminRedemptionBar() {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_dataviz);
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("chartdivadminredemption3", am4charts.XYChart);
    chart.scrollbarX = new am4core.Scrollbar();

    // Add data
    chart.data = [
      {
        country: "January",
        visits: 3025,
      },
      {
        country: "February",
        visits: 1882,
      },
      {
        country: "March",
        visits: 1809,
      },
      {
        country: "April",
        visits: 1322,
      },
      {
        country: "May",
        visits: 1122,
      },
      {
        country: "June",
        visits: 1114,
      },
      {
        country: "July",
        visits: 984,
      },
      {
        country: "August",
        visits: 711,
      },
      {
        country: "September",
        visits: 665,
      },
      {
        country: "October",
        visits: 580,
      },
      {
        country: "November",
        visits: 443,
      },
      {
        country: "December",
        visits: 441,
      },
    ];

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 110;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = "visits";
    series.dataFields.categoryX = "country";
    series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
    series.columns.template.strokeWidth = 0;

    series.tooltip.pointerOrientation = "vertical";

    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.fillOpacity = 0.8;

    // on hover, make corner radiuses bigger
    let hoverState = series.columns.template.column.states.create("hover");
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

    series.columns.template.adapter.add("fill", function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    // Cursor
    chart.cursor = new am4charts.XYCursor();

    this.chart3 = chart;
  }

  entriesChange($event){
    this.entries = $event.target.value;
  }
  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.rows.filter(function(d) {

      for(var key in d){
        if(d[key].toLowerCase().indexOf(val) !== -1){
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
