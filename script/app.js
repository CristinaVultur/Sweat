
window.onkeyup=function(e){
	if(e.ctrlKey && e.keyCode==73)//inversam la apasarea ctrl i
	{
		var div=document.getElementById("modif");
		vector=Array.prototype.slice.call(div.children);
		var l=vector.length;
		for(let i=l;i>0;i--)
			div.appendChild(vector[i-1]);
	}
}
function styleButton(){
	
	var div=document.getElementById("modif");
	for(let i=1;i<=colectie.length;i++){
		var buton=document.getElementById("but"+i);
		buton.style.display="block";
		buton.style.float="right";
		buton.style.marginTop="2em";
		buton.style.left="1.5em";
		buton.style.backgroundColor="#5c3f5a";
		buton.style.textDecoration="none";
	}	
}
const minimum_size = 1;
function makeResizableDiv(elem)
{
	var parinte=elem.parentElement;
	elem.addEventListener('mousedown',function(e){
	e.preventDefault();
	original_width = parseFloat(getComputedStyle(parinte, null).getPropertyValue('width').replace('px', ''));
    original_height = parseFloat(getComputedStyle(parinte, null).getPropertyValue('height').replace('px', ''));
	original_x = parinte.getBoundingClientRect().left;
    original_y = parinte.getBoundingClientRect().top;
    original_mouse_x = e.pageX;
    original_mouse_y = e.clientY;
	window.addEventListener('mousemove', resize)
    window.addEventListener('mouseup', stopResize)
	})
	function resize(e) {
		elem.style.backgroundColor="green";
		
		const width = original_width + (e.pageX - original_mouse_x);
        const height = original_height + (e.clientY - original_mouse_y)
        var p=parinte.querySelector(".debug");
		if (width > minimum_size) {
          parinte.style.width = width + 'px'
        }
        if (height > minimum_size) {
          parinte.style.height = height + 'px'
	  }
    }
    function stopResize() {
      window.removeEventListener('mousemove', resize)
	  elem.style.backgroundColor="red";
    }
}
var idInterval=-1;var idIntervalRec=-1;
function afisareDiv(div){
		var body = document.getElementsByTagName("main")[0];
		body.appendChild(div);
		idIntervalRec=setTimeout(inchidereDiv,4000,div);
}
function inchidereDiv(div){
	div.remove();
}
function creare_input_text()
{
	var dv=document.createElement("div");
	h.appendChild(dv);
	dv.className="inputt";//text input
	var lb=document.createElement("label");
	var x=document.createElement("input");
	lb.innerHTML="Enter a month:";
	x.id="textinp";
	x.setAttribute("type","text");
	dv.appendChild(lb);
	dv.appendChild(x);
}
function creare_range(){//range input
		var dv1=document.createElement("div");		
		h.appendChild(dv1);
		dv1.className="inputt";		
		var range=document.createElement("input");
		range.setAttribute("type","range");
		var lb1=document.createElement("label");
		lb1.innerHTML="Durata:";
		range.value=10;
		range.max=20;
		range.min=1;
		range.step=1;
		range.id="range";
		var p=document.createElement("p");
		p.innerHTML="Range value: "+range.value;
		p.id="range_value"
		dv1.appendChild(p);
		dv1.appendChild(lb1);
		dv1.appendChild(range);
		dv1.appendChild(p);
}
function creare_radio(){
	var dv1=document.createElement("div");
	h.appendChild(dv1);
	dv1.className="inputt";
	var rd1=document.createElement("input");
	rd1.id="primul";
	rd1.className="radio"
	rd1.setAttribute("type","radio");
	rd1.setAttribute("name","bifat");
	//rd1.setAttribute("checked","checked");
	var lb1=document.createElement("label");
	lb1.innerHTML="First:";
	dv1.appendChild(lb1);
	dv1.appendChild(rd1);
	var rd2=document.createElement("input");
	rd2.id="si";
	rd2.className="radio"
	rd2.setAttribute("type","radio");
	rd2.setAttribute("name","bifat");
	var lb2=document.createElement("label");
	lb2.innerHTML="And:";
	dv1.appendChild(lb2);
	dv1.appendChild(rd2);
	var rd3=document.createElement("input");
	rd3.id="sau";
	rd3.className="radio"
	rd3.setAttribute("type","radio");
	rd3.setAttribute("name","bifat");
	var lb3=document.createElement("label");
	lb3.innerHTML="Or:";
	dv1.appendChild(lb3);
	dv1.appendChild(rd3);
	
}
function create_select(){
	var dv1=document.createElement("div");
	h.appendChild(dv1);
	dv1.className="inputt";
	var selec=document.createElement("select");
	var opt=document.createElement("option");
	dv1.appendChild(selec);
	selec.appendChild(opt);
	selec.id="select"
	opt.setAttribute("value","0");
	opt.innerHTML="Select dificulty:";
	var opt1=document.createElement("option");	
	opt1.setAttribute("value","mica");
	opt1.innerHTML="Small";
	opt1.id="mic"
	selec.appendChild(opt1);	
	var opt2=document.createElement("option");	
	selec.appendChild(opt2);
	opt2.setAttribute("value","medie");
	opt2.innerHTML="Medium";
	opt2.id="mediu"
	var opt3=document.createElement("option");
	selec.appendChild(opt3);
	opt3.setAttribute("value","mare");
	opt3.innerHTML="High";
	opt3.id="mare";	
}
function creare_checkbox()
{
		var dv1=document.createElement("div");
		h.appendChild(dv1);
		dv1.className="inputt";		
		var range=document.createElement("input");
		range.setAttribute("type","checkbox");
		range.id="checkbox";
		var lb1=document.createElement("label");
		lb1.innerHTML="Necesita aparat:";
		dv1.appendChild(lb1);
		dv1.appendChild(range);
}
function include_date()
{
	var dates=document.getElementsByClassName("data");	
	for(let i=0;i<dates.length;i++)
	{
		var string=dates[i].innerHTML;
		var data=new Date(string);
		dates[i].innerHTML=data;
	}
}
function creare_textare(){
	var dv1=document.createElement("div");
	h.appendChild(dv1);
	dv1.className="inputt";
	var txt=document.createElement("textarea");
	txt.id="txt";
	dv1.appendChild(txt);
}
function filtrare_aparat(o)
{
	ok=true
	var x=document.getElementById("checkbox");
	if(x.checked){
		for(el of colectie)
		{
			var loc=el.children[0].children[6].innerHTML.split(" ");
			var verif=loc[2];
			if(loc[2]=="false"){
				if(o.id!="sau")
					el.style.display="none"	
			}
			else{
			if(o.id=="sau")
				el.style.display="block"
			}
		}
	}
	else{
		for(el of colectie)
		{
			var loc=el.children[0].children[6].innerHTML.split(" ");
			var verif=loc[2];
			if(loc[2]=="true"){
				if(o.id!="sau")
				el.style.display="none"
			}
			else{
			if(o.id=="sau")
				el.style.display="block"
			}
		}
	}
}	
function filtrare_dificultate(o)
{

	var sel=document.getElementById("select");
	if(sel.value!="0"){
		ok=true
	for(let i=0;i<colectie.length;i++)
		{
			var loc=colectie[i].children[0].children[5].innerHTML.split(" ");
			var verif=loc[4];
			if(loc[4]!=sel.value){
				if(o.id!="sau")
				colectie[i].style.display="none"
			}
			else{
			if(o.id=="sau")
				el.style.display="block"
		}
	
		}
	}
	
}
function filtrare_range(o){
	
	var x=document.getElementById("range");
	var div=document.getElementById("modif");
	colectie=Array.prototype.slice.call(div.children);
	if(x.value!=x.defaultValue){
		ok=true
	for(let i=0;i<colectie.length;i++){
		var loc=colectie[i].children[0].children[2].innerHTML.split(' ');
		var l=parseInt(loc[1])
		if(l<=range.value-3||l>=parseInt(range.value)+3){
			if(o.id!="sau") colectie[i].style.display="none"
		}
		else{
			if(o.id=="sau")
				el.style.display="block"
		}
	}
	}	

}
function checkInput(x){
	var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
	var monthPartofInput=x.substring(0, 3).toLowerCase();
	if(months.indexOf(monthPartofInput)==-1){
		alert("Wrong input");
		return 0;
	}
	return 1;
}
function filtrare_luna(o){

	var x=document.getElementById("textinp");
	if(checkInput(x.value)){
		ok=true
		var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
		var monthPartofInput=x.value.substring(0, 3).toLowerCase();
		for(el of colectie){
		var loc=new Date(el.children[0].children[4].innerHTML)
		if(loc.getMonth()==months.indexOf(x.value)){
			if(o.id=="sau"){
			el.style.display="block"
		}
		}
		else{
			if(o.id!="sau")
				el.style.display="none"
		}
	}
	}	
}
function filter_prop(opt){
	if(opt.id=="primul"){
		ok=false
		filtrare_luna(opt);
	    if(!ok) filtrare_range(opt);
	    else{ if(!ok) filtrare_aparat(opt);
			else if(!ok) filtrare_dificultate(opt);
		}
	}
	else{
		if(opt.id=="sau"){
			var div=document.getElementById("modif");
			colectie=Array.prototype.slice.call(div.children);
			for(let i=0;i<colectie.length;i++)
			{
				colectie[i].style.display="block"
			}
		}
		filtrare_luna(opt);
	    filtrare_range(opt);
	    filtrare_aparat(opt);
		filtrare_dificultate(opt);
	}
}
function filtrare()
{
	var x=document.getElementsByClassName("radio");
	for(opt of x)
	if(opt.checked)
		filter_prop(opt);

}
var h,div,colectie;
window.onload=function()
{
		h=document.getElementsByClassName("side")[0];
		div=document.getElementById("modif");
		colectie=Array.prototype.slice.call(div.children);
		include_date();
		styleButton();		
		for(let i=1;i<=colectie.length;i++){
		document.getElementById("but"+i).onclick=function(){//setrgem la apasarea butonului
		var currentComponent = this.parentNode.parentNode.parentNode;
		currentComponent.removeChild(this.parentNode.parentNode);
		delete colectie[i];
		colectie=Array.prototype.slice.call(div.children);
		}}
		for(let i=0;i<colectie.length-1;i++){
			makeResizableDiv(document.getElementsByClassName("patratel")[i]);
		}
		creare_input_text()
		creare_range()
		var slider = document.getElementById("range");
		var output = document.getElementById("range_value");
		output.innerHTML = slider.value;
		slider.oninput = function() {
			output.innerHTML = this.value;
		}
		creare_checkbox()
		creare_radio();
		create_select();
		creare_textare();
		var filter=document.createElement("button");
		filter.innerHTML="Filter";
		h.appendChild(filter);
		var sort_min=document.createElement("button");
		sort_min.innerHTML="Sort by time";
		h.appendChild(sort_min);
		var sort_date=document.createElement("button");
		sort_date.innerHTML="Sort by date";
		h.appendChild(sort_date);
		var calt_time=document.createElement("button");
		calt_time.innerHTML="Calculate time of training";
		h.appendChild(calt_time);
		var div=document.createElement("div");
		div.style.marginTop="20em";
		div.style.position="fixed";
		div.style.width="10em"
		div.style.backgroundColor="#5c3f5a"	
		div.style.color="white";
		div.style.float="left";		
		div.innerHTML="Do you want to look the best? Now you can with our personal training!";
		var butt=document.createElement("button");
		div.appendChild(butt);
		butt.innerHTML="Accepta promotia";		
		idInterval=setInterval(afisareDiv,7000,div);
		butt.onclick=function(){
			if(idInterval!=-1){
				inchidereDiv(div);
				clearInterval(idInterval);
			}
		}
		sort_min.onclick=function(){
			var div=document.getElementById("modif");
			vector=Array.prototype.slice.call(div.children);
			vector.sort(function(a,b){
			var min_a=a.children[0].children[2].innerHTML.split(" ");
			var min_b=b.children[0].children[2].innerHTML.split(" ");
			var ma=parseInt(min_a[1]);
			var mb=parseInt(min_b[1]);
			return ma-mb;
			});
			for(v of vector){
				div.appendChild(v);
		}
		}
		sort_date.onclick=function(){
			var div=document.getElementById("modif");
			vector=Array.prototype.slice.call(div.children);
			vector.sort(function(a,b){
			var min_a=new Date(a.children[0].children[4].innerHTML);
			//var min_b=b.children[0].children[4].innerHTML.split(" ");
			var min_b=new Date(b.children[0].children[4].innerHTML)
			return min_a-min_b;
			})
			for(v of vector){
				div.appendChild(v);
			}
		}
		calt_time.onclick=function(){
			var div=document.getElementById("modif");
			vector=Array.prototype.slice.call(div.children);
			var sum=0;
			for(v of vector)
			{
				if(v.style.display!="none"){
					var a=v.children[0].children[2].innerHTML.split(" ");
					sum=sum+parseInt(a[1]);
				}
			}
			var ch=Array.prototype.slice.call(calt_time.children)
			if(ch.length==0){
			var s=document.createElement("p");
			s.innerHTML=sum;
			calt_time.appendChild(s);
			}
			else{
				ch[0].remove();
				var s=document.createElement("p");
				s.innerHTML=sum;
				calt_time.appendChild(s);
			}
		}
		filter.onclick=function(){
			var div=document.getElementById("modif");
			colectie=Array.prototype.slice.call(div.children);
			for(let i=0;i<colectie.length;i++)
			{
				colectie[i].style.display="block"
			}
			filtrare();
			 
		}
		
  $("#txt").on("keyup", function() {
	  var string=$("#txt").val().toLowerCase().split(",")
	  var vector=document.getElementsByClassName("exercitiu");
	  for(v of vector){
		  //var text=v.innerHTML.toLowerCase();
		  for(s of string){
			  $(v).filter(function() {
				
$(this).toggle($(this).text().toLowerCase().indexOf(s) 
> -1)
			});
		  }
			  
	  }
    
  });
}			

		
		

