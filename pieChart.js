(function() {
	var Pie = (function() {
	
		var F = function(conf) {
               // this.type=null;
               // this.id=null;
              //  this.total=0;
                
				this.init(conf);
				return this;
			};
		F.prototype = {
			defaultBgcolor: ['deeppink', 'mediumslateblue', 'chartreuse', 'goldenrod', "#ffff00", "#2F368F", "#F6A25D", "#2CA8E0", "#77D1F6", '#181818', '#45AB35', "#336699", "#5fD1F6"],
			type: null,
			id: null,
			total: 0,
			container: null,
			data: [],
			init: function(options) {
				for (var p in options) {
					this[p] = options[p];
				}
				this.container = document.getElementById(this.id);
			},
			percentize: function() {

				if (this.type && this.type == '%') {
					var sum = 0;
					for (var i = 0; i < this.data.length; i++) {
						sum += this.data[i][1];
						if (this.data[i + 1] && (sum + this.data[i + 1][1]) > 100) {
							break;
						}
					}
					if (i != this.data.length) {
						this.data = this.data.splice(0, i + 1);
					}
					if (sum != 100) {
						this.data.push(['?', Math.ceil(100 - sum), '#282828']);
					}
				} else {
					var sum = 0;

					for (var i = 0; i < this.data.length; i++) {
						sum += this.data[i][1];
					}
					if (0 == this.total) {
						this.total = sum;
					}
                   
					if (this.total - sum > 0) {

						this.data.push(['?', this.total - sum, '#282828']);
					}

					for (var i = 0; i < this.data.length; i++) {
						this.data[i][1] = Math.round((this.data[i][1] / this.total) * 100);
					}
                   
				}
 

			},
			renderPie: function() {
				var x = this.container.clientWidth * .33;
				var y = this.container.clientHeight * .5;
				var radius = (x > y) ? y : x;
				var ctx = this.container.getContext("2d");
				var startPoint = 0;
				for (var i = 0; i < this.data.length; i++) {
					if (null == this.data[i][2]) {
						this.data[i][2] = this.defaultBgcolor[i % this.defaultBgcolor.length];
					}
					ctx.fillStyle = this.data[i][2];
					ctx.beginPath();
					ctx.moveTo(x, y);
					ctx.arc(x, y, radius, startPoint, startPoint + Math.PI * 2 * (this.data[i][1] / 100), false);
					ctx.fill();
					startPoint += Math.PI * 2 * (this.data[i][1] / 100);
				}
				return true;
			},
			renderLabel: function() {
				var table = ['<table  >'];
				for (var i = 0; i < this.data.length; i++) {
					table.push('<tr><td bgcolor="');
					table.push(this.data[i][2]);
					table.push('">&nbsp;&nbsp;</td><td>');
					table.push(this.data[i][0]);
					table.push("</td><td align=right>");
					if (this.type && this.type == '%') {
						table.push(this.data[i][1] + "%");
					} else {
						table.push(Math.ceil(this.total * this.data[i][1] / 100));
					}
					table.push("</td></tr>");
				}
				table.push("</table>");
				this.container.insertAdjacentHTML("afterEnd", '<div  style="position:absolute;top:10px;right:0;padding:2px;" >  ' + table.join("") + '</div>');
			},
			render: function() {
				this.percentize();
				this.renderPie();
				this.renderLabel();
				return true;
			}
		};
		var Pie = function(conf) {
				return new F(conf);
			},
			r;





		return Pie;

	})();


	window.pie = Pie;
})(window);