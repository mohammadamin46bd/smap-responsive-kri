function resizeIframeHeight(iframe) {
	iframe.height=(iframe.contentWindow.document.body.scrollHeight+14)+"px";
}

window.getQueryParameters= function (strParamName) 
{
  var strReturn = "";
  var strHref = window.location.href;
  if ( strHref.indexOf("?") > -1 ){
    var strQueryString = strHref.substr(strHref.indexOf("?")).toLowerCase();
    var aQueryString = strQueryString.split("&");
    for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){
      if ( 
aQueryString[iParam].indexOf(strParamName.toLowerCase() + "=") > -1 ){
        var aParam = aQueryString[iParam].split("=");
        strReturn = aParam[1];
        break;
      }
    }
  }
  return unescape(strReturn);
}
/**
 * @fileoverview
 * - Using the 'QRCode for Javascript library'
 * - Fixed dataset of 'QRCode for Javascript library' for support full-spec.
 * - this library has no dependencies.
 * 
 * @author davidshimjs
 * @see <a href="http://www.d-project.com/" target="_blank">http://www.d-project.com/</a>
 * @see <a href="http://jeromeetienne.github.com/jquery-qrcode/" target="_blank">http://jeromeetienne.github.com/jquery-qrcode/</a>
 */
var QRCode;

(function () {
	//---------------------------------------------------------------------
	// QRCode for JavaScript
	//
	// Copyright (c) 2009 Kazuhiko Arase
	//
	// URL: http://www.d-project.com/
	//
	// Licensed under the MIT license:
	//   http://www.opensource.org/licenses/mit-license.php
	//
	// The word "QR Code" is registered trademark of 
	// DENSO WAVE INCORPORATED
	//   http://www.denso-wave.com/qrcode/faqpatent-e.html
	//
	//---------------------------------------------------------------------
	function QR8bitByte(data) {
		this.mode = QRMode.MODE_8BIT_BYTE;
		this.data = data;
		this.parsedData = [];

		// Added to support UTF-8 Characters
		for (var i = 0, l = this.data.length; i < l; i++) {
			var byteArray = [];
			var code = this.data.charCodeAt(i);

			if (code > 0x10000) {
				byteArray[0] = 0xF0 | ((code & 0x1C0000) >>> 18);
				byteArray[1] = 0x80 | ((code & 0x3F000) >>> 12);
				byteArray[2] = 0x80 | ((code & 0xFC0) >>> 6);
				byteArray[3] = 0x80 | (code & 0x3F);
			} else if (code > 0x800) {
				byteArray[0] = 0xE0 | ((code & 0xF000) >>> 12);
				byteArray[1] = 0x80 | ((code & 0xFC0) >>> 6);
				byteArray[2] = 0x80 | (code & 0x3F);
			} else if (code > 0x80) {
				byteArray[0] = 0xC0 | ((code & 0x7C0) >>> 6);
				byteArray[1] = 0x80 | (code & 0x3F);
			} else {
				byteArray[0] = code;
			}

			this.parsedData.push(byteArray);
		}

		this.parsedData = Array.prototype.concat.apply([], this.parsedData);

		if (this.parsedData.length != this.data.length) {
			this.parsedData.unshift(191);
			this.parsedData.unshift(187);
			this.parsedData.unshift(239);
		}
	}

	QR8bitByte.prototype = {
		getLength: function (buffer) {
			return this.parsedData.length;
		},
		write: function (buffer) {
			for (var i = 0, l = this.parsedData.length; i < l; i++) {
				buffer.put(this.parsedData[i], 8);
			}
		}
	};

	function QRCodeModel(typeNumber, errorCorrectLevel) {
		this.typeNumber = typeNumber;
		this.errorCorrectLevel = errorCorrectLevel;
		this.modules = null;
		this.moduleCount = 0;
		this.dataCache = null;
		this.dataList = [];
	}

	QRCodeModel.prototype={addData:function(data){var newData=new QR8bitByte(data);this.dataList.push(newData);this.dataCache=null;},isDark:function(row,col){if(row<0||this.moduleCount<=row||col<0||this.moduleCount<=col){throw new Error(row+","+col);}
	return this.modules[row][col];},getModuleCount:function(){return this.moduleCount;},make:function(){this.makeImpl(false,this.getBestMaskPattern());},makeImpl:function(test,maskPattern){this.moduleCount=this.typeNumber*4+17;this.modules=new Array(this.moduleCount);for(var row=0;row<this.moduleCount;row++){this.modules[row]=new Array(this.moduleCount);for(var col=0;col<this.moduleCount;col++){this.modules[row][col]=null;}}
	this.setupPositionProbePattern(0,0);this.setupPositionProbePattern(this.moduleCount-7,0);this.setupPositionProbePattern(0,this.moduleCount-7);this.setupPositionAdjustPattern();this.setupTimingPattern();this.setupTypeInfo(test,maskPattern);if(this.typeNumber>=7){this.setupTypeNumber(test);}
	if(this.dataCache==null){this.dataCache=QRCodeModel.createData(this.typeNumber,this.errorCorrectLevel,this.dataList);}
	this.mapData(this.dataCache,maskPattern);},setupPositionProbePattern:function(row,col){for(var r=-1;r<=7;r++){if(row+r<=-1||this.moduleCount<=row+r)continue;for(var c=-1;c<=7;c++){if(col+c<=-1||this.moduleCount<=col+c)continue;if((0<=r&&r<=6&&(c==0||c==6))||(0<=c&&c<=6&&(r==0||r==6))||(2<=r&&r<=4&&2<=c&&c<=4)){this.modules[row+r][col+c]=true;}else{this.modules[row+r][col+c]=false;}}}},getBestMaskPattern:function(){var minLostPoint=0;var pattern=0;for(var i=0;i<8;i++){this.makeImpl(true,i);var lostPoint=QRUtil.getLostPoint(this);if(i==0||minLostPoint>lostPoint){minLostPoint=lostPoint;pattern=i;}}
	return pattern;},createMovieClip:function(target_mc,instance_name,depth){var qr_mc=target_mc.createEmptyMovieClip(instance_name,depth);var cs=1;this.make();for(var row=0;row<this.modules.length;row++){var y=row*cs;for(var col=0;col<this.modules[row].length;col++){var x=col*cs;var dark=this.modules[row][col];if(dark){qr_mc.beginFill(0,100);qr_mc.moveTo(x,y);qr_mc.lineTo(x+cs,y);qr_mc.lineTo(x+cs,y+cs);qr_mc.lineTo(x,y+cs);qr_mc.endFill();}}}
	return qr_mc;},setupTimingPattern:function(){for(var r=8;r<this.moduleCount-8;r++){if(this.modules[r][6]!=null){continue;}
	this.modules[r][6]=(r%2==0);}
	for(var c=8;c<this.moduleCount-8;c++){if(this.modules[6][c]!=null){continue;}
	this.modules[6][c]=(c%2==0);}},setupPositionAdjustPattern:function(){var pos=QRUtil.getPatternPosition(this.typeNumber);for(var i=0;i<pos.length;i++){for(var j=0;j<pos.length;j++){var row=pos[i];var col=pos[j];if(this.modules[row][col]!=null){continue;}
	for(var r=-2;r<=2;r++){for(var c=-2;c<=2;c++){if(r==-2||r==2||c==-2||c==2||(r==0&&c==0)){this.modules[row+r][col+c]=true;}else{this.modules[row+r][col+c]=false;}}}}}},setupTypeNumber:function(test){var bits=QRUtil.getBCHTypeNumber(this.typeNumber);for(var i=0;i<18;i++){var mod=(!test&&((bits>>i)&1)==1);this.modules[Math.floor(i/3)][i%3+this.moduleCount-8-3]=mod;}
	for(var i=0;i<18;i++){var mod=(!test&&((bits>>i)&1)==1);this.modules[i%3+this.moduleCount-8-3][Math.floor(i/3)]=mod;}},setupTypeInfo:function(test,maskPattern){var data=(this.errorCorrectLevel<<3)|maskPattern;var bits=QRUtil.getBCHTypeInfo(data);for(var i=0;i<15;i++){var mod=(!test&&((bits>>i)&1)==1);if(i<6){this.modules[i][8]=mod;}else if(i<8){this.modules[i+1][8]=mod;}else{this.modules[this.moduleCount-15+i][8]=mod;}}
	for(var i=0;i<15;i++){var mod=(!test&&((bits>>i)&1)==1);if(i<8){this.modules[8][this.moduleCount-i-1]=mod;}else if(i<9){this.modules[8][15-i-1+1]=mod;}else{this.modules[8][15-i-1]=mod;}}
	this.modules[this.moduleCount-8][8]=(!test);},mapData:function(data,maskPattern){var inc=-1;var row=this.moduleCount-1;var bitIndex=7;var byteIndex=0;for(var col=this.moduleCount-1;col>0;col-=2){if(col==6)col--;while(true){for(var c=0;c<2;c++){if(this.modules[row][col-c]==null){var dark=false;if(byteIndex<data.length){dark=(((data[byteIndex]>>>bitIndex)&1)==1);}
	var mask=QRUtil.getMask(maskPattern,row,col-c);if(mask){dark=!dark;}
	this.modules[row][col-c]=dark;bitIndex--;if(bitIndex==-1){byteIndex++;bitIndex=7;}}}
	row+=inc;if(row<0||this.moduleCount<=row){row-=inc;inc=-inc;break;}}}}};QRCodeModel.PAD0=0xEC;QRCodeModel.PAD1=0x11;QRCodeModel.createData=function(typeNumber,errorCorrectLevel,dataList){var rsBlocks=QRRSBlock.getRSBlocks(typeNumber,errorCorrectLevel);var buffer=new QRBitBuffer();for(var i=0;i<dataList.length;i++){var data=dataList[i];buffer.put(data.mode,4);buffer.put(data.getLength(),QRUtil.getLengthInBits(data.mode,typeNumber));data.write(buffer);}
	var totalDataCount=0;for(var i=0;i<rsBlocks.length;i++){totalDataCount+=rsBlocks[i].dataCount;}
	if(buffer.getLengthInBits()>totalDataCount*8){throw new Error("code length overflow. ("
	+buffer.getLengthInBits()
	+">"
	+totalDataCount*8
	+")");}
	if(buffer.getLengthInBits()+4<=totalDataCount*8){buffer.put(0,4);}
	while(buffer.getLengthInBits()%8!=0){buffer.putBit(false);}
	while(true){if(buffer.getLengthInBits()>=totalDataCount*8){break;}
	buffer.put(QRCodeModel.PAD0,8);if(buffer.getLengthInBits()>=totalDataCount*8){break;}
	buffer.put(QRCodeModel.PAD1,8);}
	return QRCodeModel.createBytes(buffer,rsBlocks);};QRCodeModel.createBytes=function(buffer,rsBlocks){var offset=0;var maxDcCount=0;var maxEcCount=0;var dcdata=new Array(rsBlocks.length);var ecdata=new Array(rsBlocks.length);for(var r=0;r<rsBlocks.length;r++){var dcCount=rsBlocks[r].dataCount;var ecCount=rsBlocks[r].totalCount-dcCount;maxDcCount=Math.max(maxDcCount,dcCount);maxEcCount=Math.max(maxEcCount,ecCount);dcdata[r]=new Array(dcCount);for(var i=0;i<dcdata[r].length;i++){dcdata[r][i]=0xff&buffer.buffer[i+offset];}
	offset+=dcCount;var rsPoly=QRUtil.getErrorCorrectPolynomial(ecCount);var rawPoly=new QRPolynomial(dcdata[r],rsPoly.getLength()-1);var modPoly=rawPoly.mod(rsPoly);ecdata[r]=new Array(rsPoly.getLength()-1);for(var i=0;i<ecdata[r].length;i++){var modIndex=i+modPoly.getLength()-ecdata[r].length;ecdata[r][i]=(modIndex>=0)?modPoly.get(modIndex):0;}}
	var totalCodeCount=0;for(var i=0;i<rsBlocks.length;i++){totalCodeCount+=rsBlocks[i].totalCount;}
	var data=new Array(totalCodeCount);var index=0;for(var i=0;i<maxDcCount;i++){for(var r=0;r<rsBlocks.length;r++){if(i<dcdata[r].length){data[index++]=dcdata[r][i];}}}
	for(var i=0;i<maxEcCount;i++){for(var r=0;r<rsBlocks.length;r++){if(i<ecdata[r].length){data[index++]=ecdata[r][i];}}}
	return data;};var QRMode={MODE_NUMBER:1<<0,MODE_ALPHA_NUM:1<<1,MODE_8BIT_BYTE:1<<2,MODE_KANJI:1<<3};var QRErrorCorrectLevel={L:1,M:0,Q:3,H:2};var QRMaskPattern={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};var QRUtil={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:(1<<10)|(1<<8)|(1<<5)|(1<<4)|(1<<2)|(1<<1)|(1<<0),G18:(1<<12)|(1<<11)|(1<<10)|(1<<9)|(1<<8)|(1<<5)|(1<<2)|(1<<0),G15_MASK:(1<<14)|(1<<12)|(1<<10)|(1<<4)|(1<<1),getBCHTypeInfo:function(data){var d=data<<10;while(QRUtil.getBCHDigit(d)-QRUtil.getBCHDigit(QRUtil.G15)>=0){d^=(QRUtil.G15<<(QRUtil.getBCHDigit(d)-QRUtil.getBCHDigit(QRUtil.G15)));}
	return((data<<10)|d)^QRUtil.G15_MASK;},getBCHTypeNumber:function(data){var d=data<<12;while(QRUtil.getBCHDigit(d)-QRUtil.getBCHDigit(QRUtil.G18)>=0){d^=(QRUtil.G18<<(QRUtil.getBCHDigit(d)-QRUtil.getBCHDigit(QRUtil.G18)));}
	return(data<<12)|d;},getBCHDigit:function(data){var digit=0;while(data!=0){digit++;data>>>=1;}
	return digit;},getPatternPosition:function(typeNumber){return QRUtil.PATTERN_POSITION_TABLE[typeNumber-1];},getMask:function(maskPattern,i,j){switch(maskPattern){case QRMaskPattern.PATTERN000:return(i+j)%2==0;case QRMaskPattern.PATTERN001:return i%2==0;case QRMaskPattern.PATTERN010:return j%3==0;case QRMaskPattern.PATTERN011:return(i+j)%3==0;case QRMaskPattern.PATTERN100:return(Math.floor(i/2)+Math.floor(j/3))%2==0;case QRMaskPattern.PATTERN101:return(i*j)%2+(i*j)%3==0;case QRMaskPattern.PATTERN110:return((i*j)%2+(i*j)%3)%2==0;case QRMaskPattern.PATTERN111:return((i*j)%3+(i+j)%2)%2==0;default:throw new Error("bad maskPattern:"+maskPattern);}},getErrorCorrectPolynomial:function(errorCorrectLength){var a=new QRPolynomial([1],0);for(var i=0;i<errorCorrectLength;i++){a=a.multiply(new QRPolynomial([1,QRMath.gexp(i)],0));}
	return a;},getLengthInBits:function(mode,type){if(1<=type&&type<10){switch(mode){case QRMode.MODE_NUMBER:return 10;case QRMode.MODE_ALPHA_NUM:return 9;case QRMode.MODE_8BIT_BYTE:return 8;case QRMode.MODE_KANJI:return 8;default:throw new Error("mode:"+mode);}}else if(type<27){switch(mode){case QRMode.MODE_NUMBER:return 12;case QRMode.MODE_ALPHA_NUM:return 11;case QRMode.MODE_8BIT_BYTE:return 16;case QRMode.MODE_KANJI:return 10;default:throw new Error("mode:"+mode);}}else if(type<41){switch(mode){case QRMode.MODE_NUMBER:return 14;case QRMode.MODE_ALPHA_NUM:return 13;case QRMode.MODE_8BIT_BYTE:return 16;case QRMode.MODE_KANJI:return 12;default:throw new Error("mode:"+mode);}}else{throw new Error("type:"+type);}},getLostPoint:function(qrCode){var moduleCount=qrCode.getModuleCount();var lostPoint=0;for(var row=0;row<moduleCount;row++){for(var col=0;col<moduleCount;col++){var sameCount=0;var dark=qrCode.isDark(row,col);for(var r=-1;r<=1;r++){if(row+r<0||moduleCount<=row+r){continue;}
	for(var c=-1;c<=1;c++){if(col+c<0||moduleCount<=col+c){continue;}
	if(r==0&&c==0){continue;}
	if(dark==qrCode.isDark(row+r,col+c)){sameCount++;}}}
	if(sameCount>5){lostPoint+=(3+sameCount-5);}}}
	for(var row=0;row<moduleCount-1;row++){for(var col=0;col<moduleCount-1;col++){var count=0;if(qrCode.isDark(row,col))count++;if(qrCode.isDark(row+1,col))count++;if(qrCode.isDark(row,col+1))count++;if(qrCode.isDark(row+1,col+1))count++;if(count==0||count==4){lostPoint+=3;}}}
	for(var row=0;row<moduleCount;row++){for(var col=0;col<moduleCount-6;col++){if(qrCode.isDark(row,col)&&!qrCode.isDark(row,col+1)&&qrCode.isDark(row,col+2)&&qrCode.isDark(row,col+3)&&qrCode.isDark(row,col+4)&&!qrCode.isDark(row,col+5)&&qrCode.isDark(row,col+6)){lostPoint+=40;}}}
	for(var col=0;col<moduleCount;col++){for(var row=0;row<moduleCount-6;row++){if(qrCode.isDark(row,col)&&!qrCode.isDark(row+1,col)&&qrCode.isDark(row+2,col)&&qrCode.isDark(row+3,col)&&qrCode.isDark(row+4,col)&&!qrCode.isDark(row+5,col)&&qrCode.isDark(row+6,col)){lostPoint+=40;}}}
	var darkCount=0;for(var col=0;col<moduleCount;col++){for(var row=0;row<moduleCount;row++){if(qrCode.isDark(row,col)){darkCount++;}}}
	var ratio=Math.abs(100*darkCount/moduleCount/moduleCount-50)/5;lostPoint+=ratio*10;return lostPoint;}};var QRMath={glog:function(n){if(n<1){throw new Error("glog("+n+")");}
	return QRMath.LOG_TABLE[n];},gexp:function(n){while(n<0){n+=255;}
	while(n>=256){n-=255;}
	return QRMath.EXP_TABLE[n];},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)};for(var i=0;i<8;i++){QRMath.EXP_TABLE[i]=1<<i;}
	for(var i=8;i<256;i++){QRMath.EXP_TABLE[i]=QRMath.EXP_TABLE[i-4]^QRMath.EXP_TABLE[i-5]^QRMath.EXP_TABLE[i-6]^QRMath.EXP_TABLE[i-8];}
	for(var i=0;i<255;i++){QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]]=i;}
	function QRPolynomial(num,shift){if(num.length==undefined){throw new Error(num.length+"/"+shift);}
	var offset=0;while(offset<num.length&&num[offset]==0){offset++;}
	this.num=new Array(num.length-offset+shift);for(var i=0;i<num.length-offset;i++){this.num[i]=num[i+offset];}}
	QRPolynomial.prototype={get:function(index){return this.num[index];},getLength:function(){return this.num.length;},multiply:function(e){var num=new Array(this.getLength()+e.getLength()-1);for(var i=0;i<this.getLength();i++){for(var j=0;j<e.getLength();j++){num[i+j]^=QRMath.gexp(QRMath.glog(this.get(i))+QRMath.glog(e.get(j)));}}
	return new QRPolynomial(num,0);},mod:function(e){if(this.getLength()-e.getLength()<0){return this;}
	var ratio=QRMath.glog(this.get(0))-QRMath.glog(e.get(0));var num=new Array(this.getLength());for(var i=0;i<this.getLength();i++){num[i]=this.get(i);}
	for(var i=0;i<e.getLength();i++){num[i]^=QRMath.gexp(QRMath.glog(e.get(i))+ratio);}
	return new QRPolynomial(num,0).mod(e);}};function QRRSBlock(totalCount,dataCount){this.totalCount=totalCount;this.dataCount=dataCount;}
	QRRSBlock.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]];QRRSBlock.getRSBlocks=function(typeNumber,errorCorrectLevel){var rsBlock=QRRSBlock.getRsBlockTable(typeNumber,errorCorrectLevel);if(rsBlock==undefined){throw new Error("bad rs block @ typeNumber:"+typeNumber+"/errorCorrectLevel:"+errorCorrectLevel);}
	var length=rsBlock.length/3;var list=[];for(var i=0;i<length;i++){var count=rsBlock[i*3+0];var totalCount=rsBlock[i*3+1];var dataCount=rsBlock[i*3+2];for(var j=0;j<count;j++){list.push(new QRRSBlock(totalCount,dataCount));}}
	return list;};QRRSBlock.getRsBlockTable=function(typeNumber,errorCorrectLevel){switch(errorCorrectLevel){case QRErrorCorrectLevel.L:return QRRSBlock.RS_BLOCK_TABLE[(typeNumber-1)*4+0];case QRErrorCorrectLevel.M:return QRRSBlock.RS_BLOCK_TABLE[(typeNumber-1)*4+1];case QRErrorCorrectLevel.Q:return QRRSBlock.RS_BLOCK_TABLE[(typeNumber-1)*4+2];case QRErrorCorrectLevel.H:return QRRSBlock.RS_BLOCK_TABLE[(typeNumber-1)*4+3];default:return undefined;}};function QRBitBuffer(){this.buffer=[];this.length=0;}
	QRBitBuffer.prototype={get:function(index){var bufIndex=Math.floor(index/8);return((this.buffer[bufIndex]>>>(7-index%8))&1)==1;},put:function(num,length){for(var i=0;i<length;i++){this.putBit(((num>>>(length-i-1))&1)==1);}},getLengthInBits:function(){return this.length;},putBit:function(bit){var bufIndex=Math.floor(this.length/8);if(this.buffer.length<=bufIndex){this.buffer.push(0);}
	if(bit){this.buffer[bufIndex]|=(0x80>>>(this.length%8));}
	this.length++;}};var QRCodeLimitLength=[[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]];
	
	function _isSupportCanvas() {
		return typeof CanvasRenderingContext2D != "undefined";
	}
	
	// android 2.x doesn't support Data-URI spec
	function _getAndroid() {
		var android = false;
		var sAgent = navigator.userAgent;
		
		if (/android/i.test(sAgent)) { // android
			android = true;
			var aMat = sAgent.toString().match(/android ([0-9]\.[0-9])/i);
			
			if (aMat && aMat[1]) {
				android = parseFloat(aMat[1]);
			}
		}
		
		return android;
	}
	
	var svgDrawer = (function() {

		var Drawing = function (el, htOption) {
			this._el = el;
			this._htOption = htOption;
		};

		Drawing.prototype.draw = function (oQRCode) {
			var _htOption = this._htOption;
			var _el = this._el;
			var nCount = oQRCode.getModuleCount();
			var nWidth = Math.floor(_htOption.width / nCount);
			var nHeight = Math.floor(_htOption.height / nCount);

			this.clear();

			function makeSVG(tag, attrs) {
				var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
				for (var k in attrs)
					if (attrs.hasOwnProperty(k)) el.setAttribute(k, attrs[k]);
				return el;
			}

			var svg = makeSVG("svg" , {'viewBox': '0 0 ' + String(nCount) + " " + String(nCount), 'width': '100%', 'height': '100%', 'fill': _htOption.colorLight});
			svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
			_el.appendChild(svg);

			svg.appendChild(makeSVG("rect", {"fill": _htOption.colorLight, "width": "100%", "height": "100%"}));
			svg.appendChild(makeSVG("rect", {"fill": _htOption.colorDark, "width": "1", "height": "1", "id": "template"}));

			for (var row = 0; row < nCount; row++) {
				for (var col = 0; col < nCount; col++) {
					if (oQRCode.isDark(row, col)) {
						var child = makeSVG("use", {"x": String(col), "y": String(row)});
						child.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#template")
						svg.appendChild(child);
					}
				}
			}
		};
		Drawing.prototype.clear = function () {
			while (this._el.hasChildNodes())
				this._el.removeChild(this._el.lastChild);
		};
		return Drawing;
	})();

	var useSVG = document.documentElement.tagName.toLowerCase() === "svg";

	// Drawing in DOM by using Table tag
	var Drawing = useSVG ? svgDrawer : !_isSupportCanvas() ? (function () {
		var Drawing = function (el, htOption) {
			this._el = el;
			this._htOption = htOption;
		};
			
		/**
		 * Draw the QRCode
		 * 
		 * @param {QRCode} oQRCode
		 */
		Drawing.prototype.draw = function (oQRCode) {
            var _htOption = this._htOption;
            var _el = this._el;
			var nCount = oQRCode.getModuleCount();
			var nWidth = Math.floor(_htOption.width / nCount);
			var nHeight = Math.floor(_htOption.height / nCount);
			var aHTML = ['<table style="border:0;border-collapse:collapse;">'];
			
			for (var row = 0; row < nCount; row++) {
				aHTML.push('<tr>');
				
				for (var col = 0; col < nCount; col++) {
					aHTML.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' + nWidth + 'px;height:' + nHeight + 'px;background-color:' + (oQRCode.isDark(row, col) ? _htOption.colorDark : _htOption.colorLight) + ';"></td>');
				}
				
				aHTML.push('</tr>');
			}
			
			aHTML.push('</table>');
			_el.innerHTML = aHTML.join('');
			
			// Fix the margin values as real size.
			var elTable = _el.childNodes[0];
			var nLeftMarginTable = (_htOption.width - elTable.offsetWidth) / 2;
			var nTopMarginTable = (_htOption.height - elTable.offsetHeight) / 2;
			
			if (nLeftMarginTable > 0 && nTopMarginTable > 0) {
				elTable.style.margin = nTopMarginTable + "px " + nLeftMarginTable + "px";	
			}
		};
		
		/**
		 * Clear the QRCode
		 */
		Drawing.prototype.clear = function () {
			this._el.innerHTML = '';
		};
		
		return Drawing;
	})() : (function () { // Drawing in Canvas
		function _onMakeImage() {
			this._elImage.src = this._elCanvas.toDataURL("image/png");
			//2018-07-09
			window.currentQRCode = this._elImage.src;
			//2018-07-09
			this._elImage.style.display = "block";
			this._elCanvas.style.display = "none";			
		}
		
		// Android 2.1 bug workaround
		// http://code.google.com/p/android/issues/detail?id=5141
		if (this._android && this._android <= 2.1) {
	    	var factor = 1 / window.devicePixelRatio;
	        var drawImage = CanvasRenderingContext2D.prototype.drawImage; 
	    	CanvasRenderingContext2D.prototype.drawImage = function (image, sx, sy, sw, sh, dx, dy, dw, dh) {
	    		if (("nodeName" in image) && /img/i.test(image.nodeName)) {
		        	for (var i = arguments.length - 1; i >= 1; i--) {
		            	arguments[i] = arguments[i] * factor;
		        	}
	    		} else if (typeof dw == "undefined") {
	    			arguments[1] *= factor;
	    			arguments[2] *= factor;
	    			arguments[3] *= factor;
	    			arguments[4] *= factor;
	    		}
	    		
	        	drawImage.apply(this, arguments); 
	    	};
		}
		
		/**
		 * Check whether the user's browser supports Data URI or not
		 * 
		 * @private
		 * @param {Function} fSuccess Occurs if it supports Data URI
		 * @param {Function} fFail Occurs if it doesn't support Data URI
		 */
		function _safeSetDataURI(fSuccess, fFail) {
            var self = this;
            self._fFail = fFail;
            self._fSuccess = fSuccess;

            // Check it just once
            if (self._bSupportDataURI === null) {
                var el = document.createElement("img");
                var fOnError = function() {
                    self._bSupportDataURI = false;

                    if (self._fFail) {
                        self._fFail.call(self);
                    }
                };
                var fOnSuccess = function() {
                    self._bSupportDataURI = true;

                    if (self._fSuccess) {
                        self._fSuccess.call(self);
                    }
                };

                el.onabort = fOnError;
                el.onerror = fOnError;
                el.onload = fOnSuccess;
                el.src = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="; // the Image contains 1px data.
                return;
            } else if (self._bSupportDataURI === true && self._fSuccess) {
                self._fSuccess.call(self);
            } else if (self._bSupportDataURI === false && self._fFail) {
                self._fFail.call(self);
            }
		};
		
		/**
		 * Drawing QRCode by using canvas
		 * 
		 * @constructor
		 * @param {HTMLElement} el
		 * @param {Object} htOption QRCode Options 
		 */
		var Drawing = function (el, htOption) {
    		this._bIsPainted = false;
    		this._android = _getAndroid();
		
			this._htOption = htOption;
			this._elCanvas = document.createElement("canvas");
			this._elCanvas.width = htOption.width;
			this._elCanvas.height = htOption.height;
			el.appendChild(this._elCanvas);
			this._el = el;
			this._oContext = this._elCanvas.getContext("2d");
			this._bIsPainted = false;
			this._elImage = document.createElement("img");
			this._elImage.alt = "Scan me!";
			this._elImage.style.display = "none";
			this._el.appendChild(this._elImage);
			this._bSupportDataURI = null;
		};
			
		/**
		 * Draw the QRCode
		 * 
		 * @param {QRCode} oQRCode 
		 */
		Drawing.prototype.draw = function (oQRCode) {
            var _elImage = this._elImage;
            var _oContext = this._oContext;
            var _htOption = this._htOption;
            
			var nCount = oQRCode.getModuleCount();
			var nWidth = _htOption.width / nCount;
			var nHeight = _htOption.height / nCount;
			var nRoundedWidth = Math.round(nWidth);
			var nRoundedHeight = Math.round(nHeight);

			_elImage.style.display = "none";
			this.clear();
			
			for (var row = 0; row < nCount; row++) {
				for (var col = 0; col < nCount; col++) {
					var bIsDark = oQRCode.isDark(row, col);
					var nLeft = col * nWidth;
					var nTop = row * nHeight;
					_oContext.strokeStyle = bIsDark ? _htOption.colorDark : _htOption.colorLight;
					_oContext.lineWidth = 1;
					_oContext.fillStyle = bIsDark ? _htOption.colorDark : _htOption.colorLight;					
					_oContext.fillRect(nLeft, nTop, nWidth, nHeight);
					
					// 안티 앨리어싱 방지 처리
					_oContext.strokeRect(
						Math.floor(nLeft) + 0.5,
						Math.floor(nTop) + 0.5,
						nRoundedWidth,
						nRoundedHeight
					);
					
					_oContext.strokeRect(
						Math.ceil(nLeft) - 0.5,
						Math.ceil(nTop) - 0.5,
						nRoundedWidth,
						nRoundedHeight
					);
				}
			}
			
			this._bIsPainted = true;
		};
			
		/**
		 * Make the image from Canvas if the browser supports Data URI.
		 */
		Drawing.prototype.makeImage = function () {
			if (this._bIsPainted) {
				_safeSetDataURI.call(this, _onMakeImage);
			}
		};
			
		/**
		 * Return whether the QRCode is painted or not
		 * 
		 * @return {Boolean}
		 */
		Drawing.prototype.isPainted = function () {
			return this._bIsPainted;
		};
		
		/**
		 * Clear the QRCode
		 */
		Drawing.prototype.clear = function () {
			this._oContext.clearRect(0, 0, this._elCanvas.width, this._elCanvas.height);
			this._bIsPainted = false;
		};
		
		/**
		 * @private
		 * @param {Number} nNumber
		 */
		Drawing.prototype.round = function (nNumber) {
			if (!nNumber) {
				return nNumber;
			}
			
			return Math.floor(nNumber * 1000) / 1000;
		};
		
		return Drawing;
	})();
	
	/**
	 * Get the type by string length
	 * 
	 * @private
	 * @param {String} sText
	 * @param {Number} nCorrectLevel
	 * @return {Number} type
	 */
	function _getTypeNumber(sText, nCorrectLevel) {			
		var nType = 1;
		var length = _getUTF8Length(sText);
		
		for (var i = 0, len = QRCodeLimitLength.length; i <= len; i++) {
			var nLimit = 0;
			
			switch (nCorrectLevel) {
				case QRErrorCorrectLevel.L :
					nLimit = QRCodeLimitLength[i][0];
					break;
				case QRErrorCorrectLevel.M :
					nLimit = QRCodeLimitLength[i][1];
					break;
				case QRErrorCorrectLevel.Q :
					nLimit = QRCodeLimitLength[i][2];
					break;
				case QRErrorCorrectLevel.H :
					nLimit = QRCodeLimitLength[i][3];
					break;
			}
			
			if (length <= nLimit) {
				break;
			} else {
				nType++;
			}
		}
		
		if (nType > QRCodeLimitLength.length) {
			throw new Error("Too long data");
		}
		
		return nType;
	}

	function _getUTF8Length(sText) {
		var replacedText = encodeURI(sText).toString().replace(/\%[0-9a-fA-F]{2}/g, 'a');
		return replacedText.length + (replacedText.length != sText ? 3 : 0);
	}
	
	/**
	 * @class QRCode
	 * @constructor
	 * @example 
	 * new QRCode(document.getElementById("test"), "http://jindo.dev.naver.com/collie");
	 *
	 * @example
	 * var oQRCode = new QRCode("test", {
	 *    text : "http://naver.com",
	 *    width : 128,
	 *    height : 128
	 * });
	 * 
	 * oQRCode.clear(); // Clear the QRCode.
	 * oQRCode.makeCode("http://map.naver.com"); // Re-create the QRCode.
	 *
	 * @param {HTMLElement|String} el target element or 'id' attribute of element.
	 * @param {Object|String} vOption
	 * @param {String} vOption.text QRCode link data
	 * @param {Number} [vOption.width=256]
	 * @param {Number} [vOption.height=256]
	 * @param {String} [vOption.colorDark="#000000"]
	 * @param {String} [vOption.colorLight="#ffffff"]
	 * @param {QRCode.CorrectLevel} [vOption.correctLevel=QRCode.CorrectLevel.H] [L|M|Q|H] 
	 */
	QRCode = function (el, vOption) {
		this._htOption = {
			width : 256, 
			height : 256,
			typeNumber : 4,
			colorDark : "#000000",
			colorLight : "#ffffff",
			correctLevel : QRErrorCorrectLevel.H
		};
		
		if (typeof vOption === 'string') {
			vOption	= {
				text : vOption
			};
		}
		
		// Overwrites options
		if (vOption) {
			for (var i in vOption) {
				this._htOption[i] = vOption[i];
			}
		}
		
		if (typeof el == "string") {
			el = document.getElementById(el);
		}

		if (this._htOption.useSVG) {
			Drawing = svgDrawer;
		}
		
		this._android = _getAndroid();
		this._el = el;
		this._oQRCode = null;
		this._oDrawing = new Drawing(this._el, this._htOption);
		
		if (this._htOption.text) {
			this.makeCode(this._htOption.text);	
		}
	};
	
	/**
	 * Make the QRCode
	 * 
	 * @param {String} sText link data
	 */
	QRCode.prototype.makeCode = function (sText) {
		this._oQRCode = new QRCodeModel(_getTypeNumber(sText, this._htOption.correctLevel), this._htOption.correctLevel);
		this._oQRCode.addData(sText);
		this._oQRCode.make();
		this._el.title = sText;
		this._oDrawing.draw(this._oQRCode);			
		this.makeImage();
	};
	
	/**
	 * Make the Image from Canvas element
	 * - It occurs automatically
	 * - Android below 3 doesn't support Data-URI spec.
	 * 
	 * @private
	 */
	QRCode.prototype.makeImage = function () {
		if (typeof this._oDrawing.makeImage == "function" && (!this._android || this._android >= 3)) {
			this._oDrawing.makeImage();
		}
	};
	
	/**
	 * Clear the QRCode
	 */
	QRCode.prototype.clear = function () {
		this._oDrawing.clear();
	};
	
	/**
	 * @name QRCode.CorrectLevel
	 */
	QRCode.CorrectLevel = QRErrorCorrectLevel;
})();

var smap = {
    core: {},
    event: $("<div />"),
    copyright: "© 2014 Malmö stad, Kristianstad kommun, Helsingborg stad, Lunds kommun"
};
smap.core.Div = L.Class.extend({
    initialize: function() {
        this.parentTag = $("body"),
        this.draw()
    },
    draw: function() {
        var a = $("#mapdiv");
        if (!a.length) {
            var a = $('<div id="mapdiv" class="mapdiv" />')
              , 
            i = $('<div id="maindiv" class="maindiv" />');
            i.append(a),
            this.parentTag.append(i)
        }
        L.Browser.touch && $(window).on("orientationchange", function() {
            window.scrollTo(0, 0)
        }),
        smap.event.on("smap.core.pluginsadded", function() {
            ($("body > header").length || smap.cmd.getControl("MalmoHeader")) && i.addClass("map-with-header");
            var a = utils.getBrowser();
            a.ie && a.ieVersion <= 8 && $(".leaflet-top.leaflet-right").addClass("map-with-header-ie8")
        })
    },
    CLASS_NAME: "smap.core.Div"
});
smap.core.Init = L.Class.extend({
    _selectedFeatures: [],
    initialize: function() {
        this.defineProjs(),
        smap.core.divInst = new smap.core.Div,
        smap.cmd.loading(!0),
        this.init()
    },
    _checkBrowserSupport: function() {
        var e = utils.getBrowser();
        e.ie && e.ieVersion <= 8 && smap.cmd.notify("Obs! Applikationen stödjer inte din webbläsare. Använd en nyare version.", "warning")
    },
    init: function(e) {
        e = e || {};
        var n = this;
        this.drawMap(),
        this._checkBrowserSupport(),
        smap.core.layerInst = new smap.core.Layer(this.map),
        smap.core.selectInst = new smap.core.Select(this.map),
        smap.core.paramInst = new smap.core.Param(this.map),
        smap.core.pluginHandlerInst = new smap.core.PluginHandler(this.map);
        var o = e.params || smap.core.paramInst.getParams();
        this.loadConfig(o.CONFIG).done(function() {
            function e() {
                /*Mohammad Add*/
                
                
                
                /*vakant*/
                if (window.location.host === "193.17.67.229" || window.location.host === "kartor.kristianstad.se") {
                    if (typeof o.QL !== "undefined" && o.QL !== null ) {
                        if (o.QL.length > 0) {
                            var all_qlLayer = o.QL.split(',');
                            
                            if (typeof o.OL !== "undefined" && o.OL !== null ) {
                                if (typeof o.OL === "object") {
                                
                                
                                } else {
                                    o.OL = o.OL.split(',');
                                
                                }
                            
                            } else {
                                o.OL = [];
                            }
                            for (var qla = 0; qla < all_qlLayer.length; qla++) {
                                o.OL.push(all_qlLayer[qla]);
                            
                            }
                        }
                    
                    
                    }
                }
                
                
                
                /*vakant*/
                
                
                
                
                if (typeof o.OL !== "undefined" && o.OL !== null ) {
                    if (typeof o.OL === "object") {
                        
                        
                        
                        if (window.location.host === "193.17.67.229" || window.location.host === "kartor.kristianstad.se") {
                            if (o.OL.length > 0) {
                                /* var allOLids= (function(){var ids=[];for(var i=0;i<config.ol.length;i++){ ids.push(config.ol[i].options.layerId)}  return ids})();*/
                                var allOLids = [];
                                for (var k = 0; k < o.OL.length; k++) {
                                    
                                    for (var m = 0; m < config.ol.length; m++) {
                                        if (o.OL[k].toUpperCase() === config.ol[m].options.layerId.toUpperCase()) {
                                            allOLids.push(config.ol[m].options.layerId);
                                        } else if (typeof config.ol[m].options.alias !== "undefined" && config.ol[m].options.alias !== null ) {
                                            
                                            
                                            
                                            
                                            if (o.OL[k].toUpperCase() === config.ol[m].options.alias.toUpperCase()) {
                                                if (!allOLids.contains) {
                                                    allOLids.push(config.ol[m].options.layerId);
                                                
                                                }
                                            
                                            }
                                        }
                                    
                                    
                                    
                                    }
                                
                                
                                
                                }
                                
                                o.OL = allOLids;
                            }
                        }
                    
                    
                    
                    
                    } else {
                        if (o.OL.toUpperCase() === "ALL") {
                            o.OL = smap.core.Init.prototype._createOLArrayForParamAll()
                        } else {
                            
                            
                            if (window.location.host === "193.17.67.229" || window.location.host === "kartor.kristianstad.se") {
                                if (o.OL.length > 0) {
                                    var ol_Count = 0;
                                    for (var i = 0; i < config.ol.length; i++) {
                                        if (config.ol[i].options.layerId.toUpperCase() === o.OL.toUpperCase()) {
                                            ol_Count++;
                                            break;
                                        }
                                    }
                                    
                                    if (ol_Count === 0) {
                                        for (var j = 0; j < config.ol.length; j++) {
                                            if (typeof config.ol[j].options.alias !== "undefined" && config.ol[j].options.alias !== null ) {
                                                if (config.ol[j].options.alias.toUpperCase() === o.OL.toUpperCase()) {
                                                    o.OL = config.ol[j].options.layerId;
                                                }
                                            
                                            }
                                        
                                        }
                                    
                                    }
                                
                                }
                            }
                        
                        
                        
                        
                        }
                    }
                }
                
                if (window.location.host === "193.17.67.229" || window.location.host === "kartor.kristianstad.se") {
                    
                    if (typeof o.BL !== "undefined" && o.BL !== null ) {
                        if (o.BL.length > 0) {
                            var bl_Count = 0;
                            for (var i = 0; i < config.bl.length; i++) {
                                if (config.bl[i].options.layerId.toUpperCase() === o.BL.toUpperCase()) {
                                    bl_Count++;
                                    break;
                                }
                            }
                            
                            if (bl_Count === 0) {
                                for (var j = 0; j < config.bl.length; j++) {
                                    if (typeof config.bl[j].options.alias !== "undefined" && config.bl[j].options.alias !== null ) {
                                        if (config.bl[j].options.alias.toUpperCase() === o.BL.toUpperCase()) {
                                            o.BL = config.bl[j].options.layerId;
                                        }
                                    
                                    }
                                
                                }
                            
                            }
                        
                        }
                    
                    }
                }
                
                /*Mohammad Add*/
                
                
                
                smap.config.configName = o.CONFIG,
                smap.config.langCode = smap.cmd.getLang();			
				var LayerPanelStatus=window.getQueryParameters('hlp');
				
              
				var hideAllModules= window.getQueryParameters('hideallmodules');
				if(hideAllModules.length>0){
					if(hideAllModules === "true"){
						if(LayerPanelStatus.length>0){				
						}else{
							LayerPanelStatus ="true";
						}
					}
				}
               
				
				if(LayerPanelStatus.length>0){if(LayerPanelStatus==="true"){						
					if(config){for (var lh=0;lh <config.plugins.length;lh++){
						if(config.plugins[lh].init==="L.Control.LayerSwitcher"){config.plugins[lh].options.showBgLabel= false,config.plugins[lh].options.showBgLayer = false, config.plugins[lh].options.showOvLabel = false,config.plugins[lh].options.showOvLayer = false;}						
						}}
				    
					if(smap.config){for (var lh=0;lh <smap.config.plugins.length;lh++){
						if(smap.config.plugins[lh].init==="L.Control.LayerSwitcher"){smap.config.plugins[lh].options.showBgLabel= false,smap.config.plugins[lh].options.showBgLayer = false,smap.config.plugins[lh].options.showOvLabel = false,smap.config.plugins[lh].options.showOvLayer = false;}
						}}						
					}
				}

						
					if(config){for (var lh=0;lh <config.plugins.length;lh++){
						if(config.plugins[lh].init==="L.Control.ShareLink"){if(config.plugins[lh].options){if(config.plugins[lh].options.root){config.plugins[lh].options.root=config.plugins[lh].options.root.replace('abk kartan','kkarta_abk');}}}				
						}}
				    
					if(smap.config){for (var lh=0;lh <smap.config.plugins.length;lh++){
						if(smap.config.plugins[lh].init==="L.Control.ShareLink"){if(smap.config.plugins[lh].options){if(smap.config.plugins[lh].options.root){smap.config.plugins[lh].options.root=smap.config.plugins[lh].options.root.replace('abk kartan','kkarta_abk');}}}				

						}}						
					




				
                n.applyConfig(smap.config),
                o = $.extend({}, utils.objectToUpperCase(smap.config.params || {}), o),
                smap.core.paramInst.applyParams(o),
                smap.cmd.loading(!1)
            }
            if (smap.config = config || window.config,
            smap.config.onLoad) {
                var t = smap.config.onLoad(smap.config);
                t.done(e)
            } else
                e(smap.config)
        }).fail(function() {
            smap.cmd.loading(!1)
        })
    },
    applyConfig: function(e) {
        this.preProcessConfig(e);
        var n = e.coreConfig || {};
        $.extend(smap.core.selectInst.options, n.select || {}),
        $.extend(this.map.options, e.mapConfig || {}),
        $.extend(smap.core.mainConfig.smapOptions, e.smapOptions || {});
        var o = smap.core.mainConfig.smapOptions
          , 
        t = utils.getBrowser();
        t.ie && t.ieVersion <= 8 || $("title").text(o.title);
        var a = o.favIcon;
        if (a && !(t.ie && t.ieVersion <= 8)) {
            var s = $('<link rel="shortcut icon" type="image/x-icon" href="' + a + '" />');
            $("[rel=shortcut]").remove(),
            $("title").after(s)
        }
        this.map.options.maxBounds && this.map.setMaxBounds(this.map.options.maxBounds),
        smap.core.pluginHandlerInst.addPlugins(e.plugins)
    },
    resetMap: function() {
        smap.map.off();
        for (var e = smap.core.controls, n = 0, o = e.length; o > n; n++)
            try {
                smap.map.removeControl(e[n])
            } catch (t) {}
        this.map.remove(),
        this.map = null ,
        delete this.map,
        smap.map = null ,
        delete smap.map,
        window.config = null ;
        try {
            delete window.config
        } catch (t) {}
        smap.config = null ,
        delete smap.config,
        smap.event.off(),
        smap.core.controls = [],
        smap.core.layerInst = null ,
        smap.core.modInst = null ,
        smap.core.paramInst = null ,
        delete smap.core.layerInst,
        delete smap.core.modInst,
        delete smap.core.paramInst
    },
    drawMap: function(e) {
        e = e || {},
        L.Browser.touch && L.Browser.ie && (e.tapTolerance = 30);
        var n = smap.core.mainConfig.mapConfig || {}
          , 
        o = $.extend(n, e);
        this.map = L.map("mapdiv", o),
        smap.map = this.map;
        var t = this.map.attributionControl;
        t.addAttribution(''),
        o.disabledRightClick && this.map.on("contextmenu", function(e) {
            e.originalEvent.preventDefault(),
            e.originalEvent.stopPropagation()
        }),
        utils.getBrowser().ie9 && $(".leaflet-bottom.leaflet-right").addClass(".leaflet-bottom-right-ie9")
    },
    loadConfig: function(e) {
        return e = e || "empty",
        -1 === e.search(/\//g) && (e = document.URL.split("?")[0].search("dev.html") > -1 ? "dist/configs/" + e : "configs/" + e),
        $.ajax({
            url: e,
            context: this,
            dataType: "script"
        })
    },
    preProcessConfig: function(e) {
        e.ws && e.ws.hasOwnProperty(document.domain) && (e.ws = e.ws[document.domain]);
        for (var n = e.bl || [], o = 0, t = n.length; t > o; o++)
            n[o].options = n[o].options || {},
            n[o].options.isBaseLayer = !0;
        for (var a, s = e.bl.concat(e.ol || []), i = this._createLegendUrl, o = 0, t = s.length; t > o; o++)
            a = s[o],
            void 0 === a.options.legend && a.options.layers && _.indexOf(["L.TileLayer.WMS", "L.NonTiledLayer.WMS"], a.init) > -1 && (a.options.legend = i(a.url, a.options.layers))
    },
    _createLegendUrl: function(e, n) {
        n.split(",").length > 1 && (n = n.split(",")[0]);
        var o = "version=1.1.1&request=GetLegendGraphic&format=image/png&width=20&height=20&layer=" + n;
        return utils.urlAppend(e, o)
    },
    /*Mohammad Add*/
    _createOLArrayForParamAll: function() {
        var allOLArray = [];
        if (typeof smap.config.ol !== "undefined" && smap.config.ol !== null ) {
            var ol = smap.config.ol;
            for (var i = 0; i < ol.length; i++) {
                allOLArray.push(ol[i].options.layerId)
            }
        } else {
            allOLArray = null ;
        }
        return allOLArray;
    },
    /*Mohammad Add*/
    defineProjs: function() {
        window.proj4 && (proj4 = window.proj4,
        proj4.defs([
        ["EPSG:4326", "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs"], 
        ["EPSG:3857", "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs"], 
        ["EPSG:3008", "+proj=tmerc +lat_0=0 +lon_0=13.5 +k=1 +x_0=150000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"], 
        ["EPSG:3006", "+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"], 
        ["EPSG:3021", "+proj=tmerc +lat_0=0 +lon_0=15.8062845294444 +k=1.00000561024+x_0=1500064.274 +y_0=-667.711 +ellps=GRS80 +units=m"]
        ]))
    },
    CLASS_NAME: "smap.core.Init"
});
smap.core.Layer = L.Class.extend({
    options: {
        defaultStyle: {
            color: "#00F",
            fillColor: "#00F",
            opacity: 1,
            fillOpacity: .3,
            radius: 8,
            weight: 1
        },
        selectStyle: {
            weight: 5,
            color: "#00DDFF",
            dashArray: "",
            fillOpacity: .8,
            strokeOpacity: 1
        }
    },
    _layers: {},
    _bindEvents: function() {
        var e = this.map;
        this._onLayerAdd = this._onLayerAdd || $.proxy(this.onLayerAdd, this),
        this._onLayerRemove = this._onLayerRemove || $.proxy(this.onLayerRemove, this),
        e.on("layeradd", this._onLayerAdd),
        e.on("layerremove", this._onLayerRemove),
        smap.event.on("smap.core.applyparams", $.proxy(function(t, a) {
            var r;
            if (a.BL && (r = smap.cmd.getLayerConfig(a.BL)),
            r = r || smap.config.bl[0],
            r && r.options && (r.options.isBaseLayer = !0,
            e.addLayer(this._createLayer(r))),
            a.OL) {
                var i, n, o = a.OL instanceof Array ? a.OL : a.OL.split(",");
                for (i = 0,
                n = o.length; n > i; i++)
                    this._addLayerWithConfig(smap.cmd.getLayerConfig(o[i]))
            }
        }, this))
    },
    initialize: function(e) {
        this.map = e,
        this._bindEvents()
    },
    addOverlays: function(e) {
        this._addLayers(e)
    },
    _addLayers: function(e) {
        e = e || [];
        var t, a;
        for (t = 0,
        len = e.length; t < len; t++)
            a = e[t],
            this._addLayerWithConfig(a)
    },
    _addLayerWithConfig: function(e) {
        if (!e || !e.options)
            return !1;
        var t = this._createLayer(e);
        if (!t)
            return !1;
        var a = e.options.parentLayerId ? this._getLayer(e.options.parentLayerId) || this.map : this.map;
        return a.addLayer(t),
        t
    },
    onLayerAdd: function(e) {
        var t = e.layer;
        if (t.options && !t.options._silent && t.options.layerId && !t.feature && (t instanceof L.NonTiledLayer || t._tileContainer || t._layers)) {
            var a = t.options.layerId;
            this._layers[a] = t,
            t._layers && this._wfsLayers.push(t)
        }
    },
    onLayerRemove: function(e) {
        var t = e.layer;
        t._layers && this._wfsLayers.splice(t, 1)
    },
    _getLayer: function(e) {
        return this._layers[e] || null 
    },
    _wfsLayers: [],
    _createLayer: function(t) {
        var layerAlreadyAdded = this._getLayer(t.options.layerId);
        if (layerAlreadyAdded)
            return layerAlreadyAdded;
        var init = eval(t.init);
        init.options = init.options || {},
        t.options.zIndex = t.options.isBaseLayer ? t.options.zIndex || 0 : t.options.zIndex || 10;
        var layer;
        if (t.params)
            layer = Object.create(init.prototype),
            init.apply(layer, t.params),
            t.options && t.options instanceof Object && $.extend(layer.options, t.options);
        else {
            if (t.url) {
                var opts = t.options;
                if (init === L.TileLayer.WMS) {
                    var newOpts = $.extend(!0, {}, opts);
                    newOpts = _.pick(newOpts, ["tileSize", "service", "request", "version", "layers", "styles", "format", "width", "height", "bbox", "angle", "buffer", "cql_filter", "env", "featureid", "filter", "format_options", "maxfeatures", "namespace", "palette", "propertyname", "tiled", "tilesorigin", "scalemethod", "srs", "map_resolution", "transparent"]),
                    layer = new init(t.url,newOpts),
                    $.extend(layer.wmsParams, newOpts),
                    $.extend(layer.options, opts),
                    layer.setZIndex(opts.zIndex)
                }
                /*else if(init === L.OpenLayers_TileLayer){
                					alert('hi')
                					
                				}*/ 
                else
                    layer = new init(t.url,opts)
            } else
                t.key ? (layer = new init(t.key,t.options),
                layer.options.layerid = t.options.layerId,
                this._layers[t.options.layerId] = layer) : layer = new init(t.options);
            layer instanceof L.esri.DynamicMapLayer && (this._layers[t.options.layerId] = layer)
        }
        var self = this;
        return layer.on && layer.options && (layer._layers ? (layer.options.style = !layer.options.style && (!layer.options.geomType || layer.options.geomType && layer.options.geomType.search(/POINT/gi)) > -1 ? null  : layer.options.style || $.extend({}, self.options.defaultStyle),
        layer.on("loadcancel loaderror", function() {
            smap.cmd.loading(!1)
        })) : layer.on("load", function() {
            smap.cmd.loading(!1)
        }),
        layer.on && (layer.on("load", function() {
            smap.cmd.loading(!1)
        }),
        layer.on("loading", function() {
            smap.cmd.loading(!0)
        }))),
        layer
    },
    showLayer: function(e) {
        var t = e instanceof Object ? e : smap.cmd.getLayerConfig(e);
        if (t) {
            var a = this._getLayer(e);
            a || (a = this._createLayer(t));
            var r = t.options.parentLayerId ? this._getLayer(t.options.parentLayerId) || this.map : this.map;
            return r.hasLayer(a) === !1 && r.addLayer(a),
            a
        }
    },
    hideLayer: function(e) {
        var t = e instanceof Object ? e : this._getLayer(e);
        t.fire && t.fire("loadcancel", {
            layer: this
        });
        var a = t.options.parentLayerId ? this._getLayer(t.options.parentLayerId) || this.map : this.map;
        return a.removeLayer(t),
        t
    },
    CLASS_NAME: "smap.core.Layer"
});
smap.core.Param = L.Class.extend({
    initialize: function(a) {
        this.map = a
    },
    _lang: {
        sv: {
            remove: "Ta bort"
        },
        en: {
            remove: "Remove"
        }
    },
    _setLang: function() {
        langCode = smap.config.langCode,
        this._lang && (this.lang = this._lang ? this._lang[langCode] : null )
    },
    getParams: function() {
        var a = this._cachedParams || null ;
        return a || (a = this.getWebParamsAsObject(),
        smap.config && (configParams = smap.config.params || {},
        a = $.extend({}, utils.objectToUpperCase(configParams), a),
        this._cachedParams = a)),
        a
    },
    getWebParamsAsObject: function(a) {
        a = a || "?";
        var t = location.href.split(a)
          , 
        e = t.length > 1 ? t[1] : "";
        return paramsObject = utils.paramsStringToObject(e, !0),
        paramsObject
    },
    getHashParamsAsObject: function() {
        return this.getWebParamsAsObject("#")
    },
    createParamsAsObject: function() {
        var a, t, e, n = this.map.getCenter(), 
        r = this.map._layers, 
        s = [];
        for (var o in r)
            t = r[o],
            t && t.options && t.options.layerId && (t.options.layerId.split('_mergedLayer_').length < 2) && (e = t.options.layerId,
            t.options.isBaseLayer ? a = e : -1 === $.inArray(t.options.layerId, s) && s.push(e));
        var i = {
            zoom: this.map.getZoom(),
            center: [utils.round(n.lng, 5), utils.round(n.lat, 5)],
            ol: s,
            bl: a
        };
        return smap.config.configName && (i.config = smap.config.configName),
        smap.event.trigger("smap.core.createparams", i),
        i
    },
    createParams: function(a) {
        a = a || !1;
        var t, e = this.createParamsAsObject(), 
        n = "";
        for (var r in e) {
            if (t = e[r],
            t instanceof Array) {
                if (!t.length)
                    continue;
                t = t.join(",")
            }
            n += "&" + r + "=" + t
        }
        if (n = n.substring(1),
        a) {
            var s = "";
            a === !0 ? s = document.URL.split("?")[0] + "?" : "string" == typeof a && (s = a),
            n = s + n
        }
        return n
    },
    applyParams: function(a) {
        function t() {
            $(".smap-core-btn-popup").on("click", function() {
                return e.map.removeLayer(g),
                !1
            })
        }
        a = a || {};
        var e = this;
        smap.event.trigger("smap.core.beforeapplyparams", a),
        this._setLang();
        var n = a.ZOOM ? parseInt(a.ZOOM) : 0
          , 
        r = a.CENTER ? L.latLng([parseFloat(a.CENTER[1]), parseFloat(a.CENTER[0])]) : null ;
        
        /*Mohammad Add*/
        if (window.location.host === "193.17.67.229" || window.location.host === "kartor.kristianstad.se") {
            if (Math.abs(r.lat) > 90 || Math.abs(r.lng) > 180) {
                /*  This is a specific case for our Kristianstad map. That part will work for calling the previous link. Previous link have center coordinate in EPSG:3008 system. */
                /*So, here we will just convert the coordinate from EPSG:3008 to EPSG:4326. This is straight forward here.				*/
                var center_4326 = utils.projectPoint(r.lng, r.lat, "EPSG:3008", "EPSG:4326");
                r.lng = center_4326[0];
                r.lat = center_4326[1];
                //n === 0 ? n = 10 : n = n + 10;
            }
        
        
        }
        /*Mohammad Add*/
        
        if (n || 0 === n || (n = this.map.options.minZoom || 0),
        r ? this.map.setView(r, n, {
            animate: !1
        }) : this.map.fitWorld(),
        a.XY) {
            var s = this.getWebParamsAsObject()
              , 
            o = parseFloat(a.XY[1])
              , 
            i = parseFloat(a.XY[0])
              , 
            p = null ;
            if (a.XY.length > 2) {
                var m = a.XY[2];
                if (p = "<p>" + m + '</p><button class="btn btn-default smap-core-btn-popup">' + this.lang.remove + "</button>",
                a.XY.length > 3) {
                    var c = a.XY[3];
                    1 != /^EPSG:/.test(c) && (c = "EPSG:" + c);
                    var l = utils.projectPoint(i, o, c, "EPSG:4326");
                    i = l[0],
                    o = l[1]
                }
            }
            var g = L.marker([o, i]);
            this.map.addLayer(g),
            s.CENTER || this.map.setView(g.getLatLng(), s.ZOOM || 16, {
                animate: !1
            }),
            p && (this.map.off("popupopen", t).on("popupopen", t),
            g.bindPopup(p).openPopup())
        }
		
		
		if(a.XYM){
			
			
            var s = this.getWebParamsAsObject();
		
			var diainfo ="";
			if(a.DIAINFO){
				
				try{
				diainfo=a.DIAINFO instanceof Array ? a.DIAINFO : a.DIAINFO;
				if(diainfo.length>0){
					if(diainfo instanceof Array){
						diainfo=eval(diainfo.join());
					}else{
						dia_str=eval(diainfo);
						if(dia_str instanceof Array){
							diainfo=dia_str;
						}
					}
				}	
				}catch (e){
				diainfo ="";	
				}
				
			}
			
			
			
             if (a.XYM.length > 2) {
				 var mrLg= L.layerGroup();
				  var invGeoOptions = {
                            stroke: !0,
                            color: "yellow",
                            weight: 4,
                            opacity: .8,
                            fill: !0,
                            fillColor: null ,
                            fillOpacity: .5,
                            clickable: false
                        }
				 this.map.addLayer(mrLg);
				 if(a.XYM.length%2 === 0){
					 var allX=[];
					 var allY=[];
					 var all_sok_pos=[];
					 
					 for (var i=0; i<a.XYM.length;i++){
						 if(i%2===1){
							allX.push(a.XYM[i]); 
						 }else{
							allY.push(a.XYM[i]); 
						 }
						 
						 
						 
					 }
					 
					 for(var j=0;j<allX.length;j++){
					 o = parseFloat(allX[j])
                         , 
                     i = parseFloat(allY[j])
                       , 
                     p = null ; 
					 
			        if (Math.abs(o) > 180 || Math.abs(i) > 180) {
                    
                    var coor_4326 = utils.projectPoint(i, o, "EPSG:3008", "EPSG:4326");
                    i = coor_4326[0];
                    o = coor_4326[1];
                    
                    }
					 
					 var sok_pos = L.latLng(o, i);
					 all_sok_pos.push(sok_pos);
					 var g= L.marker(sok_pos, {
                             iconOptions: L.icon(L.Control.Search.prototype.options.iconOptions)
                         })
						 g.addTo(mrLg);
						 
						 						

                         var hideSearchDeleteButton=window.getQueryParameters('hideSDeleteButton');
						 if(diainfo instanceof Array){
						 try{							 							 
							 if(hideSearchDeleteButton.length>0){
							 if(hideSearchDeleteButton==="true"){
							 
                               g.bindPopup('<p class="lead">'+decodeURIComponent(diainfo[j][0])+'</p><div><button markar_id='+g._leaflet_id+' style="display:none;" id="smap-search-popupbtn-xym" class="btn btn-default btn-sm">Ta bort</button></div>');							 
							 }else{
							 
                               g.bindPopup('<p class="lead">'+decodeURIComponent(diainfo[j][0])+'</p><div><button markar_id='+g._leaflet_id+' id="smap-search-popupbtn-xym" class="btn btn-default btn-sm">Ta bort</button></div>');							 
							 } 
							 }else{
							 
							 g.bindPopup('<p class="lead">'+decodeURIComponent(diainfo[j][0])+'</p><div><button markar_id='+g._leaflet_id+' id="smap-search-popupbtn-xym" class="btn btn-default btn-sm">Ta bort</button></div>');
							 }
                             
                            							 
							  	 
						}catch (e) {
								 
							 if(hideSearchDeleteButton.length>0){
							 if(hideSearchDeleteButton==="true"){
							 g.bindPopup('</br><div><button markar_id='+g._leaflet_id+' style="display:none;" id="smap-search-popupbtn-xym" class="btn btn-default btn-sm">Ta bort</button></div>');							 
							 }else{
							 g.bindPopup('<div><button markar_id='+g._leaflet_id+' id="smap-search-popupbtn-xym" class="btn btn-default btn-sm">Ta bort</button></div>');	 
							 } 
							 }else{
							 g.bindPopup('<div><button markar_id='+g._leaflet_id+' id="smap-search-popupbtn-xym" class="btn btn-default btn-sm">Ta bort</button></div>');	 
							 }
							 
							 }
							 
						   
						 }
						 
					 }
					 
					 function del() {
                         $("#smap-search-popupbtn-xym").off("click").on("click", function() {
					       var that_marker=eval(this.getAttribute('markar_id'));
                           return mrLg.removeLayer(mrLg._layers[that_marker]),
                           g = null ,
                           !1
                           })
						   
					    if($(".lead")){
						if($(".lead").length>0){
						$(".lead")[0].style.width = ($(".leaflet-popup-content").width() - $(".leaflet-popup-close-button").width()) +"px";	
						}
					    }
						  
                    }
				this.map.off("popupopen", del);
                this.map.on("popupopen", del);
									 			     
				 $.proxy(window.setTimeout(function() {smap.map.fitBounds(L.latLngBounds(all_sok_pos))}, 200), all_sok_pos); 
					 
				 }else{
					 alert('Fel webbadress');
				 }
				 
				 
				 
			 }else{
			o = parseFloat(a.XYM[1])
              , 
            i = parseFloat(a.XYM[0])
              , 
            p = null ;
 
            if (Math.abs(o) > 180 || Math.abs(i) > 180) {
                    
             var coor_4326 = utils.projectPoint(i, o, "EPSG:3008", "EPSG:4326");
             i = coor_4326[0];
             o = coor_4326[1];
             
             }
					
            var g = L.marker([o, i]);
            this.map.addLayer(g),
            s.CENTER || this.map.setView(g.getLatLng(), s.ZOOM || 16, {
                animate: !1
            });
			
			function del1() {
               $("#smap-search-popupbtn-xym").off("click").on("click", function() {			   
               smap.map.removeLayer(g),
               g = null ,
               !1
               })
			   
			   if($(".lead")){
			   if($(".lead").length>0){
			   $(".lead")[0].style.width = ($(".leaflet-popup-content").width() - $(".leaflet-popup-close-button").width()) +"px";	
			   }
			   }	
			   
              }
			  
			  try{
			  
			  var hideSearchDeleteButton=window.getQueryParameters('hideSDeleteButton');
			  if(hideSearchDeleteButton.length>0){
			  if(hideSearchDeleteButton==="true"){
			  
                p = '<p class="lead">'+decodeURIComponent(diainfo[0][0])+'</p><div><button markar_id='+g._leaflet_id+' style="display:none;" id="smap-search-popupbtn-xym" class="btn btn-default btn-sm">Ta bort</button></div>';			  
			  }else{
			  
                p = '<p class="lead">'+decodeURIComponent(diainfo[0][0])+'</p><div><button markar_id='+g._leaflet_id+' id="smap-search-popupbtn-xym" class="btn btn-default btn-sm">Ta bort</button></div>';			  
			  } 
			  }else{
			  
                p = '<p class="lead">'+decodeURIComponent(diainfo[0][0])+'</p><div><button markar_id='+g._leaflet_id+' id="smap-search-popupbtn-xym" class="btn btn-default btn-sm">Ta bort</button></div>';			  
			  }  
				  
			  }catch (e) {
				  p = '<div><button markar_id='+g._leaflet_id+' id="smap-search-popupbtn-xym" class="btn btn-default btn-sm">Ta bort</button></div>';	 
			  }

			  
			
            p && (this.map.off("popupopen", del1).on("popupopen", del1),
			
            
            g.bindPopup(p).openPopup());
			
			window.xym_single_marker = g;
            window.setTimeout(function() {
            window.xym_single_marker.closePopup();
            window.xym_single_marker.openPopup();
			var hideSearchInfo=window.getQueryParameters('hideSearchInfo');
			if(hideSearchInfo.length>0){
						if(hideSearchInfo==="true"){
						window.xym_single_marker.closePopup();
                        var url_p= smap.core.Param.prototype.getWebParamsAsObject();smap.map.setView(window.xym_single_marker.getLatLng(), url_p.ZOOM || 16, {animate: !1});                     					  
			}
			}
            }, 300);
			
			
			 }  

        
			
		}
		
		
        smap.event.trigger("smap.core.applyparams", a)
    },
    CLASS_NAME: "smap.core.Param"
});
smap.core.PluginHandler = L.Class.extend({
    initialize: function(t) {
        this.map = t;
        var n = this;
        smap.event.on("smap.core.pluginsadded", function() {
            n._processQueue()
        })
    },
    getPlugin: function() {
        for (var t, n = smap.core.controls || [], e = 0, i = n.length; i > e; e++)
            if (t = n[e],
            t instanceof L.Control[controlName])
                return t;
        return null 
    },
    addPlugins: function(arr) {
        var t, init, autoActivates = [];
        smap.core.controls = smap.core.controls || [];
        for (var i = 0, len = arr.length; len > i; i++)
            t = arr[i],
            init = eval(t.init),
            init && (init = new init(t.options || {}),
            this.map.addControl(init),
            smap.core.controls.push(init),
            init.options.autoActivate && autoActivates.push(init));
        smap.event.trigger("smap.core.pluginsadded"),
        smap.event.pluginsadded = !0;
        for (var i = 0, len = autoActivates.length; len > i; i++)
            autoActivates[i].activate();
        $(".leaflet-bottom.leaflet-right button").tooltip({
            placement: "left",
            container: "#mapdiv"
        })
    },
    _callQueue: [],
    callPlugin: function(t, n, e, i) {
        e = e || [];
        var a = L.Control[t];
        smap.event.pluginsadded ? this._callPlugin(a, n, e, i) : this._callQueue.push([a, n, e, i])
    },
    _callPlugin: function(t, n, e, i) {
        if (!t)
            return null ;
        for (var a, l = smap.core.controls || [], o = null , r = 0, s = l.length; s > r; r++)
            if (a = l[r],
            a instanceof t) {
                o = a[n].apply(a, e || []);
                break
            }
        return i ? i(o) : o
    },
    _processQueue: function() {
        var t, n, e, i = this._callQueue || [];
        for (n = 0,
        len = i.length; n < len; n++)
            t = i[n],
            e = this._callPlugin.apply(this, t);
        return this._callQueue = [],
        e
    },
    CLASS_NAME: "smap.core.PluginHandler"
});
smap.core.Select = L.Class.extend({
    options: {
        manyUseDialog: !0
    },
    _selectedFeaturesVector: [],
    _selectedFeaturesWms: [],
    initialize: function(e) {
        this.map = e,
        this._bindEvents(e),
        this._wfsLayers = smap.core.layerInst._wfsLayers
    },
    _getVectorVal: function(e, t) {
        var r, e = e || {};
        if (paramVal = null ,
        t.split(";").length > 1) {
            var a = t.split(";");
            r = e[a[0]] + ";" + e[a[1]]
        } else
            r = e[t];
        return r
    },
    _setSelectStyle: function(e) {
        var t = e.target;
        t.setStyle && t.setStyle(this.options.selectStyle),
        !t.bringToFront || L.Browser.ie || L.Browser.opera || t.bringToFront()
    },
    _resetStyle: function(e) {
        e.resetStyle && e.eachLayer(function(t) {
            e.resetStyle(t)
        })
    },
    _processHtml: function(e) {
        var t = $("<div>" + e + "</div>");
        
        
        return t.find("a").each(function() {
            
            var e = $(this)
              , 
            t = e.attr("href")
              , 
            r = e.text();
            if (t && t.length >= 4 && -1 === $.inArray(t, ["null", "undefined"])) {
                /*Mohammad Change*/
                /*"HTTP" !== t.substring(0, 4).toUpperCase() && (t = "http://" + t);
                var a = $('<button class="btn btn-default btn-sm">' + r + "</button>");
                a.attr("onclick", 'window.open("' + t + '", "_blank")'),
                e.after(a)*/
                if (typeof t.match('mailto') !== "undefined" && t.match('mailto') !== null ) {
                    if (t.match('mailto').indexOf('mailto') >= 0) {
                        
                        if (window.customMailOpen) {} else {
                            window.customMailOpen = function(t) {
                                var a_t = document.createElement('a');
                                a_t.href = t,
                                a_t.click();
                            }
                        }
                        "HTTP" !== t.substring(0, 4).toUpperCase() && (t = t);
                        var a = $('<button class="btn btn-default btn-sm">' + r + "</button>");
                        a.attr("onclick", 'window.customMailOpen("' + t + '");'),
                        e.after(a),
                        e.remove()
                    
                    
                    
                    } else {
                        "HTTP" !== t.substring(0, 4).toUpperCase() && (t = "http://" + t);
                        var a = $('<button class="btn btn-default btn-sm">' + r + "</button>");
                        a.attr("onclick", 'window.open("' + t + '", "_blank")'),
                        e.after(a),
                        e.remove()
                    }
                } else {
                    "HTTP" !== t.substring(0, 4).toUpperCase() && (t = "http://" + t);
                    var a = $('<button class="btn btn-default btn-sm">' + r + "</button>");
                    a.attr("onclick", 'window.open("' + t + '", "_blank")'),
                    e.after(a),
                    e.remove()
                }
                
                /*Mohammad Change*/
            
            } else {
                
                e.remove()
            }
        
        }
        
        
        
        ),
        t.html()
    },
    _extractAllAttributes: function(e, t) {
        t = t || {};
        var r = ""
          , 
        a = "<div><strong>_key_:</strong>&nbsp;<span>_val_</span></div>";
        for (var s in t)
            r += a.replace(/_key_/g, s).replace(/_val_/g, "${" + s + "}");
        var o = "*";
        return e.search(/\$\{\*\}/) > -1 && (o = /\$\{\*\}/g),
        e.replace(o, r)
    },
    _bindEvents: function(e) {
        function t() {
            var t = $(".leaflet-popup-close-button")
              , 
            r = '<a class="leaflet-popup-close-button leaflet-popup-minimize-button" href="#">–</a>';
            t.before(r),
            $(".leaflet-popup-minimize-button").on("click", function() {
                return smap.map.closePopup(),
                !1
            }),
            t.on("click", function() {
                return e.fire("unselected", {}),
                !1
            })
        }
        var r = this;
        e.on("popupopen", t),
        e.on("layerremove", function(t) {
            var a = void 0 !== t.layer._tip;
            return a ? !1 : void (r._rasterFeature && (e.removeLayer(r._rasterFeature),
            r._rasterFeature = null ))
        }),
        e.on("click", function() {
            for (var t = r._wfsLayers, a = 0, s = t.length; s > a; a++)
                r._resetStyle(t[a]);
            e.fire("unselected", {})
        }),
        e.on("unselected", function(e) {
            r._rasterFeature && (r.map.removeLayer(r._rasterFeature),
            r._rasterFeature = null ),
            e.feature ? $.each(r._selectedFeaturesVector, function(t, a) {
                return e.feature.id === a.id ? (r._selectedFeaturesVector.splice(t, 1),
                !1) : void 0
            }) : (r._selectedFeaturesVector = [],
            r._selectedFeaturesWms = [])
        }),
        e.on("selected", function(t) {
            function a(e, t, r) {
                var a = ""
                  , 
                s = "";
                /*return s += '<div class="' + a + '"><h4 class="popup-layertitle">' + r + "</h4>",*/
                /*Mohammad Change: Number: 3*/
                return s += '<div style="width:inherit;" class="' + a + '"><h4 class="popup-layertitle">' + r + "</h4>",
                /*Mohammad Change*/
                s += utils.extractToHtml(e, t) + "</div>"
            }
            
            function s() {
                r._rasterFeature && (r._rasterFeature.resetStyle(),
                r.map.removeLayer(r._rasterFeature),
                r._rasterFeature = null )
            }
            
            function o(e) {
                return s(),
                e.geometry.type && "Point" !== e.geometry.type && "MultiPoint" !== e.geometry.type && (r._rasterFeature = L.geoJson(e.geometry),
                r._rasterFeature.options = $.extend({}, e.options),
                r._rasterFeature.options._silent = !0,
                r._rasterFeature.latLng = e.latLng,
                r._rasterFeature.setStyle({
                    color: "#0FF",
                    fillColor: "#0FF",
                    weight: 10,
                    opacity: .9,
                    fillOpacity: .3
                }),
                r._rasterFeature.options.selectable = !1,
                r._rasterFeature.eachLayer(function(e) {
                    e.eachLayer && e.eachLayer(function(e) {
                        e.options.clickable = !1
                    }),
                    e.options && (e.options.clickable = !1)
                }),
                r.map.addLayer(r._rasterFeature),
                r._rasterFeature.setZIndex(900)),
                r._rasterFeature
            }
            
            function n() {
                var e = $(this).data("index")
                  , 
                t = r._selectedFeaturesWms[e];
                o(t);
                var s = L.popup()
                  , 
                n = a(t.options.popup, t.properties, t.options.displayName);
                if (n = r._processHtml(n),
                s.setContent(n),
                r._rasterFeature && r._rasterFeature.getBounds && 1 === t.geometry.coordinates.length) {
                    var i = r._rasterFeature.getBounds()
                      , 
                    l = i.getCenter();
                    s.setLatLng(l)
                } else
                    s.setLatLng(t.latLng);
                s.openOn(r.map);
                var u = $(".leaflet-popup-content:visible");
                return u.find("img").each(function() {
                    utils.addImageLoadIndicator($(this), {
                        height: "100px"
                    })
                }),
                $(this).trigger("mouseenter"),
                r._selectManyModal.modal("hide"),
                !1
            }
            var i = t.layer
              , 
            l = i.hasOwnProperty("_layers") || i.options && i.options.clickable
              , 
            u = (i.options.layerId,
            t.feature)
              , 
            p = t.selectedFeatures || []
              , 
            c = (i.options.uniqueKey || "-",
            t.shiftKeyWasPressed)
              , 
            d = u.properties
              , 
            f = t.latLng;
            if (l ? (r._selectedFeaturesWms = [],
            c ? (r._selectedFeaturesVector = utils.makeUniqueArr(r._selectedFeaturesVector.concat(p)),
            $.each(r._wfsLayers, function(e, t) {
                t.eachLayer(function(e) {
                    e.unbindPopup && e.unbindPopup(),
                    e._layers && $.each(e._layers, function(e, t) {
                        t.unbindPopup && t.unbindPopup()
                    })
                })
            })) : r._selectedFeaturesVector = [].concat(p)) : (r._selectedFeaturesVector = [],
            r._selectedFeaturesWms = utils.makeUniqueArr(r._selectedFeaturesWms.concat(p))),
            l && !c && r._selectedFeaturesVector.length <= 1) {
                for (var m, _ = r._wfsLayers, y = 0, g = _.length; g > y; y++)
                    m = _[y],
                    m !== i && (m.resetStyle && m.resetStyle(m),
                    m._selectedFeatures = []);
                var h = i.options.popup;
                (i.options.popup && "*" === i.options.popup || i.options.popup.search(/\$\{\*\}/) > -1) && (h = r._extractAllAttributes(h, d));
                var v = utils.extractToHtml(h, d);
                v = r._processHtml(v);
                var m = utils.getLayerFromFeature(u, i) || u;
                if (m._popup && m.unbindPopup(),
                m.bindPopup(v, {
                    autoPan: !0,
                    keepInView: !1,
                    autoPanPadding: L.point(smap.core.mainConfig.smapOptions.popupAutoPanPadding)
                }),
                m._map) {
                    m.openPopup(f);
                    var F = $(".leaflet-popup-content:visible");
                    F.find("img").each(function() {
                        
                        utils.addImageLoadIndicator($(this), {
                            height: "100px"
                        })
                    
                    
                    
                    
                    })
                }
            }
            if (!l) {
                var b = L.popup()
                  , 
                M = r._selectedFeaturesWms[0];
                if (1 === r._selectedFeaturesWms.length)
                    o(M);
                else {
                    if (r.options.manyUseDialog) {
                        if (!r._selectManyModal) {
                            var d, k, S = $('<button type="button" class="btn btn-default">Stäng</button>'), 
                            w = $('<div class="list-group"></div>');
                            S.on("tap click", function() {
                                return s(),
                                r._selectManyModal.modal("hide"),
                                !1
                            }),
                            r._selectManyModal = utils.drawDialog("Flera träffar: Välj ett objekt", w, S, {
                                size: "sm"
                            }),
                            r._selectManyModal.find(".modal-header").addClass("panel-heading"),
                            r._selectManyModal.on("hidden.bs.modal", function() {
                                $(this).find(".list-group").empty()
                            }),
                            r._selectManyModal.on("shown.bs.modal", function() {
                                $(this).scrollTop(0)
                            }),
                            r._selectManyModal.addClass("core-select-modal")
                        }
                        for (var x, P, V = r._selectManyModal.find(".list-group"), y = 0, g = p.length; g > y; y++)
                            x = p[y],
                            d = x.properties,
                            P = utils.extractToHtml(x.options.popup, d),
                            (P && "*" === P || P.search(/\$\{\*\}/) > -1) && (P = r._extractAllAttributes(P, d)),
                            P = r._processHtml(P),
                            /*Mohammad Change*/
                            /*k = $('<a href="#" class="list-group-item"><span><strong>' + x.options.displayName + "</strong>" + P + '</span><div class="btn btn-success select-btn-zoom-to-feature">Zooma hit</div></a>'),*/
                            k = $('<a href="#" class="list-group-item"><span><strong style="display:none;">' + x.options.displayName + "</strong>" + P + '</span><div class="btn btn-success select-btn-zoom-to-feature">Zooma hit</div></a>'),
                            /*Mohammad Change*/
                            k.data("index", y),
                            L.Browser.touch && k.addClass("select-row-touch"),
                            V.append(k);
                        var I = V.find(".list-group-item");
                        return I.find(".select-btn-zoom-to-feature").on("touchend click", function() {
                            if (n.call($(this).parent()[0]),
                            r._rasterFeature) {
                                var e = r._rasterFeature.getBounds()
                                  , 
                                t = L.Browser.touch ? [100, 100] : [200, 150];
                                r.map.fitBounds(e, {
                                    paddingTopLeft: t,
                                    paddingBottomRight: [100, 100]
                                })
                            
                            } else {
                                /*Mohammad Add*/
                                /*L.Browser.touch?smap.map._popup._container.style.display="block":smap.map._popup._container.style.display="block";*/
                                /*Mohammad Add*/
                                var a = ($(this).parent().data("index"),
                                15);
                                a = r.map.getZoom() < a ? a : r.map.getZoom() + 1,
                                r.map.setZoomAround(M.latLng, a)
                            }
                            /*Mohammad Add*/
                            /*if (typeof smap.map._popup !== "undefined" && smap.map._popup !== null ) {
                            L.Browser.touch?window.setTimeout(function(){
								if (typeof smap.map._popup !== "undefined" && smap.map._popup !== null ) {
									$('.mapdiv').width('50%');
									$('.mapdiv').width('100%');
									smap.map._popup._container.style.display="block";
								smap.map._popup.update();
								smap.map.panBy([100,100]);
								smap.map.panBy([-100,-100]);
								}
								
								},1500):window.setTimeout(function(){
								if (typeof smap.map._popup !== "undefined" && smap.map._popup !== null ) {
									
								smap.map._popup.update();
								}
								
								},1000)
                            }*/
                            /*Mohammad Add*/
                            return r._selectManyModal.modal("hide"),
                            !1
                        
                        }),
                        L.Browser.touch ? I.on("tap", function() {
                            var e = $(this).data("index")
                              , 
                            t = r._selectedFeaturesWms[e];
                            return o(t),
                            n.call(this),
                            !1
                        }) : I.on("click", n),
                        r._selectManyModal.modal("show"),
                        !0
                    }
                    for (var W, A = r._selectedFeaturesWms || [], y = 0, g = A.length; g > y; y++)
                        if (M = A[y],
                        M.geometry && M.geometry.type && M.geometry.type.search(/point/gi) > -1) {
                            W = M;
                            break
                        }
                    if (!W) {
                        var C = parseInt(r._selectedFeaturesWms.length / 2);
                        W = r._selectedFeaturesWms[C]
                    }
                    o(W),
                    M = W
                }
                var v = ""
                  , 
                d = M.properties
                  , 
                h = M.options.popup;
                (h && "*" === h || h.search(/\$\{\*\}/) > -1) && (h = r._extractAllAttributes(h, d)),
                v = a(h, M.properties, M.options.displayName),
                v = r._processHtml(v),
                e.closePopup(),
                b.setContent(v),
                b.setLatLng(M.latLng),
                setTimeout(function() {
                    var t = smap.cmd.getControl("SelectWMS");
                    if (t && t._dblclickWasRegistered === !0)
                        return !1;
                    b.openOn(e);
                    var r = $(".leaflet-popup-content:visible");
                    r.find("img").each(function() {
                        utils.addImageLoadIndicator($(this), {
                            height: "100px"
                        })
                    })
                }, 100)
            }
        }),
        smap.event.on("smap.core.createparams", function(e, t) {
            function a(e, t, r) {
                e && (i[e] || (i[e] = {}),
                i[e][t] || (i[e][t] = []),
                i[e][t].push(r))
            }
            var s, o, n, i = {};
            if (r._selectedFeaturesVector && r._selectedFeaturesVector.length) {
                n = r._selectedFeaturesVector;
                for (var l = 0, u = n.length; u > l; l++)
                    s = n[l],
                    s.properties && s.uniqueKey && (o = r._getVectorVal(s.properties, s.uniqueKey),
                    a(s.layerId, "vals", o),
                    i[s.layerId].key = s.uniqueKey)
            }
            if (r._selectedFeaturesWms && r._selectedFeaturesWms.length) {
                n = r._selectedFeaturesWms;
                for (var l = 0, u = n.length; u > l; l++)
                    s = n[l],
                    o = [s.latLng.lng, s.latLng.lat],
                    a(s.options.layerId, "xy", o)
            }
            $.isEmptyObject(i) === !1 && (t.sel = encodeURIComponent(JSON.stringify(i)))
        }),
        smap.event.on("smap.core.applyparams", $.proxy(function(e, t) {
            function r() {
                var e, t, s, o, l, u, p = this, 
                c = this.options.layerId, 
                d = this.options.uniqueKey, 
                f = n[c], 
                m = f.vals;
                for (s = 0,
                len = m.length; s < len; s++)
                    t = m[s],
                    e = null ,
                    $.each(p._layers, function(r, a) {
                        if (a.feature) {
                            if (o = a.feature.properties,
                            d.split(";").length > 1 ? (l = d.split(";"),
                            u = o[l[0]] + ";" + o[l[1]]) : u = a.feature.properties[d],
                            !u)
                                return !1;
                            if (u === t)
                                return e = a,
                                !1
                        }
                    }),
                    e && e.fire("click", {
                        properties: e.feature.properties,
                        latlng: a,
                        originalEvent: {
                            shiftKey: i
                        }
                    });
                p.off("load", r)
            }
            if (t.SEL) {
                var a, s, o, n = JSON.parse(decodeURIComponent(t.SEL)), 
                i = !1, 
                l = 0;
                for (var u in n)
                    if (l += 1,
                    l > 1 || n[u].vals && n[u].vals.length > 1) {
                        i = !0;
                        break
                    }
                for (o in n)
                    if (s = n[o],
                    s.key) {
                        var p = smap.core.layerInst.showLayer(o);
                        p && p.on("load", r)
                    }
            }
        }))
    }
});
smap.cmd = {
    createParams: function(e) {
        return smap.core.paramInst.createParams(e)
    },
    createParamsAsObject: function() {
        return smap.core.paramInst.createParamsAsObject()
    },
    removeAllMapLayer: function() {
        smap.map.eachLayer(function(t) {
            typeof t.options !== "undefined" && t.options !== null  ? typeof t.options.isBaseLayer !== "undefined" && t.options.isBaseLayer !== null  ? t.options.isBaseLayer === false ? smap.map.removeLayer(t) : "" : "" : ""
        }, this)
    },
    //20180306
	showAllMapLayerLegendTogether: function() {
	   smap.cmd.allActiveLayersLegend = [];smap.cmd.allActiveLayersLegendWithDisplayName = [];smap.map.eachLayer(function(t) {if (typeof t.options !== "undefined" && t.options !== null) {if (typeof t.options.isBaseLayer !== "undefined" && t.options.isBaseLayer !== null) {if (t.options.isBaseLayer === false) {smap.cmd.allActiveLayersLegend.push(t.options.printLegend);smap.cmd.allActiveLayersLegendWithDisplayName.push(t.options.displayName +'legend_saperator'+t.options.printLegend);}}}}, this)
    },
	//20180306
    getControl: function(e) {
        var t = this.getControls(e);
        return t.length ? t[0] : null 
    },
    getControls: function(e) {
        e.search(/\./) > -1 && (e = e.split(".").slice(2).join("."));
        for (var t, n = smap.core.controls || [], a = [], r = 0, i = n.length; i > r; r++)
            t = n[r],
            t instanceof L.Control[e] && a.push(t);
        return a
    },
    notify: function(e, t, n) {
        switch (n = n || {},
        n.parent = n.parent || $("body"),
        t) {
        case "success":
            t = "alert-success";
            break;
        case "warning":
            t = "alert-danger";
            break;
        case "info":
            t = "alert-info";
            break;
        case "error":
            t = "alert-danger";
            break;
        default:
            t = "alert-" + t
        }
        var a = $('<div class="alert map-alert ' + t + ' alert-dismissable"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + e + "</div>");
        return n.parent.find(".alert").remove(),
        n.parent.append(a),
        n.fade && (a.addClass("notify-transition"),
        setTimeout(function() {
            a.addClass("notify-visible")
        }, 1)),
        this._notifyTimeOut && clearTimeout(this._notifyTimeOut),
        n.fadeOut && (this._notifyTimeOut = setTimeout(function() {
            $(".alert").remove()
        }, n.fadeOut || 7e3)),
        a
    },
    showLayer: function(e) {
        return smap.core.layerInst.showLayer(e)
    },
    hideLayer: function(e) {
        return smap.core.layerInst.hideLayer(e)
    },
    addLayerWithConfig: function(e) {
        return smap.core.layerInst._addLayerWithConfig(e)
    },
    getLayer: function(e) {
        return smap.core.layerInst._getLayer(e)
    },
    getLayerConfig: function(e) {
        return this.getLayerConfigBy("layerId", e)
    },
    getLayerConfigBy: function(key, val, options) {
        options = options || {};
        var arr = smap.config.bl.concat(smap.config.ol || []), 
        i, t, compVal;
        for (i = 0,
        len = arr.length; i < len; i++) {
            if (t = arr[i],
            -1 !== key.search(/\./))
                try {
                    compVal = eval("t." + key)
                } catch (e) {
                    continue
                }
            else
                compVal = t.options[key];
            if (options.inText) {
                if (void 0 !== compVal && compVal.search(val) > -1)
                    return t
            } else if (void 0 !== compVal && compVal === val)
                return t
        }
        return null 
    },
    getLang: function() {
        var e = smap.core.mainConfig.smapOptions.defaultLanguage || "en"
          , 
        t = smap.core.paramInst ? smap.core.paramInst.getParams().LANG : e
          , 
        n = t ? t.split("-")[0] : e;
        return n
    },
    reloadCore: function(e) {
        e = e || {},
        smap.core.initInst.resetMap(),
        smap.core.initInst.init(e)
    },
    loading: function(e, t) {
        if (t = t || {},
        !window.Spinner)
            return !1;
        var n = {
            sv: {
                loading: "Laddar"
            },
            en: {
                loading: "Loading"
            }
        }
          , 
        a = this.getLang()
          , 
        r = n.hasOwnProperty(a) ? n[a] : n.en
          , 
        i = t.text;
        if (i instanceof Object && (i = i[r]),
        e && e === !0) {
            if (!this.spinner) {
                var s = {
                    lines: 12,
                    length: 4,
                    width: 6,
                    radius: 40
                };
                this.spinner = new Spinner(s).spin()
            }
            this.spinner.spin(),
            $("#mapdiv").append(this.spinner.el),
            $("div .spinner").css({
                top: "50%",
                left: "50%"
            }),
            $(this.spinner.el).append('<div id="loadingText">' + (i || r.loading) + "</div>")
        } else
            this.spinner.stop()
    },
    mergeLayers: function() {
        smap.cmd.mergeLayers.mergeLayers = {},
        smap.cmd.mergeLayers.tmp_memove_lg_list = [],
        smap.map.on("layeradd", function(e) {
            if (e.layer && e.layer.options && e.layer.options.mergeLayers && e.layer.options.mergeLayers.length > 0)
                for (var r = 0; r < e.layer.options.mergeLayers.length; r++) {
                    if ("object" == typeof e.layer.options.mergeLayers[r])
                        var a = JSON.parse(JSON.stringify(e.layer.options.mergeLayers[r]));
                    else if ("string" == typeof e.layer.options.mergeLayers[r])
                        var a = JSON.parse(JSON.stringify(smap.cmd.getLayerConfig(e.layer.options.mergeLayers[r])));
                    if ("undefined" != typeof a && null  !== a) {
                        a.options.isBaseLayer = !0,
                        a.options.isMultipleBaseLayer = !0,
                        a.options.layerId = a.options.layerId + "_mergedLayer_" + e.layer.options.layerId;
                        var m = smap.core.layerInst._createLayer(a);
                        "undefined" != typeof m && null  !== m && (smap.cmd.mergeLayers.mergeLayers[a.options.layerId] = m,
                        smap.map.addLayer(m))
                    }
                }
        }),
        smap.map.on("layerremove", function(e) {
            if ("undefined" != typeof smap.cmd.mergeLayers.mergeLayers && null  !== smap.cmd.mergeLayers.mergeLayers && e.layer && e.layer.options && e.layer.options.layerId) {
                var r = e.layer.options.layerId;
                for (mglg in smap.cmd.mergeLayers.mergeLayers)
                    mglg.split("_mergedLayer_")[1] === r && (smap.cmd.mergeLayers.tmp_memove_lg_list.push(mglg),
                    smap.map.removeLayer(smap.cmd.mergeLayers.mergeLayers[mglg]));
                for (var a = 0; a < smap.cmd.mergeLayers.tmp_memove_lg_list.length; a++)
                    delete smap.cmd.mergeLayers.mergeLayers[smap.cmd.mergeLayers.tmp_memove_lg_list[a]];
                smap.cmd.mergeLayers.tmp_memove_lg_list = []
            }
        })
    },
    getLayerConfigAlias: function(e) {
        return this.getLayerConfigBy("alias", e)
    },
    getLayerConfigAliasBy: function(key, val, options) {
        options = options || {};
        var arr = smap.config.bl.concat(smap.config.ol || []), 
        i, t, compVal;
        for (i = 0,
        len = arr.length; i < len; i++) {
            if (t = arr[i],
            -1 !== key.search(/\./))
                try {
                    compVal = eval("t." + key)
                } catch (e) {
                    continue
                }
            else
                compVal = t.options[key];
            if (options.inText) {
                if (void 0 !== compVal && compVal.search(val) > -1)
                    return t
            } else if (void 0 !== compVal && compVal === val)
                return t
        }
        return null 
    },
    _xhr_handler: function(method, url) {
        try {
            return new XMLHttpRequest();
        } catch (e) {}
        try {
            return new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {}
        try {
            return new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {}
        alert("XMLHttpRequest not supported");
        return null ;
    },
    createGetFeatureURL: function(gatLayerConfiguration, ql, qa, poi) {
        var typeName = gatLayerConfiguration.options.layers;
        var featureID = poi;
        var init = gatLayerConfiguration.init;
        
        if (init === "L.TileLayer.WMS") {
            featureID = typeName + "." + featureID;
        }
        var url = gatLayerConfiguration.url.split('?')[0] + "?service=WFS&version=1.3.0&request=GetFeature&outputFormat=GeoJSON&typename=" + typeName + "&featureid=" + featureID;
        return url;
    
    },
    
    
    getSingleGeoJSON: function(ql, qa, poi) {
        var gatLayerConfiguration = this.getLayerConfigAlias(ql);
        if (typeof gatLayerConfiguration !== "undefined" && gatLayerConfiguration !== null ) {
            var url = this.createGetFeatureURL(gatLayerConfiguration, ql, qa, poi)
        } else {
            var gatLayerConfiguration = this.getLayerConfig(ql);
            if (typeof gatLayerConfiguration !== "undefined" && gatLayerConfiguration !== null ) {
                var url = this.createGetFeatureURL(gatLayerConfiguration, ql, qa, poi)
            
            } else {
                var url = null ;
            }
        }
        
        if (url !== null ) {
            var xhr = new this._xhr_handler();
            xhr.open("GET", url, false);
            xhr.send(null );
            if (xhr.readyState == 4 && xhr.status == 200) {
                var responseInfoText = JSON.parse(xhr.responseText);
            
            }
            return [responseInfoText, gatLayerConfiguration];
        } else {
            return null ;
        }
    
    
    
    },
    
    getPopHTML: function(e, t, r) {
        var a = ""
          , 
        s = "";
        return s += '<div id="advSokCatDiv" style="width:inherit;" class="' + a + '"><h4 class="popup-layertitle">' + r + "</h4>",
        s += utils.extractToHtml(e, t) + "</div>"
    },
    
    advSearch: function(map) {
        var allQParams = smap.core.paramInst.getParams();
        if (typeof allQParams.QL !== "undefined" && allQParams.QL !== null  && typeof allQParams.QA !== "undefined" && allQParams.QA !== null  && typeof allQParams.POI !== "undefined" && allQParams.POI !== null ) {
            if (allQParams.QL.length > 0 && allQParams.QA.length > 0 && allQParams.POI.length > 0) {
                var singleFeature_lgconf = this.getSingleGeoJSON(allQParams.QL, allQParams.QA, allQParams.POI);
                var singleFeature = singleFeature_lgconf[0];
                var lar_conf = singleFeature_lgconf[1];
                if (singleFeature !== null ) {
                    
                    if (singleFeature.features.length > 0) {
                        
                        if (typeof smap.map.avdSearchLg === "undefined" || smap.map.avdSearchLg === null ) {
                            smap.map.avdSearchLg = L.layerGroup(),
                            window.avdSearchLg = smap.map.avdSearchLg,
                            smap.map.avdSearchLg.id = "avdSearchLg",
                            smap.map.addLayer(smap.map.avdSearchLg);
                        }
                        var shpOptions = {
                            stroke: !0,
                            color: "#00FFFF",
                            weight: 4,
                            opacity: .5,
                            fill: !0,
                            fillColor: null ,
                            fillOpacity: .2,
                            clickable: !0
                        }
                        var _shape_pos = L.latLng(singleFeature.features[0].geometry.coordinates[1], singleFeature.features[0].geometry.coordinates[0]);
                        window.advSolcreateRandomNumber = Math.random().toString().split('.')[1];
                        var _advSearchshape = new L.Circle(_shape_pos,10,shpOptions);
                        _advSearchshape.id = "advSokMarkerId_" + window.advSolcreateRandomNumber;
                        var advSokPopOpt = {
                            keepInView: true
                        }
                        
                        
                        smap.map.setView(_shape_pos, 15, {
                            animate: !1
                        });
                        
                        var deleteSingleMarker_div = document.createElement('div');
                        deleteSingleMarker_div.style.display = "none";
                        var deleteSingleMarker_button = document.createElement('button');
                        deleteSingleMarker_button.id = "smapadvsokpopupbtn_" + window.advSolcreateRandomNumber,
                        deleteSingleMarker_button.className = "btn btn-default btn-sm",
                        deleteSingleMarker_button.value = "Ta bort kartsymbol",
                        deleteSingleMarker_button[getTextContent(deleteSingleMarker_button)] = "Ta bort kartsymbol",
                        
                        deleteSingleMarker_button.onclick = function() {
                            var currentMarker = null ;
                            var catchMarkerId = "advSokMarkerId_" + this.id.split('_')[1];
                            var allMarkerLayers = smap.map.avdSearchLg._layers;
                            if (allMarkerLayers) {
                                for (lay in allMarkerLayers) {
                                    if (allMarkerLayers[lay].id === catchMarkerId) {
                                        currentMarker = allMarkerLayers[lay];
                                    
                                    }
                                
                                }
                            
                            }
                            smap.map.avdSearchLg.removeLayer(currentMarker);
                        }
                        ;
                        
                        deleteSingleMarker_div.appendChild(deleteSingleMarker_button);
                        
                        var getPopContent = smap.core.Select.prototype._processHtml(this.getPopHTML(lar_conf.options.popup, singleFeature.features[0].properties, lar_conf.options.displayName));
                        var tempHTML = document.createElement('html');
                        tempHTML.innerHTML = getPopContent;
                        var temp_body = tempHTML.getElementsByTagName('body')[0];
                        var last_tag = temp_body.childNodes[0].childNodes[temp_body.childNodes[0].childNodes.length - 1];
                        var last_tag_name = last_tag.tagName;
                        if (last_tag_name = "IMG") {
                            temp_body.childNodes[0].insertBefore(deleteSingleMarker_div, last_tag);
                        
                        } else {
                            
                            temp_body.childNodes[0].appendChild(deleteSingleMarker_div);
                        }
                        getPopContent = temp_body.childNodes[0];
                        window.avdSokPopup = L.popup(advSokPopOpt);
                        var popupContent = getPopContent;
                        window.avdSokPopup.setContent(popupContent);
                        window.avdSokPopup.setLatLng(_shape_pos);
                        _advSearchshape.bindPopup(window.avdSokPopup);
                        window.avdSokPopup.openOn(smap.map);
                        _advSearchshape.addTo(smap.map.avdSearchLg);
                        smap.map.on("popupclose", $.proxy(function() {
                            deleteSingleMarker_button.click();
                        
                        }, deleteSingleMarker_button));
                        window.setTimeout(function() {
                            $('.lswitch-btnhide.btn.btn-default')[0].click();
                        }, 500);
                    } else {
                        smap.cmd.notify("Den sökta fråga hittades inte", "error");
                    }
                } else {
                    
                    smap.cmd.notify("Den sökta fråga hittades inte", "error");
                }
            }
        }
    }
    
    /*Mohammad Add:vakant*/




};
smap.core.mainConfig = {
    mapConfig: {
        layers: [],
        crs: L.CRS.EPSG3857,
        attributionControl: !0,
        zoomControl: !1,
        /*maxZoom: 18,*/
        /*Mohammad Change*/
        maxZoom: 12,
        /*Mohammad Change*/
        disabledRightClick: !0
    },
    smapOptions: {
        title: "sMap-responsive",
        favIcon: "https://assets-cdn.github.com/favicon.ico",
        popupAutoPanPadding: [0, 70],
        defaultLanguage: "sv"
    },
    toolbarPlugin: "Menu",
    defaultTheme: "smap",
    configFolders: ["/rest/leaf/configs-1.0/"]
};
var utils = {
    rmPx: function(t) {
        return t && t.replace ? parseInt(t.replace(/px/gi, "").replace(/em/gi, "").replace(/pt/gi, "")) : t
    },
    log: function() {
        window.console
    },
    capitalize: function(t) {
        return t.charAt(0).toUpperCase() + t.slice(1)
    },
    addImageLoadIndicator: function(t, e) {
        e = e || {};
        var r = {
            height: "100px"
        };
        $.extend(r, e);
        var n = $('<div class="img-load-indicator"><i class="fa fa-spinner"></i></div>');
        n.css("height", "100px"),
        t.before(n),
        t.addClass("hidden img-smooth-loading"),
        t.on("load", function() {
            var t = $(this);
            t.prev(".img-load-indicator").remove(),
            t.removeClass("hidden"),
            setTimeout(function() {
                t.addClass("img-fade-in");
                /*Mohammad Add*/
                window.loadedPopup_image_Height = t[0].height;
                window.loadedPopup_image_Width = t[0].width;
                if (typeof smap.map._popup !== "undefined" && smap.map._popup !== null ) {
                    smap.map._popup.update();
                    window.setTimeout(function() {
                        var dy = 0;
                        var search_div_bottom = (function() {
                            var searchDiv = document.getElementById('smap-search-div');
                            if (searchDiv) {
                                return searchDiv.getBoundingClientRect().bottom
                            } else {
                                return 0
                            }
                        })()
                          , 
                        toolbar_bottom = (function() {
                            toolbarDiv = document.getElementById('malmo-masthead');
                            if (toolbarDiv) {
                                return toolbarDiv.getBoundingClientRect().bottom
                            } else {
                                return 0
                            }
                        })()
                          , 
                        startingPoint = 0;
                        
                        if (search_div_bottom > 0) {
                            startingPoint = search_div_bottom
                        } else {
                            startingPoint = toolbar_bottom
                        }
                        var search_plus_toolbar = startingPoint;
                        
                        if (search_plus_toolbar > smap.map._popup._container.getBoundingClientRect().top) {
                            dy = smap.map._popup._container.getBoundingClientRect().top - search_plus_toolbar - 10;
                        
                        } else {
                            dy = dy
                        }
                        ;
                        smap.map.panBy([0, dy]);
                        
                        window.loadedPopup_image_Height = 0;
                        window.loadedPopup_image_Width = 0;
                    
                    }, 500);
                
                
                }
                /*Mohammad Add*/
            }, 200)
        });
        /*Mohammad Add*/
        t.length === 1 ? t[0].naturalHeight > 0 && t[0].naturalWidth > 0 ? "" : t.prev(".img-load-indicator").remove() : "";
        /*Mohammad Add*/
    },
    textInsert: function(t, e) {
        for (var r = 0, n = e.length; n > r; r++)
            t = t.replace("%s", e[r]);
        return t
    },
    getBrowser: function() {
        var t = navigator.userAgent.match(/(?:MSIE |Trident\/.*; rv:)(\d+)/)
          , 
        e = t ? parseInt(t[1]) : void 0;
        return {
            ie: t,
            ieVersion: e,
            ie8: 8 === e,
            ie9: 9 === e,
            ie10: 10 === e,
            ie11: 11 === e
        }
    },
    urlAppend: function(t, e, r) {
        r = r || "?";
        var n = "?" === r ? /\?/g : /#/g
          , 
        a = e.charAt(e.length - 1);
        return "&" === a && (t = a.substring(0, e.length - 1)),
        -1 === t.search(n) && (t += r),
        t + e
    },
    isInIframe: function() {
        return top.location != self.location
    },
    makeUniqueArr: function(t) {
        var e = [];
        return $.each(t, function(t, r) {
            -1 === $.inArray(r, e) && e.push(r)
        }),
        e
    },
    objectToUpperCase: function(t) {
        var e = {};
        for (var r in t)
            e[r.toUpperCase()] = t[r];
        return e
    },
    drawDialog: function(t, e, r, n, ctrl) {
        n = n || {},
        n.size = n.size || "";
        
        /*Mohammad Change*/
        /*var a = $('<div class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + (-1 === t.search(/</g) ? '<h4 class="modal-title">' + t + "</h4>" : t) + '</div><div class="modal-body"></div></div>');*/
        var ctrl = (function() {
            if (typeof ctrl !== "undefined" && ctrl !== null ) {
                return ctrl
            } else {
                return "ctrlNotDefined"
            }
        })();
        var modalDialogCloseID = "modalDialogCloseID_" + ctrl;
        var modalDialogMinimizeID = "modalDialogMinimizeID_" + ctrl;
        var a = $('<div class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" id="' + modalDialogCloseID + '" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><button type="button" class="minimize" id="' + modalDialogMinimizeID + '" minimize_ctrl=' + ctrl + '  aria-hidden="true">-</button>' + (-1 === t.search(/</g) ? '<h4 class="modal-title">' + t + "</h4>" : t) + '</div><div class="modal-body"></div></div>');
        
        /*Mohammad Change        */
        if (a.find(".modal-body").append(e),
        r) {
            var i = $('<div class="modal-footer"></div>');
            a.find(".modal-body").after(i),
            i.append(r)
        }
        
        /*Mohammad Add*/
        var click_tap = L.Browser.touch ? "tap" : "click";
        a.find("#" + modalDialogMinimizeID).on(click_tap, function() {
            if (this[window.getTextContent(this)] === "-") {
                this[window.getTextContent(this)] = "+";
                $('.modal-body').toggle();
                $('.modal-footer').toggle();
                if (typeof this.getAttribute('minimize_ctrl') !== "undefined" && this.getAttribute('minimize_ctrl') !== null ) {
                    if (this.getAttribute('minimize_ctrl') === "LControlPrint") {
                        $('.modal').height($('.modal-dialog')[0].getBoundingClientRect().bottom);
                        $('.modal-backdrop')[0].style.display = "none";
                    }
                }
            
            } else if (this[window.getTextContent(this)] === "+") {
                this[window.getTextContent(this)] = "-";
                $('.modal-body').toggle();
                $('.modal-footer').toggle();
                if (typeof this.getAttribute('minimize_ctrl') !== "undefined" && this.getAttribute('minimize_ctrl') !== null ) {
                    if (this.getAttribute('minimize_ctrl') === "LControlPrint") {
                        $('.modal').height(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
                        $('.modal-backdrop')[0].style.display = "block";
                    }
                }
            }
        
        });
        
        
        
        a.on("hide.bs.modal", function() {
            if ($(this).find(".minimize")[0][window.getTextContent($(this).find(".minimize")[0])] === "+") {
                $(this).find(".minimize")[0][window.getTextContent($(this).find(".minimize")[0])] = "-";
                $('.modal-body').toggle();
                $('.modal-footer').toggle();
                
                if (typeof $(this).find(".minimize")[0].getAttribute('minimize_ctrl') !== "undefined" && $(this).find(".minimize")[0].getAttribute('minimize_ctrl') !== null ) {
                    if ($(this).find(".minimize")[0].getAttribute('minimize_ctrl') === "LControlPrint") {
                        $('.modal').height(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
                        $('.modal-backdrop')[0].style.display = "block";
                    }
                }
            }
        
        
        });
        /*Mohammad add*/
        
        return n.size && a.find(".modal-dialog").addClass("modal-" + n.size),
        a
    },
    getLayerFromFeature: function(t, e) {
        var r = e._layers;
        for (var n in r) {
            var a = r[n];
            if (a.feature && a.feature.id === t.id)
                return a
        }
        return null 
    },
    round: function(t, e) {
        var r = Math.pow(10, e || 0);
        return Math.round(t * r) / r
    },
    makeUnselectable: function(t) {
        t.attr("unselectable", "unselectable").addClass("unselectable")
    },
    extractToHtml: function(html, props) {
        function getFunctionEnd(t) {
            var e = 1
              , 
            r = !1
              , 
            n = t.search(/\{/g);
            t = t.substring(n + 1);
            var a = 0;
            for (a = 0,
            len = t.length; a < len; a++)
                if ("{" === t.charAt(a) ? e += 1 : "}" === t.charAt(a) && (e -= 1),
                0 === e) {
                    r = !0,
                    a = a + n + 2;
                    break
                }
            return r || (a = -1),
            a
        }
        
        function extractAttribute(a, txt) {
            var index = txt.search(/\${/g);
            if (-1 !== index) {
                var extractedAttribute = ""
                  , 
                attr = html.substring(index + 2)
                  , 
                endIndex = 0;
                if (endIndex = "function" === attr.substring(0, 8) ? getFunctionEnd(attr) : attr.search(/\}/g),
                attr = attr.substring(0, endIndex),
                "function" === attr.substring(0, 8)) {
                    var theFunc = attr.replace("function", "function f");
                    eval(theFunc),
                    extractedAttribute = f.call(this, a)
                } else {
                    var paramsArr = attr.split(",");
                    if (paramsArr.length > 1) {
                        var firstParam = $.trim(paramsArr[0])
                          , 
                        secondParam = $.trim(paramsArr[1]);
                        if (extractedAttribute = a[firstParam] || "",
                        secondParam && 1 === parseInt(secondParam))
                            try {
                                extractedAttribute = decodeURIComponent(extractedAttribute)
                            } catch (e) {}
                    } else
                        extractedAttribute = a[attr] || ""
                }
                txt = txt.replace("${" + attr + "}", extractedAttribute)
            }
            return txt
        }
        if (!props)
            return "";
        if ("undefined" == typeof html)
            return html = null ;
        for (var index = html.search(/\${/g); -1 !== index; )
            html = extractAttribute(props, html),
            index = html.search(/\${/g);
        return html
    },
    createLabel: function(t, e, r) {
        r = r || "leaflet-maplabel";
        var n = L.marker(t, {
            icon: new L.DivIcon({
                iconSize: null ,
                className: r,
                html: "<div>" + e + "</div>"
            })
        });
        return n.options._noprint = !0,
        n.options.clickable = !1,
        n.options.selectable = !1,
        n
    },
    getLength: function(t) {
        var e, r = 0;
        for (e = 0,
        len = t.length - 1; e < len; e++)
            r += t[e].distanceTo(t[e + 1]);
        return r
    },
    paramsStringToObject: function(t, e) {
        e = e || !1;
        for (var r, n, a, i = {}, o = t.split(/[&;]/), s = 0, c = o.length; c > s; s++)
            if (a = o[s].split("="),
            a[0]) {
                r = a[0];
                try {
                    r = decodeURIComponent(r)
                } catch (l) {
                    r = unescape(r)
                }
                n = (a[1] || "").replace(/\+/g, " ");
                try {
                    n = decodeURIComponent(n)
                } catch (l) {
                    n = unescape(n)
                }
                n = n.split(","),
                1 == n.length && (n = n[0]),
                e && (r = r.toUpperCase()),
                i[r] = n
            }
        return i
    },
    projectPoint: function(t, e, r, n) {
        return window.proj4(r, n, [t, e])
    },
    projectLatLng: function(t, e, r, n, a) {
        var i = n ? [t.lat, t.lng] : [t.lng, t.lat]
          , 
        o = window.proj4(e, r, i)
          , 
        s = a ? L.latLng(o[0], o[1]) : L.latLng(o[1], o[0]);
        return s
    },
    projectFeature: function(t, e, r) {
        function n(t, e) {
            return d(t[0], t[1], e, "EPSG:4326")
        }
        
        function a(t) {
            return t = [t[1], t[0]]
        }
        r = r || {};
        var i, o, s, c, l, d = this.projectPoint;
        switch (l = t.geometry,
        l.type) {
        case "Point":
            i = l.coordinates,
            r.reverseAxis && (i = this.swapCoords(i)),
            s = n(i, e),
            l.coordinates = s;
            break;
        case "MultiPoint":
            for (c = 0,
            f = l.coordinates.length; f > c; c++)
                i = l.coordinates[c],
                r.reverseAxis && (i = this.swapCoords(i)),
                s = n(i, e),
                l.coordinates[c] = s;
            break;
        case "LineString":
            for (o = l.coordinates[0],
            c = 0,
            lenP = o.length; c < lenP; c++)
                i = o[c],
                r.reverseAxis && (i = this.swapCoords(i)),
                s = n(i, e),
                o[c] = s;
            break;
        case "MultiLineString":
            o = [];
            var u, f, p;
            for (c = 0,
            f = l.coordinates.length; f > c; c++) {
                for (o = l.coordinates[c],
                u = 0,
                p = o.length; p > u; u++)
                    i = o[u],
                    r.reverseAxis && (i = a(i)),
                    s = n(i, e),
                    o[u] = s;
                l.coordinates[c] = o
            }
            break;
        case "Polygon":
            for (o = l.coordinates[0],
            c = 0,
            lenP = o.length; c < lenP; c++)
                i = o[c],
                r.reverseAxis && (i = this.swapCoords(i)),
                s = n(i, e),
                o[c] = s;
            break;
        case "MultiPolygon":
            o = [];
            var u, h, f, p, g, m;
            for (c = 0,
            f = l.coordinates.length; f > c; c++)
                for (o = l.coordinates[c],
                u = 0,
                p = o.length; p > u; u++)
                    for (m = o[u],
                    h = 0,
                    g = m.length; g > h; h++)
                        i = m[h],
                        r.reverseAxis && (i = a(i)),
                        s = n(i, e),
                        m[h] = s
        }
    }
};
L.Control.Editor = L.Control.extend({
    options: {
        position: "bottomright",
        useProxy: !1,
        reverseAxis: !1,
        encodeKeys: null ,
        saveOnPressEnter: !1
    },
    _lang: {
        sv: {
            dTitle: "Objektets attribut",
            close: "Avbryt",
            save: "Spara",
            remove: "Ta bort",
            move: "Flytta",
            editProps: "Ändra",
            moveLP: "Ändra geometri",
            editPropsLP: "Ändra attribut",
            ruSureRemove: "Ta bort objektet? Åtgärden kan inte ångras.",
            saveNewMarker: "Spara",
            saveMove: "Spara",
            undo: "Ångra",
            cancel: "Avbryt"
        },
        en: {
            dTitle: "Object attributes",
            close: "Cancel",
            save: "Save",
            remove: "Remove",
            move: "Move",
            editProps: "Edit",
            moveLP: "Edit geometry",
            editPropsLP: "Edit attributes",
            doYouWantTo: "Do you want to",
            cannotBeUndoed: "Cannot be undoed",
            ruSureRemove: "Remove feature? Cannot be undoed.",
            saveNewMarker: "Save",
            saveMove: "Save",
            undo: "Undo",
            cancel: "Cancel"
        }
    },
    _geomTypes: {
        POINT: "marker",
        MULTIPOINT: "marker",
        LINESTRING: "polyline",
        MULTILINESTRING: "polyline",
        POLYGON: "polygon",
        MULTIPOLYGON: "polygon"
    },
    _geomType: "marker",
    _setLang: function(e) {
        e = e || smap.config.langCode,
        this._lang && (this.lang = this._lang ? this._lang[e] : null )
    },
    initialize: function(e) {
        L.setOptions(this, e),
        this._setLang(e.langCode),
        this._inserts = [],
        this._updates = [],
        this._deletes = []
    },
    onAdd: function(e) {
        this.map = e,
        this._container = L.DomUtil.create("div", "leaflet-control-editor"),
        L.DomEvent.disableClickPropagation(this._container),
        this.$container = $(this._container),
        this._drawModal();
        var t = this;
        return smap.event.on("smap.core.pluginsadded", function() {
            t._setEditableLayer()
        }),
        this._container
    },
    onRemove: function() {},
    _addBtnAdd: function() {
        var e = this
          , 
        t = $(".smap-editor-btnadd");
        if (!t.length) {
            var t = $('<button class="btn btn-default btn-lg smap-editor-btnadd"><i class="glyphicon glyphicon-plus"></i></button>');
            $(".leaflet-top.leaflet-left").prepend(t),
            t.on("click touchend", function() {
                var t = e._getDrawToolbar();
                return $(this).toggleClass("btn-danger"),
                $(this).hasClass("btn-danger") ? (t.handler.type && "marker" === t.handler.type && (e._onTouchHold = e._onTouchHold || function(o) {
                    var r = t.handler;
                    e._tooltip = e._tooltip || {
                        updatePosition: function() {}
                    },
                    r._onMouseMove({
                        latlng: o.latlng
                    }),
                    r._onClick({
                        latlng: o.latlng
                    })
                }
                ,
                e.map.on("click", e._onTouchHold, e)),
                t.handler.enable()) : (L.Browser.touch && t.handler.type && "marker" === t.handler.type && (e.map.off("click", e._onTouchHold, e),
                $("#smap-editor-uglyhackconfirm").remove()),
                t.handler.disable()),
                !1
            })
        }
    },
    _setEditableLayer: function() {
        function e() {
            if ($(this).parent().hasClass("list-group-item-danger"))
                n.stopEditing();
            else {
                var e = $(this).data("t") || {};
                e = $.extend(!0, {}, e),
                "L.GeoJSON.WFS" === e.init && n.startEditing(e, $(this).parent())
            }
            return !1
        }
        var t, o, r, a = smap.config.ol || [], 
        i = smap.cmd.getControl("LayerSwitcher");
        if (!i)
            return !1;
        for (var n = this, s = 0, d = a.length; d > s; s++)
            t = a[s],
            r = $('<i class="fa fa-edit smap-editor-switcher-icon"></i>'),
            t.options.isEditable && (o = $("#" + i._makeId(t.options.layerId)),
            o.append(r),
            r.data("t", t),
            r.on("click", e))
    },
    _disabledRowClick: function(e) {
        return e.stopPropagation(),
        e.preventDefault(),
        $(e.target).hasClass("smap-editor-switcher-icon") ? $(".smap-editor-switcher-icon").trigger("click") : ($(e.target).tooltip("show"),
        setTimeout(function() {
            $(e.target).tooltip("hide")
        }, 2e3)),
        !1
    },
    stopEditing: function() {
        if (this._editLayer) {
            this._editLayer.options.editable = !1;
            var e = this._editLayer.options.layerId
              , 
            t = e.substring(0, e.length - "-edit".length)
              , 
            o = smap.cmd.getLayer(t);
            o && o.clearLayers && o.clearLayers(),
            o && o._refresh && o._refresh({
                force: !0
            }),
            this.map.removeLayer(this._editLayer)
        }
        return $(".lswitch-panel-ol .list-group-item").off("click", this._disabledRowClick).removeClass("list-group-item-danger"),
        $(".lswitch-panel-ol .list-group-item").tooltip("destroy"),
        this.map.off("draw:created"),
        this.map.off("popupopen", this.__onPopupOpen),
        $(".smap-editor-btnadd").remove(),
        !0
    },
    _validateConfig: function(e) {
        e = e || {};
        var t = e.options || {}
          , 
        o = [];
        for (var r in this._geomTypes)
            o.push(r);
        return t.geomType ? -1 === $.inArray(t.geomType.toUpperCase(), o) ? !1 : !0 : !1
    },
    startEditing: function(e, t) {
        function o(e) {
            var t = e.layer.jsonData.features || [];
            if (t.length)
                r.options.geomType = r._geomType = r._geomTypes[e.layer.options.geomType.toUpperCase()],
                !r._geomType;
            else {
                var o = e.layer.options.geomType;
                o && (r._geomType = r._geomTypes[o.toUpperCase()])
            }
        }
        var r = this
          , 
        a = this.map;
        if (this.stopEditing() !== !0)
            return !1;
        if (this._addBtnAdd(),
        r._tooltip = r._tooltip || {
            updatePosition: function() {}
        },
        $(".lswitch-panel-ol .list-group-item.active").trigger("tap"),
        $(".lswitch-panel-ol .list-group-item-danger").removeClass("list-group-item-danger"),
        $(".lswitch-panel-ol .list-group-item").tooltip({
            title: "Redigering är aktiv. Deaktivera redigering för att tända lagret.",
            trigger: "manual",
            placement: "right",
            container: "#maindiv"
        }).on("click", this._disabledRowClick),
        t.addClass("list-group-item-danger"),
        this._validateConfig(e) === !1)
            return !1;
        var i = $.extend({}, e.options)
          , 
        n = i.params.typeName;
        i.url = e.url,
        i.featureNS = n.split(":")[0],
        i.featureType = n.split(":")[1],
        i.layerId = i.layerId + "-edit";
        var s = i.geomType.toUpperCase()
          , 
        d = "POINT" === s ? this.lang.move : this.lang.moveLP
          , 
        l = "POINT" === s ? this.lang.editProps : this.lang.editPropsLP
          , 
        p = this.lang.remove;
        i.popup = '${*}<div class="popup-divider"></div><div style="white-space:nowrap;min-width:25em;" class="btn-group btn-group-sm editor-popup-edit"><button id="editor-popup-edit" type="button" class="btn btn-default">' + l + '</button><button id="editor-popup-move" type="button" class="btn btn-default">' + d + '</button><button id="editor-popup-remove" type="button" class="btn btn-default">' + p + "</button></div>",
        this._editLayer = L.wfst(e.url, i),
        this._editLayer.options.editing = this._editLayer.options.editing || {},
        this._editLayer.on("wfst:savesuccess", function() {
            smap.cmd.loading(!1)
        }),
        this._editLayer.on("wfst:saveerror", function() {
            smap.cmd.loading(!1)
        }),
        this._editLayer.on("wfst:ajaxerror", function() {
            smap.cmd.loading(!1)
        }),
        a.addLayer(this._editLayer),
        this._drawControl = new L.Control.Draw({
            edit: {
                featureGroup: this._editLayer
            }
        }),
        a.addControl(this._drawControl),
        $(".leaflet-draw").remove(),
        this._editLayer.on("load", o),
        a.on("draw:created", function(e) {
            $(".smap-editor-btnadd").removeClass("btn-danger"),
            r._editLayer.addLayer(e.layer),
            r._marker = e.layer,
            r._showSaveToolbar("insert")
        }),
        this.__onPopupOpen = this.__onPopupOpen || $.proxy(this._onPopupOpen, this),
        this.map.on("popupopen", this.__onPopupOpen)
    },
    _getLayerById: function(e, t) {
        function o(i) {
            var n = i._layers || {};
            if (!n)
                return null ;
            if (n.hasOwnProperty(t))
                return {
                    marker: n[t],
                    markerGeometry: n[t]
                };
            var s, d;
            for (d in n)
                if (0 === a && (r = d),
                a += 1,
                s = o(n[d]),
                a -= 1,
                s)
                    return {
                        marker: e._layers[r],
                        markerGeometry: s.marker
                    };
            return null 
        }
        var r, a = 0;
        return o(e)
    },
    _onPopupOpen: function(e) {
        var t = this;
        if (this._marker && this._marker.dragging && this._marker.dragging._draggable && this._marker.dragging._draggable._enabled) {
            if (this.map.closePopup(),
            confirm("Do you to stop editing this feature? Any changes made to the feature will be removed.") !== !0)
                return;
            this.cancelEdit()
        }
        var o = $(e.popup._container);
        if (e.popup._source.feature && "polyline" != this._geomType)
            this._marker = e.popup._source,
            this._markerGeometry = null ;
        else {
            var r = this._getLayerById(this._editLayer, e.popup._source._leaflet_id);
            this._marker = r.marker,
            this._markerGeometry = e.popup._source
        }
        o.find("#editor-popup-remove").on("click", function() {
            return confirm(t.lang.ruSureRemove) === !0 && t._editLayer.wfstRemove(t._marker).done(function() {
                t._editLayer.clearLayers(),
                t._editLayer._refresh({
                    force: !0
                })
            }),
            !1
        }),
        o.find("#editor-popup-move").on("click", function() {
            t.map.closePopup();
            var e = t._getEditToolbar();
            return e.handler._enableLayerEdit(t._markerGeometry || t._marker),
            t._showSaveToolbar("update"),
            t._editLayer.options.editable = !0,
            !1
        }),
        o.find("#editor-popup-edit").on("click", function() {
            return t._modalEdit.modal("show"),
            !1
        })
    },
    _getEditToolbar: function() {
        var e;
        for (var t in this._drawControl._toolbars)
            if (e = this._drawControl._toolbars[t],
            e && e._modes && e._modes.edit)
                return e._modes.edit;
        return null 
    },
    _getDrawToolbar: function() {
        var e;
        for (var t in this._drawControl._toolbars)
            if (e = this._drawControl._toolbars[t],
            e && e._modes && e._modes[this._geomType])
                return e._modes[this._geomType];
        return null 
    },
    wfstSave: function(e) {
        e = e ? L.Util.isArray(e) ? e : [e] : [];
        var t, o, r = [], 
        a = this._editLayer;
        for (o = 0,
        len = e.length; o < len; o++)
            if ("object" == typeof e[o]._layers)
                for (t in e[o]._layers)
                    smap.cmd.loading(!0),
                    r.push(a._wfstSave(e[o]._layers[t]));
            else
                r.push(a._wfstSave(e[o]));
        return $.when.apply($, r)
    },
    save: function(e) {
        e = e || null ;
        var t, o, r = this._inserts, 
        a = this._updates, 
        i = this._editLayer, 
        n = r.length;
        for (t = 0; n > t; t++)
            o = r[t],
            i._wfstAdd(o).done(function() {
                r.splice(o, 1),
                e && e()
            });
        for (n = a.length,
        t = 0; n > t; t++)
            o = a[t],
            this.wfstSave(o).done(function() {
                a.splice(o, 1)
            })
    },
    cancelEdit: function() {
        var e = this._getEditToolbar();
        e.handler._disableLayerEdit(this._markerGeometry || this._marker),
        this._editLayer.clearLayers(),
        this._editLayer._refresh({
            force: !0
        }),
        this._hideSaveToolbar()
    },
    _showSaveToolbar: function(e) {
        if (this._editType = e,
        !this._saveToolbar) {
            var t = this;
            this._saveToolbar = $('<div class="smap-editor-savetoolbar btn-group btn-group-lg" />');
            var o = $('<button class="btn btn-success">Save</button>')
              , 
            r = $('<button class="btn btn-default">Cancel</button>');
            this._saveToolbar.append(r).append(o),
            $(".leaflet-top.leaflet-left").append(this._saveToolbar),
            o.on("click", function() {
                if (t._marker.options.geomType = t._editLayer.options.geomType.toUpperCase(),
                "update" === t._editType) {
                    var e = t._marker.options.geomType;
                    "POINT" === e || "POLYGON" === e ? t.wfstSave(t._marker) : (t._markerGeometry.feature = $.extend({}, t._marker.feature),
                    t.wfstSave(t._markerGeometry))
                }
                var o = t._getEditToolbar();
                return o.handler._disableLayerEdit(t._markerGeometry || t._marker),
                "insert" === t._editType ? (t._inserts.push(t._marker),
                t.save(function() {
                    t._editLayer.clearLayers(),
                    t._editLayer._refresh({
                        force: !0
                    }),
                    t._hideSaveToolbar()
                })) : "update" === t._editType && (t.save(),
                t._hideSaveToolbar()),
                !1
            }),
            r.on("click", function() {
                return t.cancelEdit(),
                !1
            })
        }
        var a = "insert" == this._editType ? this.lang.saveNewMarker : this.lang.saveMove
          , 
        i = this.lang.cancel;
        this._saveToolbar.find("button:eq(0)").text(i),
        this._saveToolbar.find("button:eq(1)").text(a),
        this._saveToolbar.show()
    },
    _hideSaveToolbar: function() {
        this._saveToolbar.hide()
    },
    _fillModal: function(e) {
        if (e = e || null ,
        null  === e)
            return !1;
        var t, o, r, a, i = this._modalEdit.find("#smap-editor-content"), 
        n = $('<form role="form" />'), 
        s = this.options.encodeKeys || [];
        for (t in e)
            "fid" !== t && "id" !== t && "gid" !== t && (o = e[t],
            o = o || "",
            ("*" === s || $.inArray(t, s) > -1) && (o = decodeURIComponent(o)),
            a = "smap-editor-propentry-" + t,
            r = '<div class="form-group">					<label for="' + a + '">' + t + '</label>					<textarea rows="1" resizable name="' + t + '" class="form-control" id="' + a + '">' + o + "</textarea>				</div>",
            n.append(r));
        n.find("textarea").on("change", function() {
            $(this).addClass("changed")
        }).on("focus", function() {
            $(this).prop("rows", 5)
        }).on("blur", function() {
            $(this).prop("rows", 1)
        }),
        i.append(n)
    },
    _onSaveAttributesSuccess: function() {
        this._marker.fire("click")
    },
    _saveAttributes: function() {
        var e = this._marker.feature.properties
          , 
        t = {}
          , 
        o = this._modalEdit.find("form").find("textarea.changed");
        if (!o.length)
            return this._modalEdit.modal("hide"),
            !1;
        var r, a, i = this.options.encodeKeys || [];
        o.each(function() {
            r = $(this).attr("name"),
            a = $(this).val(),
            ("*" === i || $.inArray(r, i) > -1) && (a = encodeURIComponent(a)),
            t[r] = a
        });
        var n = $.extend({}, e, t);
        this._marker.feature.properties = n,
        this._marker.toGML || (this._markerGeometry.feature = $.extend({}, this._marker.feature)),
        this.__onSaveAttributesSuccess = this.__onSaveAttributesSuccess || $.proxy(this._onSaveAttributesSuccess, this),
        this._editLayer.off("wfst:savesuccess", this.__onSaveAttributesSuccess).on("wfst:savesuccess", this.__onSaveAttributesSuccess),
        this._editLayer._wfstSave(this._markerGeometry || this._marker, {
            newProps: t
        }),
        this._modalEdit.modal("hide"),
        this.map.closePopup()
    },
    _drawModal: function() {
        var e = this
          , 
        t = $('<div id="smap-editor-content" />')
          , 
        o = '<button type="button" class="btn btn-default" data-dismiss="modal">' + this.lang.close + '</button><button id="smap-editor-editmodal-btnsave" type="button" class="btn btn-primary">' + this.lang.save + "</button>";
        this._modalEdit = utils.drawDialog(this.lang.dTitle, t, o, {}),
        this._modalEdit.find("#smap-editor-editmodal-btnsave").on("click", function() {
            return e._saveAttributes(),
            !1
        }),
        this._modalEdit.on("shown.bs.modal", function() {
            var t = e._marker.feature.properties;
            e._fillModal(t),
            e.options.saveOnPressEnter && e._modalEdit.on("keypress", function(t) {
                13 === t.which && ($("#smap-editor-editmodal-btnsave").focus(),
                e._saveAttributes(),
                e._modalEdit.modal("hide"),
                t.preventDefault())
            })
        }),
        e._modalEdit.on("hidden.bs.modal", function() {
            t.empty(),
            e._modalEdit.off("keypress")
        })
    }
});
L.Control.FullScreen = L.Control.extend({
    options: {
        position: "topright",
        url_root: location.origin + location.pathname + "?",
        mode: "full"
    },
    _properties: function() {
        var e = this
          , 
        t = this.lang;
        switch (this.options.mode) {
        case "replace":
            return {
                expand: "fa fa-expand",
                compress: "fa fa-compress",
                expTitle: t.viewLarge,
                compTitle: t.back,
                action: function() {
                    window.parent.location.href = smap.cmd.createParams(e.options.url_root)
                }
            };
        case "newTab":
            return {
                expand: "fa fa-external-link",
                compress: "fa fa-compress",
                expTitle: t.newTab,
                compTitle: t.back,
                action: function() {
                    window.open(smap.cmd.createParams(e.options.url_root))
                }
            };
        case "full":
            return {
                expand: "fa fa-expand",
                compress: "fa fa-compress",
                expTitle: t.fullExp,
                compTitle: t.reset,
                action: function() {
                    var e = document.getElementById("body");
                    screenfull.enabled && screenfull.toggle(e)
                }
            }
        }
    },
    _lang: {
        sv: {
            viewLarge: "Visa större karta",
            newTab: "Öppna kartan i ny flik",
            fullExp: "Visa kartan i fullskärm",
            reset: "Återställ",
            back: "Tillbaka",
            notAllowed: "Helskärmsläge stöds eller tillåts inte av din webläsare. Funktionen kommer inte vara tillgänglig"
        },
        en: {
            viewLarge: "Show larger map",
            newTab: "Open map in new tab",
            fullExp: "Show in fullscreen",
            reset: "Reset",
            back: "Go back",
            notAllowed: "Fullscreen mode not supported/allowed by your browser. Feature will not be available."
        }
    },
    _setLang: function(e) {
        e = e || smap.config.langCode,
        this._lang && (this.lang = this._lang ? this._lang[e] : null )
    },
    initialize: function(e) {
        L.setOptions(this, e),
        this._setLang(e.langCode)
    },
    onAdd: function(e) {
        this.map = e;
        var t = this;
        return this._container = L.DomUtil.create("div", "leaflet-control-fullScreen"),
        L.DomEvent.disableClickPropagation(this._container),
        this.$container = $(this._container),
        "full" === this.options.mode ? this._enableIframeFullscreen() && screenfull.enabled && (this._createBtn(),
        document.addEventListener(screenfull.raw.fullscreenchange, function() {
            t._updateButton()
        })) : this._createBtn(),
        this._container
    },
    activate: function() {
        this._properties().action()
    },
    _enableIframeFullscreen: function() {
        if (self === top)
            return !0;
        try {
            var e = window.parent.document.getElementsByTagName("iframe")[0];
            return e.setAttribute("allowfullscreen", ""),
            !0
        } catch (t) {
            return !1
        }
    },
    _updateButton: function() {
        var e = $("#smap-fullscreen-btn")
          , 
        t = this._properties();
        screenfull.isFullscreen ? (e.find("span").removeClass(t.expand).addClass(t.compress),
        e.attr("data-original-title", t.compTitle)) : (e.find("span").removeClass(t.compress).addClass(t.expand),
        e.attr("data-original-title", t.expTitle)),
        e.blur()
    },
    onRemove: function() {},
    _createBtn: function() {
        var e = this;
        this.$btn = $('<button id="smap-fullscreen-btn" title="' + e._properties().expTitle + '" class="btn btn-default"><span class="' + e._properties().expand + '"></span></button>'),
        this.$btn.on("click", function() {
            return e.activate(),
            !1
        }),
        this.$container.append(this.$btn)
    }
}),
L.control.fullScreen = function(e) {
    return new L.Control.FullScreen(e)
}
;
L.Control.GuideIntroScreen = L.Control.extend({
    options: {
        autoActivate: !0,
        position: "bottomright",
        /*prefix: '<a href="//leafletjs.com" title="A JS library for interactive maps">Leaflet</a>',*/
        prefix: '',
        bgSrc: null ,
        langs: {
            sv: "Svenska",
            en: "English"
        },
        words: {
            sv: {
                btnStartTour: "Starta turen"
            },
            en: {
                btnStartTour: "Start the tour"
            }
        },
        header: {
            sv: {
                title: "Promenadstaden",
                subHeaders: ["Malmö museer, Science Center"]
            },
            en: {
                title: "The walking city",
                subHeaders: ["Malmö museums, Science Center"]
            }
        },
        configs: [{
            configName: "guide-industri.js",
            disabledText: !1,
            sv: {
                title: "Industristaden",
                description: "Industrispåret guidar dig genom de gamla industrierna i Malmös innerstad."
            },
            en: {
                title: "The industrial city",
                description: "This tour guides you to some old industrial buildings of Malmö"
            }
        }, {
            configName: "guide-vh.js",
            disabledText: !1,
            sv: {
                title: "Västra hamnen",
                description: "Västra hamnen guidar dig genom Malmös modernaste och fräsigaste stadsdel."
            },
            en: {
                title: "Western harbor",
                description: "This tour guides you through the most modern part of Malmö."
            }
        }]
    },
    initialize: function(t) {
        L.setOptions(this, t)
    },
    onAdd: function(t) {
        this.map = t,
        this._container = L.DomUtil.create("div", "leaflet-control-guideintroscreen"),
        L.DomEvent.disableClickPropagation(this._container);
        var n = this._makeContent("sv")
          , 
        i = $('<div class="guide-introscreen" />');
        return i.append(n),
        this.options.euLogoSrc && i.append('<img class="gintro-eulogo" src="' + this.options.euLogoSrc + '"></img>'),
        this.options.bgSrc && i.prepend('<img class="gintro-bg gintro-bg-left" src="' + this.options.bgSrc + '"></img><img class="gintro-bg gintro-bg-right" src="' + this.options.bgSrc + '"></img>'),
        this.$container = i,
        this._container
    },
    onRemove: function() {
        this.deactivate(),
        this.$container.remove()
    },
    activate: function() {
        $("#maindiv").append(this.$container),
        $("#mapdiv").hide()
    },
    deactivate: function() {
        this.$container.detach(),
        $("#mapdiv").show()
    },
    _makeContent: function(t) {
        for (var n = $('<div class="guide-content container" />'), i = this.options.words[t], e = this, o = function() {
            smap.cmd.loading(!0);
            var t = $(this).data("configName");
            return smap.map.removeControl(e),
            smap.cmd.reloadCore({
                params: {
                    CONFIG: t
                }
            }),
            !1
        }
        , s = this.options.header[t], a = "", r = 0, d = s.subHeaders.length; d > r; r++)
            a += '<p class="lead">' + s.subHeaders[r] + "</p>";
        var l = $('<div class="container" id="gintro-logo-container"></div>');
        this.options.munLogoSrc && l.append('<img class="gintro-munlogo" src="' + this.options.munLogoSrc + '"></img>');
        var c, g = '<div class="container"><h1 style="margin-bottom:20px;">' + s.title + "</h1>" + a + "</div>", 
        p = "btn-danger", 
        u = this.options.langs, 
        m = "", 
        h = $('<div style="margin-top:30px;" class="btn-group" />');
        for (var b in u)
            m = u[b],
            c = $('<button type="button" class="guideintro-btn-option btn btn-default">' + m + "</button>"),
            b === t && c.addClass(p),
            c.data("langCode", b),
            h.append(c);
        n.append(g),
        l.children().length && n.append(l),
        n.append(h);
        var v, f, C, S, x = this.options.configs, 
        L = $('<div class="row" />');
        n.append(L);
        for (var r = 0, d = x.length; d > r; r++) {
            if (v = x[r],
            S = v.configName,
            f = v[t],
            C = $('<div class="gintro-box col-xs-6 col-md-4 col-lg-3 text-left"><h3>' + f.title + '</h3><div style="margin-bottom:20px;"><p class="lead text-muted">' + f.description + '</p><button class="btn btn-default btn-sm gintro-btn-configoption">' + i.btnStartTour + "</button></div></div>"),
            v.disabledText) {
                var T = $('<div class="gintro-disbox"><label>' + v.disabledText + "</label></div>");
                C.find("div").append(T),
                C.find("button").addClass("disabled"),
                C.addClass("disabled")
            }
            C.addClass("col-xs-offset-3 col-md-offset-1 col-lg-offset-1");
            var y = C.find("button");
            y.data("configName", S),
            L.append(C)
        }
        return n.find(".guideintro-btn-option").on("click", function() {
            var n = $(this).data("langCode");
            if (t !== n) {
                $(this).addClass(p).siblings().removeClass(p).addClass("btn-default");
                var i = e._makeContent(n).children();
                $(".guide-content").empty().append(i)
            }
            return !1
        }),
        n.find(".gintro-btn-configoption").on("click", o),
        n
    }
}),
L.control.guideIntroScreen = function(t) {
    return new L.Control.GuideIntroScreen(t)
}
;
L.Control.Geolocate = L.Control.extend({
    options: {
        position: "bottomright",
        locateOptions: {
            maxZoom: 17,
            enableHighAccuracy: !0
        }
    },
    _lang: {
        sv: {
            /*errorGeolocate: "Kunde inte hitta din position",*/
            errorGeolocate: "Kunde inte hitta din position. Position / gps är inte aktiverad",
            notSupported: "Din webbläsare stödjer inte geolokalisering"
        },
        en: {
            errorGeolocate: "The browser could not detect your position",
            notSupported: "Your browser does not support geolocation"
        }
    },
    _setLang: function(t) {
        t = t || smap.config.langCode || navigator.language.split("-")[0] || "en",
        this._lang && (this.lang = this._lang ? this._lang[t] : null )
    },
    initialize: function(t) {
        L.setOptions(this, t),
        this._setLang(t.langCode)
    },
    onAdd: function(t) {
        return this.map = t,
        this._container = L.DomUtil.create("div", "leaflet-control-Geolocate"),
        L.DomEvent.disableClickPropagation(this._container),
        this.$container = $(this._container),
        this._drawButton(),
        this._container
    },
    onRemove: function() {},
    _drawButton: function() {
        var t = $('<button id="smap-glocate-btn" class="btn btn-default"><span class="fa fa-location-arrow"></span></button>');
        this.$container.append(t),
        this.btn = t,
        t.on("click", $.proxy(function() {
            return this.active ? this.deactivate() : this.activate(),
            !1
        }, this))
    },
    activate: function() {
        return this.active ? !1 : navigator.geolocation ? (this.active = !0,
        this.btn.addClass("btn-primary"),
        smap.cmd.loading(!0),
        this.__onLocationFound = this.__onLocationFound || $.proxy(this._onLocationFound, this),
        this.__onLocationError = this.__onLocationError || $.proxy(this._onLocationError, this),
        this.__onDragStart = this.__onDragStart || $.proxy(this._onDragStart, this),
        this.map.on("locationfound", this.__onLocationFound),
        this.map.on("locationerror", this.__onLocationError),
        this.map.on("dragstart", this.__onDragStart),
        this.map.on("zoomstart", this.__onDragStart),
        void this._startLocate(this.options.locateOptions)) : (smap.cmd.notify(this.lang.notSupported, "error"),
        !1)
    },
    deactivate: function() {
        return this.active ? (this.active = !1,
        smap.cmd.loading(!1),
        this.btn.removeClass("btn-primary"),
        this.map.off("locationfound", this.__onLocationFound),
        this.map.off("locationerror", this.__onLocationError),
        this.map.off("dragstart", this.__onDragStart),
        this.map.off("zoomstart", this.__onDragStart),
        this._stopLocate(),
        void (this.marker && (this.map.removeLayer(this.marker),
        this.marker = null ))) : !1
    },
    _startLocate: function(t) {
        t = t || {};
        var o = {
            watch: !0,
            setView: !0,
            enableHighAccuracy: !1
        };
        t = $.extend(o, t),
        this.map.locate(t)
    },
    _stopLocate: function() {
        this.map.stopLocate()
    },
    _onLocationFound: function(t) {
        smap.cmd.loading(!1),
        this.marker = this.marker || L.userMarker(t.latlng, {
            pulsing: !0
        }).addTo(this.map),
        this.marker.setLatLng(t.latlng),
        this.marker.setAccuracy(t.accuracy)
    },
    _onLocationError: function(t) {
        smap.cmd.loading(!1);
        var o = smap.cmd.notify(this.lang.errorGeolocate + ": " + t.message, "error", {
            parent: $("body")
        });
        o.on("touchstart", function() {
            $("body").find(".alert").remove()
        }),
        this.deactivate()
    },
    _onDragStart: function() {
        this._stopLocate(),
        this._startLocate({
            setView: !1
        })
    }
}),
L.control.geolocate = function(t) {
    return new L.Control.Geolocate(t)
}
;
L.Control.GuidePopup = L.Control.extend({
    options: {},
    initialize: function(i) {
        L.setOptions(this, i),
        this._setLang()
    },
    _lang: {
        sv: {
            introHeader: "Info",
            mediaHeader: "Media",
            accessHeader: "Tillgänglighet",
            close: "Stäng",
            showMore: "Visa mer",
            clickToSee: "Klicka för mer info",
            loadingPic: "Hämtar bild",
            tipClickForFullScreen: "Klicka för fullskärmsbild"
        },
        en: {
            introHeader: "About",
            mediaHeader: "Media",
            accessHeader: "Accessibility",
            close: "Close",
            showMore: "Read more",
            loadingPic: "Loading photo",
            clickToSee: "Click for more info",
            picFullScreenTitle: "Slideshow",
            tipClickForFullScreen: "Click for full-screen photo"
        }
    },
    _setLang: function(i) {
        i = i || smap.config.langCode || navigator.language.split("-")[0] || "en",
        this._lang && (this.lang = this._lang ? this._lang[i] : null )
    },
    onAdd: function(i) {
        this.map = i,
        this._container = L.DomUtil.create("div", "leaflet-control-guidepopup"),
        L.DomEvent.disableClickPropagation(this._container),
        this.$container = $(this._container),
        this.__onPopupClick = this.__onPopupClick || $.proxy(this._onPopupClick, this);
        var e = this;
        return e._activate(),
        this._container
    },
    onRemove: function() {
        this._deactivate(),
        windowWidth < 950 ? this.hideTheTag() : this.showTheTag()
    },
    _onPopupClick: function(i) {
        var e = $("#gp-btn-show").data("props")
          , 
        t = this._getFeatureData(e[this.options.attrId])
          , 
        o = t.tabMedia
          , 
        n = t.tabIntro;
        if (n)
            this.createPopup(e);
        else if (o && o instanceof Object) {
            var a, s = this._makeMediaContent(o.mediaType, utils.extractToHtml(o.sources, e).split(","));
            "image" !== t.mediaType && (a = utils.extractToHtml(t.fullScreenIntroPic, e)),
            this.showFullScreen(s, utils.extractToHtml(o.label, e), a)
        }
        return ($(i.target).hasClass("gp-mediaicons") || $(i.target).parent().hasClass("gp-mediaicons")) && $('[href="#gp-moreinfo"]').click(),
        !1
    },
    _onPopupOpen: function(i) {
        if (i.popup._source && i.popup._source.feature) {
            var e = (i.popup._source.feature.layerId,
            i.popup._source.feature.properties);
            i.popup.options.autoPanPaddingTopLeft = [0, 60],
            $(".leaflet-popup-content").find(".gp-mediaicons").on("touchstart click", this.__onPopupClick);
            var t = this._getFeatureData(e[this.options.attrId]);
            if (t && t instanceof Object) {
                var o = $('<button style="margin-top:10px;" id="gp-btn-show" class="btn btn-default">' + this.lang.showMore + "</button>");
                $(".leaflet-popup-content").append(o),
                o.data("props", e),
                o.on("touchstart click", this.__onPopupClick),
                $(".leaflet-popup-content img").on("touchstart click", this.__onPopupClick).css("cursor", "pointer").tooltip({
                    title: this.lang.clickToSee
                })
            }
        }
    },
    _onPopupClose: function(i) {
        $(i.popup._wrapper).off("touchstart", this.onPopupClick)
    },
    _activate: function() {
        for (var i, e = this, t = {
            audio: {
                icon: L.icon({
                    iconUrl: "img/glyphish-icons/PNG-icons/120-headphones.png",
                    iconSize: [22, 21],
                    iconAnchor: [11, 10],
                    popupAnchor: [0, -8]
                })
            },
            video: {
                icon: L.icon({
                    iconUrl: "img/glyphish-icons/PNG-icons/46-movie-2.png",
                    iconSize: [20, 25],
                    iconAnchor: [10, 12],
                    popupAnchor: [0, -9]
                })
            },
            image: {
                icon: L.icon({
                    iconUrl: "img/glyphish-icons/PNG-icons/121-landscape.png",
                    iconSize: [22, 21],
                    iconAnchor: [11, 10],
                    popupAnchor: [0, -8]
                })
            }
        }, t = {
            audio: {
                icon: L.icon({
                    iconUrl: "img/glyphish-icons/PNG-icons/120-headphones.png",
                    iconSize: [22, 21],
                    iconAnchor: [11, 10],
                    popupAnchor: [0, -8]
                })
            },
            video: {
                icon: L.icon({
                    iconUrl: "img/glyphish-icons/PNG-icons/46-movie-2.png",
                    iconSize: [20, 25],
                    iconAnchor: [10, 12],
                    popupAnchor: [0, -9]
                })
            },
            image: {
                icon: L.icon({
                    iconUrl: "img/glyphish-icons/PNG-icons/121-landscape.png",
                    iconSize: [22, 21],
                    iconAnchor: [11, 10],
                    popupAnchor: [0, -8]
                })
            }
        }, o = smap.config.ol || [], n = 0, a = o.length; a > n; n++)
            i = o[n].options,
            i.params && i.params.q && (i.pointToLayer = function(i, o) {
                {
                    var n = i.properties || {}
                      , 
                    a = e.options.modalContentOverrides[n[e.options.attrId]] || {};
                    a.tabMedia
                }
                return a.iconType && t[a.iconType] ? L.marker(o, t[a.iconType]) : L.marker(o)
            }
            );
        this.map.on("popupopen", this._onPopupOpen, this),
        this.map.on("popupclose", this._onPopupClose, this)
    },
    _deactivate: function() {
        this.map.off("popupopen", this.__onPopupOpen),
        this.map.off("popupclose", this.__onPopupClose)
    },
    _makeCarousel: function(i) {
        i = i || [];
        for (var e, t = $('<div id="guide-carousel" class="carousel slide">'), o = $('<ol class="carousel-indicators" />'), n = $('<div class="carousel-inner" />'), a = $('<a class="left carousel-control" href="#guide-carousel" data-slide="prev"><span class="icon-prev"></span></a><a class="right carousel-control" href="#guide-carousel" data-slide="next"><span class="icon-next"></span></a>'), s = 0, c = i.length; c > s; s++)
            e = i[s],
            o.append('<li data-target="#guide-carousel" data-slide-to="' + s + '"></li>'),
            n.append('<div class="item"><img src="' + e + '"></img></div>');
        return n.find(".item:first").add(o.find("li:first")).addClass("active"),
        t.append(n),
        i.length > 1 && (t.prepend(o),
        t.append(a),
        t.swiperight(function() {
            $(this).carousel("prev")
        }).swipeleft(function() {
            $(this).carousel("next")
        })),
        $(document).on("orientationchange", function() {
            var i = window.innerHeight;
            $(".gp-fullscreen").height(i)
        }),
        t
    },
    _makeAudioTag: function(i) {
        i = i || [];
        for (var e, t, o, n, a = $('<audio controls="controls" />'), s = 0, c = i.length; c > s; s++) {
            switch (e = i[s],
            t = e.substring(e.length - 3).toUpperCase()) {
            case "OGG":
                o = "audio/ogg";
                break;
            case "MP3":
                o = "audio/mpeg"
            }
            n = '<source src="' + e + '" type="' + o + '" />',
            a.append(n)
        }
        return a
    },
    _makeVideoTag: function(i) {
        i = i || [];
        var e = $(window).width() - 2
          , 
        t = $(window).height() - 65;
        if (t > e) {
            var o = e;
            e = t,
            t = o
        }
        t /= 2,
        e /= 2;
        var n, a = i[0];
        return a.search(/youtu.be|youtube/i) > -1 ? n = $('<iframe src="' + a + '?rel=0" width="100%" height="80%" frameborder="0" allowfullscreen></iframe>') : a.search(/vimeo.com/i) && (n = $('<iframe src="' + a + '" width="100%" height="80%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')),
        n
    },
    _makeAccessContent: function(i) {
        var e = this._getFeatureData(i[this.options.attrId]);
        return utils.extractToHtml(e.tabAccess, i)
    },
    _makeMediaList: function(i, e) {
        if (i = i || [],
        !i.length)
            return null ;
        var t, o, n, a = {
            image: "fa fa-picture-o fa-lg",
            audio: "fa fa-volume-up fa-lg",
            video: "fa fa-film fa-lg"
        }, 
        s = $('<div id="gp-listmoreinfo" class="list-group" />');
        for (o = 0,
        len = i.length; o < len; o++)
            t = i[o],
            (!t.condition || t.condition && t.condition(e) === !0) && (n = $('<a href="#" class="list-group-item"><span class="' + a[t.mediaType] + '"></span>&nbsp;&nbsp;&nbsp;' + utils.extractToHtml(t.label, e) + "</a>"),
            n.data("mediaType", o),
            s.append(n));
        return s.children().length ? s : null 
    },
    showFullScreen: function(i, e, t) {
        function o(i) {
            27 === i.which && n()
        }
        
        function n() {
            return $("body").off("keydown", o),
            $(".gp-fullscreen").removeClass("gp-fs-visible"),
            $(".gp-fullscreen").find("audio").each(function() {
                this.pause && this.pause()
            }),
            setTimeout(function() {
                $(".gp-fullscreen").empty().remove()
            }, 500),
            !1
        }
        var a = $('<div class="gp-fullscreen"></div>');
        $("body").on("keydown", o);
        var s = $('<button type="button" class="btn btn-default">Stäng</button>');
        s.on("click", function() {
            return n(),
            !1
        });
        var c = "<h1>" + e + "</h1>";
        if (a.append(c),
        t) {
            var r = $('<img class="gp-mediapic" src="' + t + '" />');
            a.append(r)
        }
        a.append(i),
        a.append(s),
        s.css("z-index", 3e3),
        $("body").append(a),
        setTimeout(function() {
            a.addClass("gp-fs-visible")
        }, 50)
    },
    _makeMediaContent: function(i, e) {
        switch (i.toLowerCase()) {
        case "image":
            content = this._makeCarousel(e);
            break;
        case "audio":
            content = this._makeAudioTag(e);
            break;
        case "video":
            content = this._makeVideoTag(e)
        }
        return content
    },
    _getFeatureData: function(i) {
        var e = this.options.modalContentOverrides[i] || {};
        return $.extend(!0, {}, this.options.modalContent || {}, e)
    },
    createPopup: function(i) {
        function e() {
            var e, o = $(this).data("mediaType"), 
            a = n.tabMedia[o], 
            s = utils.extractToHtml(a.sources, i), 
            c = t._makeMediaContent(a.mediaType, s.split(","));
            return "audio" === a.mediaType && (e = utils.extractToHtml(n.fullScreenIntroPic, i)),
            t.showFullScreen(c, $(this).text(), e),
            !1
        }
        i = i || {};
        var t = this
          , 
        o = '<ul class="nav nav-tabs"><li class="active"><a href="#gp-intro" data-toggle="tab">' + this.lang.introHeader + '</a></li><li><a href="#gp-moreinfo" data-toggle="tab">' + this.lang.mediaHeader + '</a></li><li><a href="#gp-access" data-toggle="tab">' + this.lang.accessHeader + '</a></li></ul><div class="tab-content gp-popup"><div class="tab-pane active" id="gp-intro"></div><div class="tab-pane" id="gp-moreinfo"></div><div class="tab-pane" id="gp-access"></div></div>';
        o = $(o);
        var n = this._getFeatureData(i[this.options.attrId])
          , 
        a = this._makeMediaList(n.tabMedia, i);
        a ? o.find("#gp-moreinfo").append(a) : o.find('[href="#gp-moreinfo"], #gp-moreinfo').remove();
        var s = this._makeAccessContent(i);
        s ? o.find("#gp-access").append(s) : o.find('[href="#gp-access"], #gp-access').remove();
        var c = utils.extractToHtml(n.dialogTitle || i[this.options.dialogTitle], i)
          , 
        r = '<button type="button" class="btn btn-default" data-dismiss="modal">' + this.lang.close + "</button>";
        if (this.dialog = utils.drawDialog(c, o, r),
        this.dialog.on("hidden.bs.modal", function() {
            $(this).empty().remove(),
            t.dialog = null ,
            delete t.dialog
        }),
        this.dialog.attr("id", "gp-popup"),
        this.dialog.find("#gp-listmoreinfo").find(".list-group-item").on("tap click", e),
        $("body").append(this.dialog),
        this.dialog.modal(),
        n.tabIntro) {
            var p = utils.extractToHtml(n.tabIntro, i);
            if ("HTTP" === p.substring(0, 4).toUpperCase())
                this._getData(p, function() {
                    $("#gp-intro").append(utils.extractToHtml($(this).html(), i)),
                    smap.cmd.loading(!1)
                });
            else {
                var l = $("<div />").append(p);
                l.find("img").each(function() {
                    utils.addImageLoadIndicator($(this), {
                        height: "150px"
                    })
                }),
                l.find("img").on("click tap", function() {
                    var i = t._makeCarousel([$(this).prop("src")]);
                    t.showFullScreen(i, c)
                }).prop("title", this.lang.tipClickForFullScreen).tooltip(),
                $("#gp-intro").append(l)
            }
        }
    },
    _getData: function(i, e) {
        var t = $("<div />");
        smap.cmd.loading(!0),
        i = this.options.useProxy ? smap.config.ws.proxy + encodeURIComponent(i) : i,
        t.load(i, e)
    }
}),
L.control.guidePopup = function(i) {
    return new L.Control.GuidePopup(i)
}
;
L.Control.Helper = L.Control.extend({
    options: {
        autoActivate: !1,
        position: "topright",
        steps: [{
            title: "Welcome to Malmö Stadsatlas!",
            description: '<p>Would you like to take a little tour?</p><div class="smap-helper-button-group smap-helper-tour-or-not" style="text-align: left; font-size:1.5em;"><div class="smap-helper-button"><i class="fa fa-close"></i><span> No</span></div><div class="smap-helper-button" style="margin-left: 10px;"><span>Yes </span><i class="fa fa-check"></i></div></div>',
            noNav: !0,
            func: function() {
                var e = this._$stepContainer.find(".smap-helper-tour-or-not")
                  , 
                t = e.find(".smap-helper-button:eq(0)")
                  , 
                i = e.find(".smap-helper-button:eq(1)")
                  , 
                s = this;
                t.on("click", function() {
                    return s.deactivate(),
                    !1
                }),
                i.on("click", function() {
                    return s.goToNextStep(),
                    !1
                }),
                e.addClass("smap-helper-fadein")
            }
        }, {
            title: "Toggle button",
            description: "To hide the switcher you can press this button.",
            breakPoint: 991,
            bbox: {
                selector: ".lswitch-btnhide",
                mobileSelector: !1
            },
            css: {
                side: "right"
            }
        }, {
            title: "Layer switcher",
            description: "The layer switcher is not visible from start on mobile devices. Try making the window smaller and notice that the switcher hides. You can then show it by clicking the expand button in the lower left section of the map.",
            breakPoint: 991,
            bbox: {
                selector: ".lswitch-panel .panel",
                mobileSelector: "#lswitch-btn"
            },
            css: {
                side: "right",
                mobileSide: "bottom"
            },
            func: function() {}
        }, {
            title: "Search functionality",
            description: "The search functionality is vast. You can search for Malmö addresses or a place like Turning Torso, or Zlatans home.",
            bbox: {
                selector: "#smap-search-div"
            },
            css: {
                side: "bottom"
            }
        }, {
            title: "Tools",
            description: "These are the basic tools for map navigation",
            bbox: {
                selector: ".leaflet-bottom.leaflet-right"
            },
            css: {
                side: "top"
            }
        }, {
            title: "Masthead",
            description: "Left",
            bbox: {
                selector: "#malmo-masthead"
            },
            css: {
                side: "bottom"
            }
        }, {
            title: "Search again",
            description: "The search functionality is vast. You can search for Malmö addresses or a place like Turning Torso, or Zlatans home.",
            bbox: {
                selector: "#smap-search-div"
            },
            css: {
                side: "bottom"
            }
        }, {
            title: "That's it",
            description: '<p>If you have questions, please contact stadsatlas@malmo.se</p><div id="smap-helper-done" class="smap-helper-button" style="font-size:1.5em;"><span>Done </span><i class="fa fa-check"></i></div>',
            noNav: !0,
            func: function() {
                var e = this;
                $("#smap-helper-done").on("click", function() {
                    return e.deactivate(),
                    !1
                })
            }
        }]
    },
    _lang: {
        sv: {
            btnLabel: "Hjälp"
        },
        en: {
            btnLabel: "Help"
        }
    },
    _setLang: function(e) {
        e = e || smap.config.langCode,
        this._lang && (this.lang = this._lang ? this._lang[e] : null )
    },
    initialize: function(e) {
        L.setOptions(this, e),
        this._setLang(e.langCode)
    },
    onAdd: function(e) {
        this.map = e,
        this._container = L.DomUtil.create("div", "leaflet-control-helper"),
        L.DomEvent.disableClickPropagation(this._container),
        this.$container = $(this._container),
        this._createBtn();
        var t = this;
        return this._refresh = function() {
            setTimeout(function() {
                t.refresh()
            }, 500)
        }
        ,
        this._container
    },
    onRemove: function() {},
    _createBtn: function() {
        var e = this;
        this.$btn = $('<button id="smap-helper-btn" title="' + e.lang.btnLabel + '" class="btn btn-default"><span class="fa fa-question"></span></button>'),
        this.$btn.on("touchend click", function() {
            return e.activate(),
            !1
        }),
        this.$container.append(this.$btn)
    },
    activate: function() {
        return this._active && this._active === !0 ? this.deactivate() : (this._active = !0,
        this._nbr = 0,
        this._prevNbr = 0,
        this._drawBasic(),
        this._bindEvents(),
        this.goToStep(1),
        $(this._bgCanvas).addClass("smap-helper-fadein"),
        void $(window).on("resize", this._refresh))
    },
    deactivate: function() {
        if (this._active === !1)
            return !1;
        this._active = !1;
        var e = this;
        this._$btnClose.remove(),
        this._$btnClose = null ,
        this._$clickTip.popover("destroy"),
        this._$clickTip.empty().remove(),
        this._$clickTip = null ,
        e._$stepContainer.empty().remove(),
        e._$stepContainer = null ,
        $(this._bgCanvas).removeClass("smap-helper-fadein"),
        setTimeout(function() {
            $(e._bgCanvas).remove(),
            e._bgCanvas = null 
        }, 300),
        $(window).off("resize", this._refresh),
        this._unbindEvents()
    },
    _unbindEvents: function() {
        $("body").off("keydown", this.onKeyDown)
    },
    _bindEvents: function() {
        var e = this;
        this._$clickTip.find(".smap-helper-button").on("tap click", function() {
            var t = $(this).index();
            switch (t) {
            case 0:
                e.goToPrevStep();
                break;
            case 1:
                e.goToNextStep()
            }
            return !1
        }),
        this.onKeyDown = function(t) {
            switch (t.which) {
            case 27:
                e.deactivate();
                break;
            case 37:
                e.goToPrevStep();
                break;
            case 38:
                e.goToPrevStep();
                break;
            case 39:
                e.goToNextStep();
                break;
            case 40:
                e.goToNextStep()
            }
            return !1
        }
        ,
        $("body").on("keydown", this.onKeyDown)
    },
    _drawBasic: function() {
        if (this._$stepContainer)
            return !1;
        var e = this;
        this._$btnClose = $('<div class="smap-helper-btnclose"><i class="fa fa-close"></i></div>'),
        $("#maindiv").append(this._$btnClose),
        this._$btnClose.on("tap click", function() {
            return e.deactivate(),
            !1
        }),
        this._$stepContainer = $('<div class="smap-helper-stepcont"><div class="smap-helper-steptitle"><span>The title</span></div><div class="smap-helper-stepdescription">The description</div></div>'),
        this._$clickTip = $('<div class="smap-helper-button-group smap-helper-clicktip"><div class="smap-helper-button smap-helper-button-icon-effect"><i class="fa fa-chevron-left"></i><span> Back</span></div><div class="smap-helper-button smap-helper-button-icon-effect"><span>Next </span><i class="fa fa-chevron-right"></i></div></div>'),
        $("#mapdiv").append(this._$clickTip);
        var t = '<canvas class="smap-helper-bgcanvas" />';
        $("#mapdiv").append(this._$stepContainer),
        $("body").append(t),
        this._bgCanvas = $(".smap-helper-bgcanvas")[0]
    },
    _drawCanvasHole: function(e) {
        var t = this._bgCanvas
          , 
        i = t.getContext("2d");
        i.clearRect(0, 0, t.width, t.height);
        var s = $(window).width()
          , 
        o = $(window).height();
        if (e) {
            var n = [];
            if (e instanceof Array)
                n = e;
            else if (e.selector) {
                var a = 15
                  , 
                r = e.selector
                  , 
                l = $(r)
                  , 
                c = l.offset()
                  , 
                p = 0
                  , 
                h = 0
                  , 
                d = 0
                  , 
                f = 0;
                n.push(c.left + p - a - d),
                n.push(c.top + h - a - f),
                n.push(c.left + l.width() + p + a - d),
                n.push(c.top + l.height() + h + a - d)
            }
            var b = n[0]
              , 
            u = n[1]
              , 
            v = n[2]
              , 
            m = n[3]
        }
        t.width = s,
        t.height = o,
        i.moveTo(0, 0),
        i.lineTo(s, 0),
        i.lineTo(s, o),
        i.lineTo(0, o),
        i.lineTo(0, 0),
        i.closePath(),
        e && (i.moveTo(b, u),
        i.lineTo(b, m),
        i.lineTo(v, m),
        i.lineTo(v, u),
        i.lineTo(b, u),
        i.closePath()),
        i.fillStyle = "rgba(0,0,0,0.5)",
        i.shadowColor = "rgba(0,0,0,1)",
        i.shadowBlur = 20,
        i.fill()
    },
    refresh: function() {
        this.goToStep(this._nbr)
    },
    goToStep: function(e) {
        var t = this;
        if (0 >= e)
            return !1;
        if (this._prevNbr = this._nbr,
        this._nbr = e,
        this._$clickTip.removeClass("smap-helper-fadein"),
        e > this.options.steps.length)
            return this.deactivate();
        var i = this.options.steps[e - 1]
          , 
        s = this._$stepContainer.find(".smap-helper-steptitle")
          , 
        o = this._$stepContainer.find(".smap-helper-stepdescription");
        s.find("span").empty().html(i.title),
        o.empty().html(i.description);
        var n;
        if (i.bbox && i.bbox.selector) {
            if (n = i.bbox.selector,
            i.breakPoint && $(window).width() <= i.breakPoint && (n = i.bbox.mobileSelector),
            n === !1)
                return this._prevNbr < this._nbr ? this.goToNextStep() : this.goToPrevStep();
            this._$stepContainer.css(i.css.standard ? i.css.standard : i.css),
            i.css.side && $(document).ready(function() {
                var e, t, s = i.css.side;
                i.bbox.breakPoint && i.css.mobileSide && $(window).width() <= i.bbox.breakPoint && (s = i.css.mobileSide),
                "top" === s ? (e = "bottom",
                t = s + "-20px") : "bottom" === s ? (e = "top",
                t = s + "+20px") : "left" === s ? (e = "right",
                t = s + "-20px") : "right" === s && (e = "left",
                t = s + "+20px"),
                $(".smap-helper-stepcont").position({
                    my: e,
                    at: t,
                    of: n,
                    collision: "fit flip"
                })
            })
        } else
            $(".smap-helper-stepcont").position({
                my: "center",
                at: "center",
                of: "#mapdiv",
                collision: "fit flip"
            });
        i.css && i.css.standard && this._$stepContainer.css(i.css.standard),
        this._drawCanvasHole({
            selector: n
        }),
        this._showHelperTimeout && clearTimeout(this._showHelperTimeout),
        i.noNav || ($(".smap-helper-clicktip").popover("destroy"),
        this._$clickTip.show(),
        this._nbr >= this.options.steps.length ? this._$clickTip.find(".smap-helper-button:eq(1)").hide() : this._$clickTip.find(".smap-helper-button").show(),
        this._showHelperTimeout = setTimeout(function() {
            t._$clickTip.addClass("smap-helper-fadein"),
            L.Browser.touch || t._helperPopoverShownOnce || (t._helperPopoverShownOnce = !0,
            $(".smap-helper-clicktip").popover({
                content: 'Tip! Use your keyboards\' arrow keys to navigate through the help section <i class="fa fa-caret-square-o-left"><i class="fa fa-caret-square-o-up"></i><i class="fa fa-caret-square-o-right"><i class="fa fa-caret-square-o-down"></i>',
                html: !0,
                placement: "top",
                trigger: "manual",
                container: ".maindiv"
            }).popover("show"),
            $(".smap-helper-clicktip").data("bs.popover").$tip.addClass("smap-helper-popover"))
        }, 950)),
        i.func && i.func.call(this)
    },
    goToPrevStep: function() {
        this.goToStep(this._nbr - 1)
    },
    goToNextStep: function() {
        this.goToStep(this._nbr + 1)
    }
});
L.Control.Info = L.Control.extend({
    options: {
        addToMenu: !1,
        autoActivate: !1,
        position: "bottomright",
	/*HU add*/
	logo: "",
	/*HU add*/
        _lang: {
            sv: {
                titleInfo: "",
                bodyContent: ''
            }
        }
    },
    _lang: {
        sv: {
            btntitle: "Om kartan",
            close: "Stäng"
        },
        en: {
            btntitle: "About Map",
            close: "Close"
        }
    },
    _setLang: function(t) {
        t = t || smap.config.langCode || navigator.language.split("-")[0] || "en",
        this._lang && (this.lang = this._lang ? this._lang[t] : null )
    },
    initialize: function(t) {
        L.setOptions(this, t),
        this.options._lang && $.extend(!0, this._lang, this.options._lang),
        this._setLang(t.langCode)
    },
    onAdd: function(t) {
        return this.map = t,
        this._container = L.DomUtil.create("div", "leaflet-control-info"),
        L.DomEvent.disableClickPropagation(this._container),
        this.$container = $(this._container),
        this._drawBtn(),
        this._container
    },
    onRemove: function() {},
    activate: function() {
        var that = this;
        var t = '<button type="button" class="btn btn-default" data-dismiss="modal">' + this.lang.close + "</button>";
	/*HU change*/
        /*var m = "resources/OmKartaModal.html";*/
	var m = '<div><div class="row"><div class="col-xs-12"><div style="clear:both"><a id="omkartalogo" href="http://www.kristianstad.se/"target="_blank" style="position:relative;display:block;height:62px"></a></div></div></div>' + this.lang.bodyContent + '</div><script>document.getElementById("omkartalogo").innerHTML = \'' + this.options.logo + '\'</script>';
        /*$.get(m, function(m) {*/
            if (!that._$dialog) {
                that._$dialog = utils.drawDialog(that.lang.titleInfo, m, t);
            }
            that._$dialog.modal("show")
	/* })*/
	/*HU change*/
    },
    _drawBtn: function() {
        var t = this;
        if (this.options.addToMenu)
            smap.cmd.addToolButton("", "fa fa-info", function() {
                return t.activate(),
                !1
            }, null );
        else {
            var a = $('<button id="smap-info-btn" title="' + t.lang.btntitle + '"  class="btn btn-default"><span class="fa fa-info"></span></button>');
            a.on("click", function() {
                return t.activate(),
                !1
            }),
            this.$container.append(a)
        }
    }
}),
L.control.info = function(t) {
    return new L.Control.Info(t)
}
;
L.Control.LayerSwitcher = L.Control.extend({
    options: {
        pxDesktop: 992,
        toggleSubLayersOnClick: !1,
        unfoldOnClick: !0,
        olFirst: !1,
        unfoldAll: !1,
        btnHide: !0,
        zoomToExtent: !1,
        catIconClass: "fa fa-chevron-right",
        /*Mohammad Add*/
        showBgLabel: !0,
        showBgLayer: !0,
        showOvLabel: !0,
        showOvLayer: !0,
        /*Mohammad Add*/
        getFitBoundsOptions: function() {
            var t = {
                paddingTopLeft: [0, 0]
            };
            return $(".lswitch-panel:visible").length && (t.paddingTopLeft[0] = 330),
            t
        }
    },
    _lang: {
        sv: {
            baselayers: "Bakgrundslager",
            overlays: "Kartlager",
            close: "Stäng",
            hide: "Göm",
            btnHideTooltip: "Göm lagerväljaren",
            btnShowTooltip: "Visa lagerväljaren",
            /*layerSwitcher: "Lagerväljare"*/
            /*HU change*/
            layerSwitcher: "",
            btnRemoveLgTooltip: "Släck alla kartlager"
        },
        en: {
            baselayers: "Baselayers",
            overlays: "Overlays",
            close: "Close",
            hide: "Hide",
            btnHideTooltip: "Hide layer switcher",
            btnShowTooltip: "Show layer switcher",
            layerSwitcher: "Layer switcher",
            btnRemoveLgTooltip: "Remove all overlays"
        }
    },
    showLayer: function(t) {
        return smap.core.layerInst.showLayer(t)
    },
    hideLayer: function(t) {
        smap.core.layerInst.hideLayer(t)
    },
    _setLang: function(t) {
        t = t || smap.config.langCode || navigator.language.split("-")[0] || "sv",
        this._lang && (this.lang = this._lang ? this._lang[t] : null )
    },
    initialize: function(t) {
        L.setOptions(this, t),
        this._setLang(t.lang)
    },
    onAdd: function(t) {
        function i(t) {
            var i = 0;
            $(t).on("touchstart", function(t) {
                i = this.scrollTop + t.originalEvent.touches[0].pageY
            }),
            $(t).on("touchmove", function(t) {
                this.scrollTop = i - t.originalEvent.touches[0].pageY
            })
        }
        this.map = t,
        this._container = L.DomUtil.create("div", "leaflet-control-LayerSwitcher"),
        L.DomEvent.disableClickPropagation(this._container),
        this.$container = $(this._container),
        this.__onRowTap = this.__onRowTap || $.proxy(this._onRowTap, this),
        this.__onHeaderClick = this.__onHeaderClick || $.proxy(this._onHeaderClick, this),
        this.__onHeaderIconClick = this.__onHeaderIconClick || $.proxy(this._onHeaderIconClick, this),
        this.__onBtnDialogClick = this.__onBtnDialogClick || $.proxy(this._onBtnDialogClick, this),
        this.__onLegendEnter = this.__onLegendEnter || $.proxy(this._onLegendEnter, this),
        this.__onLegendLeave = this.__onLegendLeave || $.proxy(this._onLegendLeave, this);
        var e = this;
        if (this._moveWithCursor = function(t) {
            $("body").find(".lswitch-legend-big").length || $("body").append(e._hoverImg),
            $(".lswitch-legend-big").css({
                left: t.pageX + 10 + "px",
                top: t.pageY - 30 + "px"
            })
        }
        ,
        this._addPanel(),
        this._addLayers(smap.config.bl, smap.config.ol),
        this.options.startOpened = !1,
        this.options.startOpened) {
            var s = $("#lswitch-olcont, #lswitch-blcont");
            1 === this.options.startOpened ? s.children(".lswitch-cat").click() : 2 === this.options.startOpened ? s.children(".lswitch-cat").next().find(".lswitch-cat").click() : this.options.startOpened === !0 && s.find(".lswitch-cat").click()
        }
        return this._addBtn(),
        this._bindEvents(),
        $("#mapdiv").addClass("lswitch-panelslide"),
        L.Browser.android && i($(".lswitch-panel")),
        this._container
    },
    onRemove: function() {},
    _addLayers: function(t, i) {
        t = t || [],
        i = i || [];
        var e;
        if (t.length > 1)
            for (var s = 0, n = t.length; n > s; s++)
                e = t[s],
                e.options.isBaseLayer = !0,
                this._addRow(e);
        else
            $(".lswitch-panel-bl").hide();
        if (i.length > 0)
            for (var s = 0, n = i.length; n > s; s++)
                e = i[s],
                e.options.isBaseLayer = !1,
                e.options.showInLayerSwitcher !== !1 && this._addRow(e);
        else
            $(".lswitch-panel-ol").hide();
        t.length <= 1 && 0 === i.length && $(".lswitch-panel span").css("color", "#fff"),
        this._setSwitcherPosition(),
        this.__setSwitcherPosition = this.__setSwitcherPosition || $.proxy(this._setSwitcherPosition, this),
        $(window).on("resize", this.__setSwitcherPosition)
    },
    _setSwitcherPosition: function() {
        var t = 0
          , 
        i = $(".lswitch-panel");
        i.children().each(function() {
            t += $(this).outerHeight()
        }),
        t > $("#mapdiv").innerHeight() - utils.rmPx(i.css("padding-top") + 20) ? i.css("position", "absolute") : i.css("position", "relative");
        var e = utils.getBrowser();
        e.ie && i.css("position", "absolute"),
        L.Browser.touch || e.ie && e.ieVersion <= 8 || this.hidePanel()
    },
    _bindEvents: function() {
        var t = this;
        $("#mapdiv").on("touchstart click", $.proxy(function() {
            return $(window).width() < this.options.pxDesktop ? (this.hidePanel(),
            !1) : void 0
        }, this));
        var i = ($.proxy(this.showPanel, this),
        $.proxy(this.hidePanel, this));
        L.Browser.touch && $(window).on("orientationchange", function() {
            t.$panel.is(":visible") && i()
        }),
        this.map.on("layeradd layerremove", function(i) {
            var e = i.layer || {};
            if (e.options && !e.options._silent && e.options.layerId && !e.feature) {
                var s = e.options.layerId
                  , 
                n = t._makeId(s)
                  , 
                o = $("#" + n)
                  , 
                a = o.hasClass("active");
                o.length && ("layeradd" === i.type && a === !1 ? t.onRowTap(o) : "layerremove" === i.type && a === !0 && t.onRowTap(o))
            }
        }),
        smap.event.on("smap.core.createparams", function(t, i) {
            var e = smap.core.paramInst.getParams();
            e.LSW && (i.lsw = e.LSW)
        });
        var e = function() {
            if ($(window).width() > t.options.pxDesktop)
                return !1;
            var i = smap.core.paramInst.getParams();
            i.LSW && 1 === parseInt(i.LSW) && setTimeout(function() {
                $("#lswitch-btn").trigger("mousedown")
            }, 310)
        }
        ;
        smap.event.on("smap.core.pluginsadded", e)
    },
    _addBtn: function() {
        /*Mohammad Change*/
        var t = $('<div id="lswitch-btn"><span class="fa fa-bars fa-2x"></span></div>');
        /*var t = $('<div id="lswitch-btn-upper"><div id="lswitch-btn"><span class="fa fa-bars fa-2x"></span></div> </div>');*/
        /*Mohammad Change*/
        $("#mapdiv").prepend(t),
        t.on("mousedown " + L.DomEvent._touchstart, $.proxy(function() {
            if (!this._panelIsSliding) {
                var t = $(".lswitch-panel").hasClass("panel-visible");
                t ? this.hidePanel() : this.showPanel()
            }
            return !1
        }, this)),
        t.on("dblclick", function() {
            return !1
        })
    },
    _addPanel: function() {
        function t(t, i) {
            t.tooltip("destroy"),
            $(".tooltip").remove(),
            t.prop("title", i),
            t.tooltip({
                placement: "right",
                text: i,
                container: "#maindiv"
            })
        }
        var i = this;
        /*if (this.$panel = $('<div  class="lswitch-panel unselectable" />'),*/
        if (this.$panel = $('<div id="lswitch-panel_unselectable" class="lswitch-panel unselectable" />'),
        this.$panel.on("swipeleft", $.proxy(function() {
            this.hidePanel()
        }, this)),
        this.$panel.on("touchstart", function() {
            $(this).css("overflow-y", "auto")
        }),
        
        /*Mohammad Change*/
        /*this.$list = $('<div class="panel panel-default lswitch-panel-bl"><div class="panel-heading"><span>' + this.lang.baselayers + '</span></div><div id="lswitch-blcont" class="list-group"></div></div><div class="panel panel-default lswitch-panel-ol"><div class="panel-heading"><span>' + this.lang.overlays + '</span></div><div id="lswitch-olcont" class="list-group"></div></div>'),*/
        this.$list = $('<div class="panel panel-default lswitch-panel-bl"><div id="background_label_id"  class="panel-heading"><span>' + this.lang.baselayers + '</span></div><div id="lswitch-blcont" class="list-group"></div></div><div class="panel panel-default lswitch-panel-ol"><div id="overlays_label_id" class="panel-heading"><span>' + this.lang.overlays + '</span></div><div id="lswitch-olcont" class="list-group"></div></div>'),
        /*Mohammad Change*/
        
        
        
        
        this.$panel.append(this.$list),
        this.options.olFirst && this.options.olFirst === !0 && this.$panel.prepend(this.$panel.find(".lswitch-panel-ol")),
        this.options.btnHide) {
            /*HU Change*/
            /*var e = $('<button title="' + this.lang.btnHideTooltip + '" type="button" class="lswitch-btnhide btn btn-default"><i class="fa fa-chevron-down"></i></button>');*/
            var e = $('<button title="' + this.lang.btnHideTooltip + '" type="button" class="lswitch-btnhide btn btn-default"><i class="fa fa-chevron-up"></i></button>')
              , 
            e1 = $('<button title="' + this.lang.btnRemoveLgTooltip + '" type="button" class="slack-alla-kartskikt btn btn-default"><i class="fa fa-times"></i></button>');
            
            /*HU Change*/
            this.$panel.find(".panel-heading:first").append(e),
            this.$panel.find(".panel-heading:first").append(e1),
            t(e, this.lang.btnHideTooltip),
            t(e1, this.lang.btnRemoveLgTooltip);
            var s = e.parent().text()
              , 
            n = !1;
            
            
            e.on("tap click", function() {
                var e = $(this);
                if (n)
                    return !1;
                var o = "fa-bars"
                  , 
                a = e.find("i");
                return a.hasClass(o) ? 
                
                (
                
                
                setTimeout(function() {
                    $(".lswitch-panel").removeClass("lswitch-displaynone"),
                    $('.slack-alla-kartskikt') !== "undefined" && $('.slack-alla-kartskikt') !== null  ? $('.slack-alla-kartskikt').length > 0 ? $('.slack-alla-kartskikt')[0].style.display = "table-cell" : "" : "",
                    
                    e.prev().text(s),
                    $("#overlays_label_id>button").removeClass("lswitch-btnshow"),
                    $("#overlays_label_id>button").addClass("lswitch-btnhide"),
                    a.removeClass(o),
                    a.addClass("fa-chevron-up"),
                    
                    $(".lswitch-panel").removeClass("lswitch-hidden")
                
                }, 1),
                t(e, i.lang.btnHideTooltip)
                
                ) : (
                
                n = !0,
                a.removeClass("fa-chevron-up"),
                a.addClass(o),
                $('.slack-alla-kartskikt') !== "undefined" && $('.slack-alla-kartskikt') !== null  ? $('.slack-alla-kartskikt').length > 0 ? $('.slack-alla-kartskikt')[0].style.display = "none" : "" : "",
                
                $(".lswitch-panel").addClass("lswitch-hidden"),
                $("#overlays_label_id>button").removeClass("lswitch-btnhide"),
                $("#overlays_label_id>button").addClass("lswitch-btnshow"),
                t(e, i.lang.btnShowTooltip),
                e.prev().text(i.lang.layerSwitcher),
                
                setTimeout(function() {
                    $(".lswitch-panel").addClass("lswitch-displaynone"),
                    n = !1
                }, 200)
                
                ),
                
                !1
            
            
            });
            e1.on("tap click", function() {
                smap.cmd.removeAllMapLayer();
            })
        }
        $("#maindiv").append(this.$panel);
        /*Mohammad Add*/
        if (typeof this.options.showOvLabel !== "undefined" && this.options.showOvLabel !== null ) {
            if (!this.options.showOvLabel) {
                this.$list.find('#overlays_label_id')[0].style.display = "none";
            }
        }
        ;
        if (typeof this.options.showOvLayer !== "undefined" && this.options.showOvLayer !== null ) {
            if (!this.options.showOvLayer) {
                this.$list.find('#lswitch-olcont')[0].style.display = "none";
            }
        }
        ;
        if (typeof this.options.showBgLabel !== "undefined" && this.options.showBgLabel !== null ) {
            if (!this.options.showBgLabel) {
                this.$list.find('#background_label_id')[0].style.display = "none";
            }
        }
        ;
        if (typeof this.options.showBgLayer !== "undefined" && this.options.showBgLayer !== null ) {
            if (!this.options.showBgLayer) {
                this.$list.find('#lswitch-blcont')[0].style.display = "none";
            }
        }
        ;
        
        $("#mapdiv").on('touchstart click', $.proxy(function() {
            if (L.Browser.touch) {
                if ($('.lswitch-btnhide.btn.btn-default')) {
                    
                    /*HU Change*/
                    /*if($('.fa.fa-chevron-down.rotate-90').length===0){*/
                    if ($('.fa.fa-chevron-up').length === 1) {
                        /*HU Change*/
                        var clientWidnowSize = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                        
                        if (clientWidnowSize <= 767) {
                            e.tap()
                        }
                    
                    }
                }
            }
        }, e))
        /*Mohammad Add*/
    },
    showPanel: function() {
        var t = this;
        if (this.$panel.show(),
        this._panelIsSliding)
            return !1;
        this._panelIsSliding = !0,
        $("#lswitch-btn span").removeClass("fa-bars").addClass("fa-chevron-left"),
        setTimeout(function() {
            $(".lswitch-panel").addClass("panel-visible")
        }, 1),
        setTimeout(function() {
            t._panelIsSliding = !1
        }, 300),
        $("#mapdiv").addClass("mapdiv-slidetransition"),
        $("#maindiv").addClass("lswitcher-slidetransition");
        var i = this.$panel.outerWidth();
        /**    $("#mapdiv").css({
                    "margin-left": i + "px",
                    width: $("#mapdiv").outerWidth() - i + "px"
                });*/
        $("#lswitch-btn").css({
            "left": $(".lswitch-panel").outerWidth() - 3 + "px"
        });
        
        
        
        /*Mohammad Add*/
        /*if(this.options.logoShowHideEnable){if(document.getElementById('kristianstad_logo_id')){document.getElementById('kristianstad_logo_id').style.display="none";}}*/
        /*Mohammad*/
    },
    hidePanel: function() {
        /*Mohammad Add*/
        /*if(this.options.logoShowHideEnable){if(document.getElementById('kristianstad_logo_id')){document.getElementById('kristianstad_logo_id').style.display="block";}}*/
        /*Mohammad*/
        return this._panelIsSliding ? !1 : (this._panelIsSliding = !0,
        $("#lswitch-btn span").removeClass("fa-chevron-left").addClass("fa-bars"),
        /**    $("#mapdiv").css({
                        "margin-left": "0",
                        width: "100%"
                    }),*/
        $("#lswitch-btn").css({
            "left": "0"
        }),
        $(".lswitch-panel").removeClass("panel-visible"),
        $("#maindiv").addClass("lswitch-overflow-hidden"),
        $("#maindiv").removeClass("lswitcher-slidetransition"),
        void setTimeout($.proxy(function() {
            $("#mapdiv").removeClass("mapdiv-slidetransition"),
            this._panelIsSliding = !1,
            this.$panel.hide(),
            $("#maindiv").removeClass("lswitch-overflow-hidden")
        }, this), 300));
    
    },
    
    _setBaseLayer: function(t) {
        var i, e = this.map._layers;
        for (var s in e)
            i = e[s],
            i && i.options && i.options.isBaseLayer && (typeof i.options.isMultipleBaseLayer === "undefined" || i.options.isMultipleBaseLayer === null  && i.options.isMultipleBaseLayer !== !0) && i.options.layerId !== t && this.hideLayer(i.options.layerId);
        this.showLayer(t)
    },
    
    _onLegendClick: function() {
        return $(this).parent().trigger("tap"),
        !1
    },
    _onRowTap: function(t) {
        var i = $(t.target);
        return i.hasClass("list-group-item") ? (this.onRowTap(i),
        !1) : void 0
    },
    onRowTap: function(t) {
        var i = t.attr("id")
          , 
        e = this._unMakeId(i)
          , 
        s = $("#" + i).parents("#lswitch-blcont").length > 0;
        if (s)
            return $("#lswitch-blcont").find("a.active").removeClass("active"),
            t.addClass("active"),
            this._setBaseLayer(e),
            !1;
        t.toggleClass("active");
        var n = t.hasClass("active")
          , 
        o = t.parents(".lswitch-catcont");
        o.each(function() {
            if (n)
                $(this).prev().addClass("active");
            else {
                if ($(this).find("a.list-group-item.active").length > 0)
                    return !1;
                $(this).prev().removeClass("active")
            }
        });
        var a, n = t.hasClass("active");
        if (n) {
            var l = t.data("t") || null ;
            a = this.showLayer(l || e);
            var r = this.options.getFitBoundsOptions ? this.options.getFitBoundsOptions() : null ;
            (this.options.zoomToExtent || l && l.options && l.options.zoomToExtent) && !this._sumBounds && a.getBounds && ($.isEmptyObject(a._layers) ? a.once("load", function(t) {
                t.layer._map.fitBounds(a.getBounds(), r)
            }) : this.map.fitBounds(a.getBounds(), r))
        } else
            this.map.closePopup(),
            a = this.hideLayer(e);
        return a
    },
    _makeId: function(t) {
        return "lswitchrow-" + encodeURIComponent(t).replace(/%/g, "--pr--")
    },
    _unMakeId: function(t) {
        return decodeURIComponent(t.replace("lswitchrow-", "").replace(/--pr--/g, "%"))
    },
    _toggleHeader: function(t) {
        t.next().toggleClass("lswitch-catcont-visible"),
        t.toggleClass("open")
    
    },
    _onHeaderClick: function(t, i) {
        i = i || {};
        var e = this
          , 
        s = t.target;
        s = "A" === s.tagName || "SPAN" === s.tagName ? $(s).parent() : $(s);
        var n = s.next();
        if (!this.options.unfoldOnClick || !this.options.unfoldAll && i.isSubHeader || this._toggleHeader(s),
        !this.options.toggleSubLayersOnClick && this.options.unfoldOnClick && this.options.unfoldAll && n.find("div.list-group-item").each(function() {
            h = $(this);
            var t = s.hasClass("open")
              , 
            i = h.hasClass("open");
            t !== i && e._toggleHeader(h)
        }),
        this.options.toggleSubLayersOnClick && 0 === s.parents("#lswitch-blcont").length) {
            var o, a, l = s.hasClass("active"), 
            r = s.hasClass("open");
            this.options.unfoldOnClick && r === l && !i.isSubHeader ? l = !l : s.toggleClass("active");
            var d, c;
            this._sumBounds = null ,
            !this.options.zoomToExtent || l || this._sumBounds || (d = $.Deferred(),
            d.done(function() {
                e._sumBounds.isValid() && e.map.fitBounds(e._sumBounds, e.options.getFitBoundsOptions ? e.options.getFitBoundsOptions() : null ),
                e._rowCount = null ,
                e._sumBounds = null 
            }),
            this._rowCount = this._rowCount || n.find("a.list-group-item").length,
            this._sumBounds = L.latLngBounds([]),
            c = function(t, i) {
                this._rowCount -= 1,
                this._sumBounds.extend(t.getBounds()),
                0 === this._rowCount && i.resolve()
            }
            ),
            n.children(".list-group-item").each(function() {
                if (a = $(this),
                o = a.hasClass("active"),
                "A" === a[0].tagName && l === o) {
                    var t = e.onRowTap(a);
                    e._sumBounds && t.getBounds && ($.isEmptyObject(t._layers) === !0 ? t.once("load", function() {
                        c.call(e, t, d)
                    }) : c.call(e, t, d))
                } else
                    "DIV" === a[0].tagName && l === o && e._onHeaderClick({
                        target: a
                    }, {
                        isSubHeader: !0
                    })
            })
        }
        
        
        return $(window).width() > this.options.pxDesktop ? this._setSwitcherPosition() : $(".lswitch-panel").css("position", "absolute"),
        !1
    
    },
    _onHeaderIconClick: function(t) {
        var i = $(t.target);
        return this._toggleHeader(i.parent()),
        !1
    },
    _onBtnDialogClick: function(t) {
        var i = $(t.target).parents(".list-group-item:first").data("t").options
          , 
        e = ""
          , 
        s = i.dialog;
        ("http" === s.substring(0, 4) || "//" === s.substring(0, 2)) && (e = '<div class="modal-body-container"><iframe frameborder="0" scrolling="auto" src="' + s + '" width="100%" height="100%" style="position:absolute;left:0;top:0;margin:0;padding:0;" frameborder="0"></iframe></div>');
        var n = '<button type="button" class="btn btn-default" data-dismiss="modal">' + this.lang.close + "</button>"
          , 
        o = utils.drawDialog(i.displayName, e, n, {});
        o.addClass("lswitch-dialog"),
        o.modal("show");
        var a = $("#mapdiv").height();
        return a = a > 500 ? 500 : a,
        o.find(".modal-body").css({
            "min-height": a + "px"
        }),
        o.on("hidden.bs.modal", function() {
            $(this).empty().remove()
        }),
        !1
    },
    _addBtnDialog: function(t) {
        var i = $('<span class="fa fa-info-circle lswitch-btndialog" aria-hidden="true"></span>');
        i.on("click touchstart", this.__onBtnDialogClick),
        t.prepend(i)
    },
    _addLegend: function(t, i, o) {
        var e = $('<img class="lswitch-legend" src="' + i + '" />');
        /*Mobile*/
        if (this.options.layerInfoConfig) {
            if (L.Browser.touch) {
                /*var k = $('<div class="layer-info-btn-touch"><span class="glyphicon glyphicon-info-sign"  /></div>');	*/
                var k = $('<div class="layer-info-btn"><span class="glyphicon glyphicon-info-sign"  /></div>');
                /*HU Change*/
            } else {
                var k = $('<div class="layer-info-btn"><span class="glyphicon glyphicon-info-sign"  /></div>');
            }
            
            o.options.layerInfoConfig = this.options.layerInfoConfig;
            k.on('tap', $.proxy(function(e) {
                e.preventDefault();
                if (o.options) {
                    
                    var bodyCondent = "";
                    for (col in o.options.layerInfoConfig) {
                        
                        var columnNmae = this.options.layerInfoConfig[col]
                          , 
                        columnValue = (function() {
                            if (o.options[col]) {
                                return o.options[col]
                            } else {
                                return "";
                            }
                        })();
                        
                        if (col === "legend") {                           							
							//bodyCondent = bodyCondent + '<div class="row"> <div class="col-xs-12 col-sm-6"><b>' + columnNmae + ':</b></div> <div  class="col-xs-12 col-sm-6"><img style="max-width:160px;" class="" src="' + columnValue + '" /> </div> </div>';
                        	bodyCondent =bodyCondent + '<div id="postProcessLegendContent" class="row">  </div>';
							var img = new Image();img.columnNmae=columnNmae,img.columnValue=columnValue,img.src=columnValue,window.image_content="";
							img.onload=function(){
								if(this.width < 300){
								 window.image_content =  $(' <div class="col-xs-12 col-sm-6"><b>' + this.columnNmae + ':</b></div> <div  class="col-xs-12 col-sm-6"><img style="max-width:85%;" class="" src="' + this.columnValue + '" /> </div> ');	
								}else{
								 window.image_content = $(' <div class="col-xs-12"><b>' + this.columnNmae + ':</b></div> <div  class="col-xs-12"><img class="layerInfoLegend" src="' + this.columnValue + '" /> </div>');
								}							 
								
							}
						} else if (col === "link") {
                            if (columnValue.length > 0) {
                                bodyCondent = bodyCondent + '<div class="row"> <div class="col-xs-12 col-sm-6"><b>' + columnNmae + ':</b></div> <div  class="col-xs-12 col-sm-6"><a href=' + columnValue + ' target="_blank">Mer information</a></div> </div>';
                            } else {
                                bodyCondent = bodyCondent + '<div class="row"> <div class="col-xs-12 col-sm-6"><b>' + columnNmae + ':</b></div> <div  class="col-xs-12 col-sm-6"></div> </div>';
                            }
                        } else if (col === "attribution") {
                            bodyCondent = bodyCondent + '<div class="row"> <div class="col-xs-12 col-sm-12">' + columnValue + '</div></div>';
                        } else {
                            bodyCondent = bodyCondent + '<div class="row"> <div class="col-xs-12 col-sm-6"><b>' + columnNmae + ':</b></div> <div  class="col-xs-12 col-sm-6">' + columnValue + '</div> </div>';
                        }
                    }
                    
                    
                    var e = '<button type="button" class="btn btn-default" data-dismiss="modal">Stäng</button>';
                    
                    var lgInfoDig = utils.drawDialog("Information för " + o.options.displayName, bodyCondent, e, null );
                    lgInfoDig.modal("show");
                    lgInfoDig.on('hidden.bs.modal', function() {
                        document.body.removeChild(this);
                    });
					
					lgInfoDig.on('shown.bs.modal', function() {
						if(window.image_content){
							if($('#postProcessLegendContent')){
								$('#postProcessLegendContent').append(window.image_content);
							}
							
						}
                         
                    });
                
                }
            }, o))
        
        
        
        
        }
        
        /*e.on("tap", this._onLegendClick).on("mouseenter", this.__onLegendEnter).on("mouseleave", this.__onLegendLeave),*/
        e.on("tap", this._onLegendClick),
        !L.Browser.touch ? e.on("mouseenter", this.__onLegendEnter) : "",
        !L.Browser.touch ? e.on("mouseleave", this.__onLegendLeave) : "";
        
        t.prepend(e);
        if (this.options.layerInfoConfig) {
            t.prepend(k);
        }
        /*Mobile*/
    
    
    },
    _onLegendLeave: function() {
        $(".lswitch-legend-big").remove(),
        $(document).off("mousemove", this._moveWithCursor)
    },
    _onLegendEnter: function(t) {
        var i = $(t.target)
          , 
        e = i.parent().data("t")
          , 
        s = e.options.legendBig || e.options.legend;
        $(".lswitch-legend-big").remove(),
        delete this._hoverImg;
        var n = $('<img class="lswitch-legend-big" src="' + s + '" />');
        this._hoverImg = n,
        $(document).on("mousemove", this._moveWithCursor)
    },
    _addRow: function(t) {
        function i(t, n, a) {
            return h = t[n],
            l = a.find('.lswitch-cat:has(span:contains("' + h + '"))'),
            l.length ? r = l.next() : (l = $('<div class="list-group-item lswitch-cat"><i class="' + e + '"></i><span>' + h + "</span></div>").appendTo(a),
            r = $('<div class="lswitch-catcont"></div>'),
            l.after(r),
            l.on("tap", s.__onHeaderClick),
            l.find("i").on("tap", s.__onHeaderIconClick)),
            t.length > n + 1 ? i(t, n + 1, r) : (r.append(o),
            !0)
        }
        var e = this.options.catIconClass
          , 
        s = this
          , 
        n = t.options
        /*, o = $('<a class="list-group-item"><div class="displayname-div-lvl1"><div class="displayname-div-lvl2">' + n.displayName + "</div></div></a>");
        o.attr("id", this._makeId(n.layerId)),
        o.on("tap", this.__onRowTap),
        o.data("t", t),*/
          
        , 
        o = $('<a class="list-group-item"></a>')
          , 
        oo = $('<div class="displayname-div-lvl1"></div>')
          , 
        ooo = $('<div class="displayname-div-lvl2">' + n.displayName + '</div>');
        oo.append(ooo),
        o.append(oo),
        o.attr("id", this._makeId(n.layerId)),
        o.on("tap", this.__onRowTap),
        ooo.on("tap", $.proxy(function(e) {
            o.tap();
            e.preventDefault();
        }, o)),
        o.data("t", t),
        /* Mobile
                !n.legend || L.Browser.touch && $(window).width() < this.options.pxDesktop || this._addLegend(o, n.legend),*/
        !n.legend && $(window).width() < this.options.pxDesktop || this._addLegend(o, n.legend, t),
        n.dialog && this._addBtnDialog(o, t);
        var a;
        if (n.isBaseLayer ? (a = $("#lswitch-blcont"),
        a.is(":visible") || $(".lswitch-panel-bl").show()) : (a = $("#lswitch-olcont"),
        a.is(":visible") || $(".lswitch-panel-ol").show()),
        n.category) {
            var l, r, h, d = n.category;
            i(d, 0, a)
        } else
            a.append(o);
        return o
    }
}),
L.control.layerSwitcher = function(t) {
    return new L.Control.LayerSwitcher(t)
}
;
L.Control.MMP = L.Control.extend({
    options: {
        position: "bottomright",
        wsSave: location.protocol + "//gkkundservice.test.malmo.se/KartService.svc/saveGeometry"
    },
    _lang: {
        sv: {
            btnLabel: "Spara",
            clickHereToSave: "Klicka här för att spara positionen",
            dragInfo: '<div style="font-size:1.2em;"><strong style="font-size:1.3em;">Instruktioner</strong><ol style="margin:0;padding-left:1.65em;margin-top:0.5em;"><li>Zooma in i kartan så mycket som möjligt</li><li>Klicka i kartan för att markera platsen för ärendet<br />(pekskärm: peka och håll kvar fingret på en plats)</li></ol></div>',
            youCanDragMeOrClick: "<strong>Klicka i kartan</strong> igen eller <strong>dra i markören</strong> för att ändra positionen",
            btnSave: "Bekräfta position",
            zoomInMore: "Du måste zooma in mer i kartan för att kunna lägga till markör"
        },
        en: {
            btnLabel: "Save",
            clickHereToSave: "Click here to save new position",
            dragInfo: "<h1>Instructions</h1><ol><li>Zoom the map as much as possible</li><li>Then click once in the map to set the location of the incident</li></ol>",
            youCanDragMeOrClick: "Click on the map again or drag the marker to adjust the location",
            btnSave: "Confirm position",
            zoomInMore: "You must zoom the map more before you can add a marker"
        }
    },
    _setLang: function(t) {
        t = t || smap.config.langCode,
        this._lang && (this.lang = this._lang ? this._lang[t] : null )
    },
    initialize: function(t) {
        L.setOptions(this, t),
        this._setLang(t.langCode)
    },
    onAdd: function(t) {
        return this.map = t,
        this._container = L.DomUtil.create("div", "leaflet-control-mmp"),
        L.DomEvent.disableClickPropagation(this._container),
        this.$container = $(this._container),
        this._bindEvents(),
        this._mmpExternalLayers = [],
        this._container
    },
    onRemove: function() {
        this._unbindEvents(),
        this.$btn.empty().remove(),
        this._mmpExternalLayers = null 
    },
    activateAddMarker: function() {
        this._editingIsActive = !0,
        this._createBtn();
        var t;
        t = L.Browser.touch ? "contextmenu" : "click",
        this.map.on(t, this.onMapClick, this)
    },
    deactivateAddMarker: function() {
        this._editingIsActive = !1;
        var t;
        t = L.Browser.touch ? "contextmenu" : "click",
        this.map.off(t, this.onMapClick),
        $("#smap-mmp-btn").empty().remove(),
        this.$btn = null 
    },
    onMapClick: function(t) {
        return this.map.getZoom() < this.options.minZoom ? void smap.cmd.notify(this.lang.zoomInMore, "error", {
            fadeOut: 5e3
        }) : (this._marker && (this.map.removeLayer(this._marker),
        this._marker = null ),
        void this._addMarker(t.latlng))
    },
    onHashChange: function() {
        var t = location.hash.substring(1)
          , 
        e = utils.paramsStringToObject(t, !0);
        if (e && e.MMP_DATA) {
            var a = e.MMP_DATA;
            a = decodeURIComponent(a),
            this._counterLayerId = this._counterLayerId || 0,
            this._clearExternalData(),
            this._counterLayerId += 1,
            this._addExternalData(a, {
                layerId: "mmp-extlayer-" + this._counterLayerId
            })
        }
    },
    _bindEvents: function() {
        var t = this;
        smap.event.on("smap.core.beforeapplyparams", function(t, e) {
            var a = e.OL || "";
            a = a.split(","),
            a.push(e.CATEGORY),
            a = a.join(","),
            e.OL = a
        }),
        smap.event.on("smap.core.applyparams", function(e, a) {
            a.MMP_EDIT && "TRUE" === a.MMP_EDIT.toUpperCase() && t.activateAddMarker();
            var n = null 
              , 
            i = null ;
            if (a.MMP_XY) {
                var n = a.MMP_XY instanceof Array ? a.MMP_XY : a.MMP_XY.split(",");
                n = $.map(n, function(t) {
                    return parseFloat(t)
                }),
                i = utils.projectLatLng(L.latLng(n), "EPSG:3008", "EPSG:4326", !0, !1)
            } else
                this._editingIsActive && smap.cmd.notify(t.lang.dragInfo, "info");
            a.MMP_ID && (t._tempId = a.MMP_ID),
            i && t._addMarker(i),
            t.onHashChange()
        }),
        this._onHashChange = $.proxy(this.onHashChange, this),
        $(window).on("hashchange", this._onHashChange)
    },
    _clearExternalData: function() {
        for (var t = this._mmpExternalLayers, e = 0; e < t.length; e++)
            smap.cmd.hideLayer(t[e]);
        this._mmpExternalLayers = []
    },
    _addExternalData: function(t, e) {
        e = e || {};
        var a, n = L.AwesomeMarkers.icon({
            icon: "warning",
            markerColor: "black",
            prefix: "fa"
        }), 
        i = {
            url: t,
            init: "L.GeoJSON.WFS",
            options: $.extend(!0, {
                layerId: L.stamp(this),
                displayName: "Incidenter",
                xhrType: "GET",
                attribution: "Malmö stad",
                inputCrs: "EPSG:3008",
                uniqueKey: "arendeId",
                selectable: !0,
                reverseAxis: !1,
                showInLayerSwitcher: !0,
                reverseAxisBbox: !0,
                geomType: "POINT",
                includeParams: ["bbox"],
                separator: "&",
                popup: "*",
                style: {
                    icon: n
                }
            }, e)
        }, 
        r = smap.cmd.getControl("LayerSwitcher");
        if (r) {
            var o = r._addRow(i);
            o.trigger("tap"),
            a = smap.cmd.getLayer(i.layerId)
        } else
            a = smap.cmd.addLayerWithConfig(i);
        this._mmpExternalLayers.push(a)
    },
    _unbindEvents: function() {
        this.map.off("click", this.onMapClick)
    },
    _adaptUrl: function(t) {
        return "localhost" === document.domain ? t = t.replace("gkkundservice.test.malmo.se", "localhost").replace("kartor.malmo.se", "localhost") : "kartor.malmo.se" === document.domain && (t = t.replace("gkkundservice.test.malmo.se/", "kartor.malmo.se/gkkundservicedev/").replace("gkkundservice.malmo.se/", "kartor.malmo.se/gkkundservicedev/")),
        t
    },
    _save: function(t) {
        var e = this.options.wsSave;
        e = this._adaptUrl(e),
        smap.cmd.loading(!0),
        $.ajax({
            url: e,
            type: "GET",
            data: t,
            context: this,
            dataType: "json",
            success: function(t) {
                t.success && JSON.parse(t.success)
            },
            error: function() {},
            complete: function() {
                smap.cmd.loading(!1)
            }
        })
    },
    save: function() {
        var t = utils.projectPoint(this._latLng.lng, this._latLng.lat, "EPSG:4326", "EPSG:3008")
          , 
        e = t[0]
          , 
        a = t[1];
        this._save({
            easting: parseInt(e),
            northing: parseInt(a),
            tempId: this._tempId || null 
        })
    },
    _createBtn: function() {
        var t = this;
        this.$btn = $('<button id="smap-mmp-btn" class="btn btn-primary btn-lg hidden"><span class="fa fa-check"></span> ' + this.lang.btnSave + "</button>"),
        this.$btn.on("click", function(e) {
            return e.stopPropagation(),
            t.save(),
            !1
        }),
        $("#mapdiv").append(this.$btn)
    },
    _addMarker: function(t) {
        var e = this;
        t && (this._latLng = t);
        var a = L.AwesomeMarkers.icon({
            icon: this._editingIsActive ? "arrows" : "lock",
            markerColor: "darkred",
            prefix: "fa",
            extraClasses: "mmpmarker"
        })
          , 
        n = L.marker(t, {
            draggable: this._editingIsActive || !1,
            icon: a,
            zIndexOffset: 999
        });
        n.on("dragstart", function(t) {
            t.target.closePopup()
        }),
        n.on("dragend", function(t) {
            e._latLng = t.target.getLatLng()
        }),
        this.map.addLayer(n),
        n.openPopup(),
        this._marker = n,
        this.$btn && (this.$btn.removeClass("hidden"),
        $(".alert").remove())
    }
});
L.Control.Add2HomeScreen = L.Control.extend({
    options: {},
    initialize: function(n) {
        L.setOptions(this, n),
        $("body").append('<script src="lib/add-to-homescreen/src/addtohomescreen.js"></script>')
    },
    onAdd: function(n) {
        return this.map = n,
        this._container = L.DomUtil.create("div", "leaflet-control-add2HomeScreen"),
        L.DomEvent.disableClickPropagation(this._container),
        this.$container = $(this._container),
        this._container
    },
    onRemove: function() {}
}),
L.control.add2HomeScreen = function(n) {
    return new L.Control.Add2HomeScreen(n)
}
;
L.Control.Mapillary = L.Control.extend({
    options: {
        position: "bottomright"
    },
    _lang: {
        sv: {
            exampleLabel: "Ett exempel"
        },
        en: {
            exampleLabel: "An example"
        }
    },
    _setLang: function(t) {
        t = t || smap.config.langCode,
        this._lang && (this.lang = this._lang ? this._lang[t] : null )
    },
    initialize: function(t) {
        L.setOptions(this, t),
        this._setLang(t.langCode)
    },
    onAdd: function(t) {
        return this.map = t,
        this._container = L.DomUtil.create("div", "leaflet-control-mapillary"),
        L.DomEvent.disableClickPropagation(this._container),
        this.$container = $(this._container),
        this._createBtn(),
        this._container
    },
    onRemove: function() {},
    _createBtn: function() {
        var t = this;
        this.$btn = $('<button id="smap-mapillary-btn" title="' + t.lang.exampleLabel + '" class="btn btn-default"><span class="fa fa-expand"></span></button>'),
        this.$btn.on("click", function() {
            return t.activate(),
            !1
        }),
        this.$container.append(this.$btn)
    }
});




L.Control.MeasureDraw = L.Control.extend({
    options: {
        position: "topright",
        saveMode: "url",
        saveWfsUrl: "",
        saveWfsTypeName: "",
        layerName: "measurelayer",
        moreCoordsAsModal: !0,
        touchShowButtonAsDisabled: !0,
        stylePolygon: {
            color: "#0077e2",
            weight: 3
        },
        stylePolyline: {
            color: "#0077e2",
            weight: 9
        }
    },
    _lang: {
        sv: {
            btnDisabledBecauseTouch: "Rita & Mät stödjer inte din nuvarande enhet",
            close: "Stäng",
            drawTools: "Ritverktyg",
            draggableMarker: "Markören är dragbar",
            btnTitle: "Rita & Mät",
            drawPoint: "Punkt/Koordinater",
            drawLine: "Linje",
            drawPolygon: "Yta",
            drawCircle: "Cirkel",
            drawRectangle: "Rektangel",
            circumference: "Omkrets",
            radius: "Radie",
            area: "Area",
            len: "Längd",
            lenPart: "Sidlängd",
            easting: "Easting (x/longitud)",
            northing: "Northing (y/latitud)",
            clickToAddText: "Klicka för att lägga till text (stäng pratbubblan för att spara)",
            showMeasures: "Visa mätresultat",
            remove: "Ta bort",
            moreCoords: "Fler koordinatsystem",
            helpTextSavePopup: "Stäng pratbubblan för att spara",
            handlers: {
                circle: {
                    tooltip: {
                        start: "Klicka och dra för att rita cirkel."
                    }
                },
                marker: {
                    tooltip: {
                        start: "Klicka i kartan för att placera markör."
                    }
                },
                polygon: {
                    tooltip: {
                        start: "Klicka för att påbörja yta",
                        cont: "Klicka igen för att fortsätta rita ytan.",
                        end: "Dubbelklicka eller klicka första punkten för att avsluta ytan."
                    }
                },
                polyline: {
                    error: "<strong>Error:</strong> linjers kanter kan inte korsa varandra!",
                    tooltip: {
                        start: "Klicka för att påbörja linje.",
                        cont: "Klicka för att fortsätta linje.",
                        end: "Dubbelklicka för att avsluta linje."
                    }
                },
                rectangle: {
                    tooltip: {
                        start: "Klicka och dra för att rita rektangel."
                    }
                },
                simpleshape: {
                    tooltip: {
                        end: "Släpp musknappen för att avsluta."
                    }
                }
            }
        },
        en: {
            btnDisabledBecauseTouch: "Draw & Measure is not supported on your device",
            close: "Close",
            drawTools: "Draw tools",
            draggableMarker: "The marker is draggable",
            btnTitle: "Draw & Measure",
            drawPoint: "Point/Coordinates",
            drawLine: "Line",
            drawPolygon: "Area",
            drawCircle: "Circle",
            drawRectangle: "Rectangle",
            circumference: "Circumference",
            radius: "Radius",
            area: "Area",
            len: "Length",
            easting: "Easting (x/longitude)",
            northing: "Northing (y/latitude)",
            clickToAddText: "Click to add text",
            showMeasures: "Show measure results",
            remove: "Remove",
            moreCoords: "More projections",
            helpTextSavePopup: "Close the popup to save"
        }
    },
    _setLang: function(e) {
        e = e || smap.config.langCode,
        this._lang && (this.lang = this._lang ? this._lang[e] : null )
    },
    initialize: function(e) {
        L.setOptions(this, e),
        this._setLang(e.langCode),
        this._tools = {},
        this._setLabels()
    },
    _jsonCompressDict: {
        '"FeatureCollection":': ":fc:",
        '"Feature"': ":F:",
        '"Point"': ":P:",
        '"features":': ":fs:",
        '"type":': ":t:",
        '"geometry":': ":g:",
        '"coordinates":': ":c:",
        '"properties":': ":p",
        '"measure_form"': ":m:",
        '"measure_text"': ":mt:"
    },
    _compressJson: function(e) {
        var t, a = this._jsonCompressDict;
        for (var r in a)
            t = new RegExp(r,"g"),
            e = e.replace(t, a[r]);
        return e
    },
    _uncompressJson: function(e) {
        var t, a = this._jsonCompressDict;
        for (var r in a)
            t = new RegExp(a[r],"g"),
            e = e.replace(t, r);
        return e
    },
    onAdd: function(e) {
        this.map = e,
        this._container = L.DomUtil.create("div", "leaflet-control-measuredraw"),
        L.DomEvent.disableClickPropagation(this._container),
        this.$container = $(this._container),
        this._proxyListeners(),
        this._initDraw();
        var t = L.Browser.touch && this.options.touchShowButtonAsDisabled;
        
        if (!L.Browser.touch || t) {
			var a = this._createBtn();
            t ? (a.prop("disabled", !0),
            a.prop("title", this.lang.btnDisabledBecauseTouch),
            a.tooltip({
                placement: "bottom"
            })) : smap.event.on("smap.core.pluginsadded", function() {
                $(".leaflet-control-measuredraw .dropdown-toggle").dropdown()
            })
        }
        var r = this;
        return this.map.on("layeradd", function() {
            r._layer.bringToFront(),
            r._layer.setZIndex(1e4),
            r._layer.eachLayer(function(e) {
                e.options.selectable = !0,
                e.options.clickable = !1,
                e.bringToFront && e.bringToFront(),
                e.setZIndex && e.setZIndex(1e4)
            })
        }),
        smap.event.on("smap.core.createparams", $.proxy(this._onCreateParams, this)),
        smap.event.on("smap.core.applyparams", $.proxy(this._onApplyParams, this)),
        this._container
    },
    _onCreateParams: function(e, t) {
        function a(e) {
            for (var t, r = 0, o = e.length; o > r; r++)
                t = e[r],
                t instanceof Array ? a(t) : e[r] = L.Util.formatNum(t, 5)
        }
        for (var r = t.ol, o = 0, n = r.length, s = this.options.layerName; n > o; o++)
            if (r[o] === s) {
                r.splice(o, 1);
                break
            }
        if ("url" === this.options.saveMode) {
            var i = []
              , 
            l = 0;
            if (this._layer.eachLayer(function(e) {
                e._radius && (e.properties.radius = e.getRadius()),
                e._popup && e._popup._isOpen && (delete t.sel,                             			
                e.properties.popupIsOpen = !0);
			   
			    //2016-07-07  
				if(e._popup){
                    if(e._popup._isOpen){
						if(typeof e.properties !== "undefined" && e.properties !== null){
						if(typeof e.properties.popupIsOpen !== "undefined" && e.properties.popupIsOpen !== null){
						e.properties.popupIsOpen=!0;
					}	
					}
					}else{
						if(typeof e.properties !== "undefined" && e.properties !== null){
						if(typeof e.properties.popupIsOpen !== "undefined" && e.properties.popupIsOpen !== null){
						e.properties.popupIsOpen=false;
					}	
					}	
					}					
				}else{
					if(typeof e.properties !== "undefined" && e.properties !== null){
						if(typeof e.properties.popupIsOpen !== "undefined" && e.properties.popupIsOpen !== null){
						e.properties.popupIsOpen=false
					}	
					}

				}
				
				//2016-07-07
                i.push(e.properties),
                e.properties && (l += 1)
            }),
            0 === l)
                return !1;
            for (var p, c, d = this._layer.toGeoJSON(), u = d.features, g = [], o = 0, n = u.length; n > o; o++)
                c = u[o],
                p = $.extend(!0, {}, c),
                a(p.geometry.coordinates),
                i[o] && (p.properties = $.extend({}, i[o]),
                delete p.properties.measure_form,
                g.push(p));
            d.features = g;
            var h = JSON.stringify(d);
            h = this._compressJson(h);
            var m = encodeURIComponent(this.options.saveMode + "," + h);
            m = m.replace(/%3A/g, ":"),
            m = m.replace(/%3A/g, ":"),
            t.md = m
        }
    },
    _onApplyParams: function(e, t) {
        if (t.MD) {
            var a = decodeURIComponent(t.MD)
              , 
            r = a.search(",")
              , 
            o = a.substring(0, r)
              , 
            n = a.substring(r + 1);
            if ("url" === o) {
                n = this._uncompressJson(n);
                var s, i = JSON.parse(n), 
                l = L.geoJson(i);
				
				//2016-07-07
				var hideDrawInfo = window.getQueryParameters('hidedrawinfo');
				   if (hideDrawInfo.length > 0) {
                   if (hideDrawInfo === "true") {					   
					  if(l && l._layers) {
						  for (key in l._layers){
							  if(l._layers[key].feature){
								  if(l._layers[key].feature.properties){
									  if(typeof l._layers[key].feature.properties.popupIsOpen !== "undefined" && l._layers[key].feature.properties.popupIsOpen !== null){
										  if(l._layers[key].feature.properties.popupIsOpen){
											 l._layers[key].feature.properties.popupIsOpen=false; 
										  }
										  
									  }
								  }
							  }
							  
						  }
					  }
					   
					  
                   
                    }else if(hideDrawInfo === "false"){
						
					if(l && l._layers) {
						var anyPopupIsShown= 0;
						  for (key in l._layers){
							  if(l._layers[key].feature){
								  if(l._layers[key].feature.properties){
									  if(typeof l._layers[key].feature.properties.popupIsOpen !== "undefined" && l._layers[key].feature.properties.popupIsOpen !== null){
										  if(l._layers[key].feature.properties.popupIsOpen){
											 anyPopupIsShown++;
										  }
										  
									  }
								  }
							  }
							  
						  }
						  
						  if(anyPopupIsShown===0){
							 for (key in l._layers){
							  if(l._layers[key].feature){
								  if(l._layers[key].feature.properties){
									  if(typeof l._layers[key].feature.properties.popupIsOpen !== "undefined" && l._layers[key].feature.properties.popupIsOpen !== null){
										  if(l._layers[key].feature.properties.popupIsOpen){
											 
										  }else{
											 l._layers[key].feature.properties.popupIsOpen=true; 
										  }
										  
									  }else{
										  if(l._layers[key].feature.properties.measure_text.length>0){
											  l._layers[key].feature.properties['popupIsOpen']=true;
										  }
										  
									  }
								  }
							  }
							  
						  } 
						  }
						  
						  
						  
					  }
					
						
					}else{
						
					}
                   }
				//2016-07-07	

				
                p = this;
                l.eachLayer(function(e) {					
                    var t = {
                        Point: "marker",
                        LineString: "polyline",
                        Polygon: "polygon"
                    };
                    if ("Point" === e.feature.geometry.type) {
                        var a = e.feature.geometry.coordinates;
                        s = L.marker([a[1], a[0]]),
                        s.properties = $.extend(!0, {}, e.feature.properties)
                    } else
                        s = e;
                    p.onCreated({
                        _silent: !0,
                        layerType: t[e.feature.geometry.type],
                        layer: s
                    })
                })
            }
        }
    },
    _proxyListeners: function() {
        this.__onRowClick = $.proxy(this._onRowClick, this)
    },
    onRemove: function() {},
    readableDistance: function(e, t) {
        t = t || 1;
        var a = "m"
          , 
        r = 0;
        if (1 === t && e >= 1e3 || 2 === t && e >= 1e5) {
            var o = Math.pow(1e3, t - 1);
            e /= o,
            e /= 1e3,
            r = 3,
            a = "km"
        }
        return a = 1 === t ? a : a + t,
        utils.round(e, r) + " " + a
    },
    
    
    _renderLabel: function(center, len) {
        this._labels = this._labels || [];
        
        var label = utils.createLabel(center, this.readableDistance(len, 1), "leaflet-maplabel leaflet-maplabel-small");
        this._layer.addLayer(label);
        this._labels.push(label);
        
        /* Center the tag*/
        var labelTag = $(".leaflet-maplabel.leaflet-maplabel-small:last");
        labelTag.css({
            "margin-left": (-labelTag.width() / 2) + "px"
        });
    },
    
    
    
    /* onNodeClick: function(e) {
             var t = e.latlng || null 
               , a = this._nodes;
             if (this._labels = this._labels || [],
             t && a.push(t),
             a.length > 1) {
                 var r = a.slice(a.length - 2)
                   , o = utils.getLength(r);
                 if (0 >= o)
                     return !1;
                 var n = L.latLng((r[0].lat + r[1].lat) / 2, (r[0].lng + r[1].lng) / 2)
                   , s = utils.createLabel(n, this.readableDistance(o, 1), "leaflet-maplabel leaflet-maplabel-small");
                 this._layer.addLayer(s),
                 this._labels.push(s);
                 var i = $(".leaflet-maplabel.leaflet-maplabel-small:last");
                 i.css({
                     "margin-left": -i.width() / 2 + "px"
                 })
             }
         },*/
    
    onNodeClick: function(e) {
        this._nodes = this._nodes || [];
        
        var latLng = e.latlng || null ;
        var nds = this._nodes;
        
        if (latLng) {
            nds.push(latLng);
        }
        if (nds.length > 1) {
            var latLngs = nds.slice(nds.length - 2);
            var len = utils.getLength(latLngs);
            if (len <= 0) {
                return false;
            }
            var center = L.latLng((latLngs[0].lat + latLngs[1].lat) / 2, (latLngs[0].lng + latLngs[1].lng) / 2);
            this._renderLabel(center, len);
        }
        
        console.log("node click");
    },
    
    
    _createCoordsHtml: function(e, t) {
        t = t || !1;
        var a = utils.projectLatLng(e, "EPSG:4326", "EPSG:3006")
          , 
        r = utils.projectLatLng(e, "EPSG:4326", "EPSG:3008")
          , 
        o = utils.projectLatLng(e, "EPSG:4326", "EPSG:3021")
          , 
        n = ""
          , 
        s = ""
          , 
        i = "";
        return t || (n = " hidden",
        s = '<div style="margin-bottom:1em;">[' + this.lang.draggableMarker + "]</div>",
        i = '<br><button ondrag="return false;" class="btn btn-primary btn-sm"><i class="fa fa-plus"></i>&nbsp;&nbsp;' + this.lang.moreCoords + "</button></div></div>"),
        html = s + "<div><strong>WGS 84 (EPSG:4326)</strong><br>Lat: &nbsp;" + utils.round(e.lng, 5) + "<br>Lon: &nbsp;" + utils.round(e.lat, 5) + "<div>" + i,
        html += "<br><div class='measuredraw-morecoords" + n + "'><strong>Sweref99 TM (EPSG:3006)</strong><br>East: &nbsp;" + utils.round(a.lng) + "<br>North: &nbsp;" + utils.round(a.lat) + "<br><br><strong>Sweref99 13 30 (EPSG:3008)</strong><br>East: &nbsp;" + utils.round(r.lng) + "<br>North: &nbsp;" + utils.round(r.lat) + "<br><br><strong>RT90 2.5 gon V (EPSG:3021)</strong><br>East: &nbsp;" + utils.round(o.lng) + "<br>North: &nbsp;" + utils.round(o.lat) + "</div>",
        html
    },
    _getLabel: function(e) {
        var t;
        return this._layer.eachLayer(function(a) {
            a._parentFeature && a._parentFeature === e && (t = a)
        }),
        t
    },
    onCreated: function(e) {
        var t = this;
        this._deactivateAll();
        var a = e.layerType
          , 
        r = e.layer;
        if (r.properties && r.properties.radius) {
            var o = r.properties;
            a = "circle",
            r = L.circle(r._latlng, r.properties.radius),
            r.properties = o
        }
        if (r.setStyle)
            switch (a) {
            case "polyline":
                r.setStyle(this.options.stylePolyline);
                break;
            default:
                r.setStyle(this.options.stylePolygon)
            }
        "marker" === a && (r.options.draggable = !0,
        r.on("dragstart", function(e) {
            var t = e.target;
            t.closePopup()
        }),
        r.on("drag", function(e) {
            var a = e.target
              , 
            r = t._getLabel(a);
            r.setLatLng(a.getLatLng());
            var o = t._createCoordsHtml(a.getLatLng());
            $(r._icon).html(o);
            var n = $(".alert");
            if (n.length) {
                var s = smap.cmd.notify(t._createCoordsHtml(a.getLatLng(), !0), "blank");
                s.addClass("notify-transition notify-visible")
            }
        })),
        this._layer.addLayer(r),
        r.options.layerId = r._leaflet_id,
        r.feature && (r.properties = r.feature.properties || r.properties,
        delete r.feature),
        r.properties && (r.properties.measure_form || r.properties.measure_text) || (r.properties = {
            id: r._leaflet_id,
            measure_form: '<div class="measuredraw-popup-div-save"><textarea class="form-control" placeholder="' + this.lang.clickToAddText + '" rows="3"></textarea></div>',
            measure_text: ""
        }),
        r.properties.id = r._leaflet_id,
        r._measureDrawFeature = !0,
        this._layer.fire("load"),
        r.unbindPopup();
        var n, s, i, l = "";
        switch (a) {
        case "marker":
            var p = n = r.getLatLng();
            l = this._createCoordsHtml(p);
            break;
        case "polyline":
            var c = r.getLatLngs();
            n = c[parseInt(c.length / 2)],
            s = utils.getLength(c),
            l = this.lang.len + ": &nbsp;" + this.readableDistance(s, 1) + "<br>";
            break;
        case "polygon":
            n = r.getBounds().getCenter();
            var c = r.getLatLngs();
            c.push(c[0]);
            var i = L.GeometryUtil.geodesicArea(c);
            s = utils.getLength(c),
            l = this.lang.circumference + ": &nbsp;" + this.readableDistance(s, 1) + "<br>" + this.lang.area + ": &nbsp;" + this.readableDistance(i, 2);
            break;
        case "circle":
            n = r.getBounds().getCenter();
            var d = r.getRadius();
            i = d * d * Math.PI,
            s = 2 * d * Math.PI,
            l = this.lang.circumference + ": &nbsp;" + this.readableDistance(s, 1) + "<br>" + this.lang.radius + ": &nbsp;" + this.readableDistance(d, 1) + "<br>" + this.lang.area + ": &nbsp;" + this.readableDistance(i, 2);
            break;
        case "rectangle":
            n = r.getBounds().getCenter();
            var c = r.getLatLngs();
            c.push(c[0]);
            var i = L.GeometryUtil.geodesicArea(c);
            s = utils.getLength(c),
            l = this.lang.circumference + ": &nbsp;" + this.readableDistance(s, 1) + "<br>" + this.lang.area + ": &nbsp;" + this.readableDistance(i, 2)
        }
        var u = r._leaflet_id
          , 
        g = "measuredrawlabel_" + u + "_"
          , 
        h = "leaflet-maplabel " + g;
        if (L.Browser.touch)
            ;
        else {
            (e._silent || "rectangle" === a) && r.getLatLngs && (this._nodes = [],
            $.each(r.getLatLngs(), function(e, a) {
                t.onNodeClick({
                    latlng: a
                })
            }));
            var m = utils.createLabel(n, l, h);
            if (this._layer.addLayer(m),
            r.on("mouseover", this.onMouseOver),
            r.on("mouseout", this.onMouseOut),
            m.options.clickable = !0,
            "marker" === a) {
                var f = function() {
                    if (t.options.moreCoordsAsModal) {
                        var e = t._createCoordsHtml(r.getLatLng(), !0);
                        smap.cmd.notify(e, "blank", {
                            fade: !0
                        })
                    } else {
                        var a = $(this)
                          , 
                        o = a.parent().parent().parent();
                        o.find(".measuredraw-morecoords").toggleClass("hidden"),
                        a.parent().remove()
                    }
                    return !1
                }
                  , 
                b = function() {
                    var e = $(this);
                    e.find("button").off("click", f).on("click", f)
                }
                ;
                $(m._icon).on("mouseenter", b),
                $(m._icon).on("click", function() {
                    return !1
                })
            }
            this._labels = this._labels || [],
            this._labels.push(m);
            for (var _ = this._labels || [], v = 0, y = _.length; y > v; v++)
                _[v]._parentFeature = r;
            this._labels = [];
            var w = $(".leaflet-maplabel:last");
            "marker" === a && w.css("transition", "none"),
            w.css({
                "margin-left": -w.width() / 2 - 15 + "px"
            })
        }
        e._silent ? r.properties && r.properties.popupIsOpen && (delete r.properties.popupIsOpen,
        this.map.fire("selected", {
            feature: r,
            selectedFeatures: [],
            layer: this._layer
        })) : w && (w.addClass("leaflet-maplabel-hover"),
        setTimeout(function() {
            w.removeClass("leaflet-maplabel-hover")
        }, 2e3))
    },
    onMouseOver: function(e) {
        var t = $(".measuredrawlabel_" + e.target._leaflet_id + "_");
        t.addClass("leaflet-maplabel-hover")
    },
    onMouseOut: function(e) {
        $(".measuredrawlabel_" + e.target._leaflet_id + "_").removeClass("leaflet-maplabel-hover")
    },
    _setLabels: function() {
        var e = L.drawLocal.draw;
        $.extend(!0, e.handlers, this.lang.handlers || {})
    },
    _selection: function(e) {
        var t, a, r = [smap.cmd.getControl("L.Control.SelectWMS"), smap.cmd.getControl("L.Control.SelectVector")];
        for (a = 0; a < r.length; a++)
            t = r[a],
            t && (e === !0 ? t.activate() : t.deactivate())
    },
    _initDraw: function() {
        this._layer = L.featureGroup(),
        this._layer.options = {
            layerId: this.options.layerName,
            popup: "${measure_text}${measure_form}",
            uniqueKey: "id"
        },
        this.map.addLayer(this._layer),
        this._drawControl = new L.Control.Draw({
            draw: {
                marker: !1,
                polyline: !1,
                polygon: !1,
                rectangle: !1,
                circle: !1
            },
            edit: null 
        }),
        this._onCreated = this._onCreated || $.proxy(this.onCreated, this),
        this._onNodeClick = this._onNodeClick || $.proxy(this.onNodeClick, this),
        this._onPopupOpen = this._onPopupOpen || $.proxy(this.onPopupOpen, this),
        this.map.on("draw:created", this._onCreated);
        var e = this;
        e.map.on("click", function() {
            this._removeAlerts()
        }, this);
        
        
        var onVertexChanged = (function(e) {
            this.onNodeClick(e);
        }
        ).bind(this);
        
        
        
        
        this.map.on("draw:drawstart", function() {
            e._nodes = [],
            e._selection(!1),
            /*e.map.on("click", e._onNodeClick)*/
            e._map.on("draw:vertexchanged", onVertexChanged)
        }),
        this.map.on("draw:drawstop", function(t) {
            /*e.map.off("click", e._onNodeClick),*/
            e._map.off("draw:vertexchanged", onVertexChanged),
            e._nodes && _.indexOf(["polygon", "rectangle"], t.layerType) > -1 && e._onNodeClick({
                latlng: e._nodes[0]
            }),
            /*Mohammad chnage:*/
            /*e._selection(!0)*/
            setTimeout(function() {
                e._selection(!0)
            }, 50)
            /*Mohammad chnage:*/
        }),
        this.map.on("popupopen", this._onPopupOpen)
    },
    _removeFeature: function(e) {
        var t = this;
        this.map.fire("unselected", {}),
        this.map._popup && this.map.closePopup();
        this._labels;
        e.off(),
        this._layer.eachLayer(function(a) {
            a._parentFeature && a._parentFeature === e && (a.off(),
            t.map.removeLayer(a))
        }),
        this._layer.removeLayer(e)
    },
    onPopupOpen: function(e) {
        var t = this;
        this._removeAlerts();
        var a = e.popup && e.popup._source ? e.popup._source : null ;
        if (a && a._measureDrawFeature) {
            var r = smap.cmd.getControl("L.Control.SelectWMS");
            r._dblclickWasRegistered = !0,
            r && setTimeout(function() {
                r._dblclickWasRegistered = !1
            }, 400);
            var o = $(".measuredraw-popup-div-save textarea");
              
            //2016-07-07
			var hideDrawDeleteButton = window.getQueryParameters('hidedrawdeletebutton');
            	if(hideDrawDeleteButton.length>0){
					if(hideDrawDeleteButton==="true"){
						n = '<br><br><button style="display:none!important;" class="btn btn-default btn-sm measuredraw-btn-popupremove">' + this.lang.remove + "</button>";
					}else{
					n = '<br><br><button class="btn btn-default btn-sm measuredraw-btn-popupremove">' + this.lang.remove + "</button>";
					}
					
				}else{
					n = '<br><br><button class="btn btn-default btn-sm measuredraw-btn-popupremove">' + this.lang.remove + "</button>";
				}		
            //n = '<br><br><button class="btn btn-default btn-sm measuredraw-btn-popupremove">' + this.lang.remove + "</button>",
            //2016-07-07			
            s = e.popup
              , 
            i = s.getContent();
            if (-1 === i.search("measuredraw-btn-popupremove") && (i += n,
            s.setContent(i),
            s.update(),
            o = $(".measuredraw-popup-div-save textarea")),
            $(".leaflet-popup-content").find(".measuredraw-btn-popupremove").on("click", function() {
                return t._removeFeature(a),
                !1
            }),
            o.length) {
                o.placeholder(),
                o.tooltip({
                    placement: "top",
                    title: this.lang.helpTextSavePopup,
                    container: ".leaflet-popup",
                    trigger: "manual"
                }),
                o.on("keypress", function() {
                    $(".tooltip:visible").length || $(this).tooltip("show")
                });
                var l = utils.getBrowser();
                o.on("focus", function() {
                    $(".measuredraw-btn-popupremove").prop("disabled", !0),
                    (l.ie10 || l.ie11) && $(this).val("")
                });
                {
                    this.lang.clickToAddText
                }
                o.on("blur", function() {
                    $(".measuredraw-btn-popupremove").prop("disabled", !1),
                    $(this).tooltip("hide");
                    var t = e.popup._source
                      , 
                    a = $(this).val();
                    "" === a || (t.properties.measure_text = a,
                    t.properties.measure_form = "",
                    t.closePopup())
                })
            }
        }
    },
    _getDrawToolbar: function(e) {
        var t;
        for (var a in this._drawControl._toolbars)
            if (t = this._drawControl._toolbars[a],
            t && t._modes && t._modes[e])
                return t._modes[e];
        return null 
    },
    _deactivateAll: function() {
        var e = this._tools;
        for (var t in e)
            e[t].disable(),
            this.$container.find(".dropdown-menu li.active").removeClass("active");
        this._removeAlerts()
    },
    _removeAlerts: function() {
        var e = $(".alert");
        e.length && (e.removeClass("notify-visible"),
        setTimeout(function() {
            e.remove()
        }, 500))
    },
    _onRowClick: function(e) {
        var t = "li" === e.target.tagName ? $(e.target) : $(e.target).parents("li")
          , 
        a = t.data("geomType");
        return t.hasClass("active") ? (t.removeClass("active"),
        this._tools[a].disable()) : (this._deactivateAll(),
        t.toggleClass("active"),
        this._tools[a].enable(),
        setTimeout(function() {
            $(".leaflet-control-measuredraw .dropdown-menu").dropdown("toggle")
        }, 200)),
        !1
    },
    _createRow: function(e) {
        /*Edit HU*/
        var ap = '';
        if (e.geomType == "marker") {
            ap = 'id="drawMarker"';
        }
        /*var t = $('<li><a><div><span class="drawicons ' + e.cl + '"></span><span>' + e.label + "</span></div></a></li>");*/
        var t = $('<li><a ' + ap + '><div><span class="drawicons ' + e.cl + '"></span><span>' + e.label + "</span></div></a></li>");
        /*end edit*/
        t.data("geomType", e.geomType),
        t.on("click", this.__onRowClick);
        var a = L.Draw[utils.capitalize(e.geomType)]
          , 
        r = new a(this.map,this._drawControl.options.draw[e.geomType]);
        r.options.shapeOptions = r.options.shapeOptions || {};
        var o = {};
        switch (e.geomType) {
        case "polyline":
            o = this.options.stylePolyline;
            break;
        default:
            o = this.options.stylePolygon
        }
        return $.extend(r.options.shapeOptions, o),
        this._tools[e.geomType] = r,
        t
    },
    _createBtn: function() {
        var e = [{
            label: this.lang.drawPoint,
            cl: "leaflet-draw-draw-marker",
            geomType: "marker"
        }, {
            label: this.lang.drawLine,
            cl: "leaflet-draw-draw-polyline",
            geomType: "polyline"
        }, {
            label: this.lang.drawPolygon,
            cl: "leaflet-draw-draw-polygon",
            geomType: "polygon"
        }, {
            label: this.lang.drawCircle,
            cl: "leaflet-draw-draw-circle",
            geomType: "circle"
        }, {
            label: this.lang.drawRectangle,
            cl: "leaflet-draw-draw-rectangle",
            geomType: "rectangle"
        }]
        /*HU Change*/
        /*, t = $('<div class="btn-group"><button type="button" title="' + this.lang.btnTitle + '" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><span class="drawicons leaflet-draw-draw-marker measuredraw-btntoggle-image"></span></button><ul class="dropdown-menu" role="menu"></ul></div>');*/
          
        , 
        t = $('<div class="btn-group"><button type="button" title="' + this.lang.btnTitle + '" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><svg class="fa leaflet-draw-draw-marker measuredraw-btntoggle-image" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" version="1.1" y="0" x="0" enable-background="new 0 0 100 100" viewBox="0 0 100 100"><style>.s0{fill:#4d4d4d;}.s1{fill:#666;stroke-width:2;stroke:#fff;}</style><path d="m51.1 28.2-2.8-2.9-18.9-18.8c-1.9-2-5.2-2-7.2 0l-15.7 15.7c-2 2-2 5.2 0 7.2l2.5 2.5 11.5-11.5c0.4-0.4 1.2-0.4 1.6 0s0.4 1.2 0 1.6l-11.5 11.5 4.8 4.8 7.5-7.5c0.4-0.4 1.2-0.4 1.6 0s0.4 1.2 0 1.6l-7.5 7.5 4.8 4.8 7.5-7.5c0.4-0.4 1.2-0.4 1.6 0s0.4 1.2 0 1.6l-7.5 7.5 4.8 4.8" fill="#4d4d4d"/><path d="m7.5 74.9c-1.4 1.4-2.5 4.1-2.5 6.1v10.5 3.5h14.1c1.9 0 4.7-1.1 6-2.5l68.9-68.9c1.4-1.4 1.4-3.6 0-5l-12.6-12.6c-1.4-1.3-3.7-1.3-5 0.1l-68.9 68.8z" fill="#b3b3b3"/><path d="m71.8 48.9-0.9 0.9-22 22 4.8 4.8 7.5-7.5c0.4-0.4 1.2-0.4 1.6 0s0.4 1.2 0 1.6l-7.5 7.5 4.8 4.8 7.5-7.5c0.4-0.4 1.2-0.4 1.6 0s0.4 1.2 0 1.6l-7.5 7.5 4.8 4.8 11.5-11.5c0.4-0.4 1.2-0.4 1.6 0s0.4 1.2 0 1.6l-11.5 11.5 2.5 2.5c2 2 5.2 2 7.2 0l15.7-15.7c2-2 2-5.2 0-7.2l-21.7-21.7z" fill="#4d4d4d"/><path d="m79.7 11.4-69.5 68.3" class="s1"/><path d="m84.3 15.9-69.5 68.2" class="s1"/><path d="m88.6 20.6-69.5 68.2" class="s1"/><style xmlns="http://www.w3.org/1999/xhtml" type="text/css" charset="utf-8" class="firebugResetStyles">.firebugResetStyles {z-index: 2147483646 !important;top: 0 !important;left: 0 !important;display: block !important;border: 0 none !important;margin: 0 !important;padding: 0 !important;outline: 0 !important;min-width: 0 !important;max-width: none !important;min-height: 0 !important;max-height: none !important;position: fixed !important;transform: rotate(0deg) !important;transform-origin: 50% 50% !important;border-radius: 0 !important;box-shadow: none !important;background: transparent none !important;pointer-events: none !important;white-space: normal !important;}style.firebugResetStyles {display: none !important;}.firebugBlockBackgroundColor {background-color: transparent !important;}.firebugResetStyles:before, .firebugResetStyles:after {content: &quot;&quot;!important;}.firebugCanvas {display: none !important;}.firebugLayoutBox {width: auto !important;position: static !important;}.firebugLayoutBoxOffset {opacity: 0.8 !important;position: fixed !important;}.firebugLayoutLine {opacity: 0.4 !important;background-color: #000000 !important;}.firebugLayoutLineLeft, .firebugLayoutLineRight {width: 1px !important;height: 100% !important;}.firebugLayoutLineTop, .firebugLayoutLineBottom {width: 100% !important;height: 1px !important;}.firebugLayoutLineTop {margin-top: -1px !important;border-top: 1px solid #999999 !important;}.firebugLayoutLineRight {border-right: 1px solid #999999 !important;}.firebugLayoutLineBottom {border-bottom: 1px solid #999999 !important;}.firebugLayoutLineLeft {margin-left: -1px !important;border-left: 1px solid #999999 !important;}.firebugLayoutBoxParent {border-top: 0 none !important;border-right: 1px dashed #E00 !important;border-bottom: 1px dashed #E00 !important;border-left: 0 none !important;position: fixed !important;width: auto !important;}.firebugRuler{position: absolute !important;}.firebugRulerH {top: -15px !important;left: 0 !important;width: 100% !important;height: 14px !important;background: url(&quot;data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%13%88%00%00%00%0E%08%02%00%00%00L%25a%0A%00%00%00%04gAMA%00%00%D6%D8%D4OX2%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%04%F8IDATx%DA%EC%DD%D1n%E2%3A%00E%D1%80%F8%FF%EF%E2%AF2%95%D0D4%0E%C1%14%B0%8Fa-%E9%3E%CC%9C%87n%B9%81%A6W0%1C%A6i%9A%E7y%0As8%1CT%A9R%A5J%95*U%AAT%A9R%A5J%95*U%AAT%A9R%A5J%95*U%AAT%A9R%A5J%95*U%AAT%A9R%A5J%95*U%AAT%A9R%A5J%95*U%AAT%A9R%A5J%95*U%AATE9%FE%FCw%3E%9F%AF%2B%2F%BA%97%FDT%1D~K(%5C%9D%D5%EA%1B%5C%86%B5%A9%BDU%B5y%80%ED%AB*%03%FAV9%AB%E1%CEj%E7%82%EF%FB%18%BC%AEJ8%AB%FA&apos;%D2%BEU9%D7U%ECc0%E1%A2r%5DynwVi%CFW%7F%BB%17%7Dy%EACU%CD%0E%F0%FA%3BX%FEbV%FEM%9B%2B%AD%BE%AA%E5%95v%AB%AA%E3E5%DCu%15rV9%07%B5%7F%B5w%FCm%BA%BE%AA%FBY%3D%14%F0%EE%C7%60%0EU%AAT%A9R%A5J%95*U%AAT%A9R%A5J%95*U%AAT%A9R%A5J%95*U%AAT%A9R%A5J%95*U%AAT%A9R%A5JU%88%D3%F5%1F%AE%DF%3B%1B%F2%3E%DAUCNa%F92%D02%AC%7Dm%F9%3A%D4%F2%8B6%AE*%BF%5C%C2Ym~9g5%D0Y%95%17%7C%C8c%B0%7C%18%26%9CU%CD%13i%F7%AA%90%B3Z%7D%95%B4%C7%60%E6E%B5%BC%05%B4%FBY%95U%9E%DB%FD%1C%FC%E0%9F%83%7F%BE%17%7DkjMU%E3%03%AC%7CWj%DF%83%9An%BCG%AE%F1%95%96yQ%0Dq%5Dy%00%3Et%B5&apos;%FC6%5DS%95pV%95%01%81%FF&apos;%07%00%00%00%00%00%00%00%00%00%F8x%C7%F0%BE%9COp%5D%C9%7C%AD%E7%E6%EBV%FB%1E%E0(%07%E5%AC%C6%3A%ABi%9C%8F%C6%0E9%AB%C0&apos;%D2%8E%9F%F99%D0E%B5%99%14%F5%0D%CD%7F%24%C6%DEH%B8%E9rV%DFs%DB%D0%F7%00k%FE%1D%84%84%83J%B8%E3%BA%FB%EF%20%84%1C%D7%AD%B0%8E%D7U%C8Y%05%1E%D4t%EF%AD%95Q%BF8w%BF%E9%0A%BF%EB%03%00%00%00%00%00%00%00%00%00%B8vJ%8E%BB%F5%B1u%8Cx%80%E1o%5E%CA9%AB%CB%CB%8E%03%DF%1D%B7T%25%9C%D5(%EFJM8%AB%CC&apos;%D2%B2*%A4s%E7c6%FB%3E%FA%A2%1E%80~%0E%3E%DA%10x%5D%95Uig%15u%15%ED%7C%14%B6%87%A1%3B%FCo8%A8%D8o%D3%ADO%01%EDx%83%1A~%1B%9FpP%A3%DC%C6&apos;%9C%95gK%00%00%00%00%00%00%00%00%00%20%D9%C9%11%D0%C0%40%AF%3F%EE%EE%92%94%D6%16X%B5%BCMH%15%2F%BF%D4%A7%C87%F1%8E%F2%81%AE%AAvzr%DA2%ABV%17%7C%E63%83%E7I%DC%C6%0Bs%1B%EF6%1E%00%00%00%00%00%00%00%00%00%80cr%9CW%FF%7F%C6%01%0E%F1%CE%A5%84%B3%CA%BC%E0%CB%AA%84%CE%F9%BF)%EC%13%08WU%AE%AB%B1%AE%2BO%EC%8E%CBYe%FE%8CN%ABr%5Dy%60~%CFA%0D%F4%AE%D4%BE%C75%CA%EDVB%EA(%B7%F1%09g%E5%D9%12%00%00%00%00%00%00%00%00%00H%F6%EB%13S%E7y%5E%5E%FB%98%F0%22%D1%B2&apos;%A7%F0%92%B1%BC%24z3%AC%7Dm%60%D5%92%B4%7CEUO%5E%F0%AA*%3BU%B9%AE%3E%A0j%94%07%A0%C7%A0%AB%FD%B5%3F%A0%F7%03T%3Dy%D7%F7%D6%D4%C0%AAU%D2%E6%DFt%3F%A8%CC%AA%F2%86%B9%D7%F5%1F%18%E6%01%F8%CC%D5%9E%F0%F3z%88%AA%90%EF%20%00%00%00%00%00%00%00%00%00%C0%A6%D3%EA%CFi%AFb%2C%7BB%0A%2B%C3%1A%D7%06V%D5%07%A8r%5D%3D%D9%A6%CAu%F5%25%CF%A2%99%97zNX%60%95%AB%5DUZ%D5%FBR%03%AB%1C%D4k%9F%3F%BB%5C%FF%81a%AE%AB&apos;%7F%F3%EA%FE%F3z%94%AA%D8%DF%5B%01%00%00%00%00%00%00%00%00%00%8E%FB%F3%F2%B1%1B%8DWU%AAT%A9R%A5J%95*U%AAT%A9R%A5J%95*U%AAT%A9R%A5J%95*U%AAT%A9R%A5J%95*U%AAT%A9R%A5J%95*U%AAT%A9R%A5J%95*U%AAT%A9R%A5J%95*UiU%C7%BBe%E7%F3%B9%CB%AAJ%95*U%AAT%A9R%A5J%95*U%AAT%A9R%A5J%95*U%AAT%A9R%A5J%95*U%AAT%A9R%A5J%95*U%AAT%A9R%A5J%95*U%AAT%A9R%A5J%95*U%AAT%A9R%A5*%AAj%FD%C6%D4%5Eo%90%B5Z%ADV%AB%D5j%B5Z%ADV%AB%D5j%B5Z%ADV%AB%D5j%B5Z%ADV%AB%D5j%B5Z%ADV%AB%D5j%B5Z%ADV%AB%D5j%B5Z%ADV%AB%D5j%B5%86%AF%1B%9F%98%DA%EBm%BBV%AB%D5j%B5Z%ADV%AB%D5j%B5Z%ADV%AB%D5j%B5Z%ADV%AB%D5j%B5Z%ADV%AB%D5j%B5Z%ADV%AB%D5j%B5Z%ADV%AB%D5j%B5Z%AD%D6%E4%F58%01%00%00%00%00%00%00%00%00%00%00%00%00%00%40%85%7F%02%0C%008%C2%D0H%16j%8FX%00%00%00%00IEND%AEB%60%82&quot;) repeat-x !important;border-top: 1px solid #BBBBBB !important;border-right: 1px dashed #BBBBBB !important;border-bottom: 1px solid #000000 !important;}.firebugRulerV {top: 0 !important;left: -15px !important;width: 14px !important;height: 100% !important;background: url(&quot;data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0E%00%00%13%88%08%02%00%00%00%0E%F5%CB%10%00%00%00%04gAMA%00%00%D6%D8%D4OX2%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%06~IDATx%DA%EC%DD%D1v%A20%14%40Qt%F1%FF%FF%E4%97%D9%07%3BT%19%92%DC%40(%90%EEy%9A5%CB%B6%E8%F6%9Ac%A4%CC0%84%FF%DC%9E%CF%E7%E3%F1%88%DE4%F8%5D%C7%9F%2F%BA%DD%5E%7FI%7D%F18%DDn%BA%C5%FB%DF%97%BFk%F2%10%FF%FD%B4%F2M%A7%FB%FD%FD%B3%22%07p%8F%3F%AE%E3%F4S%8A%8F%40%EEq%9D%BE8D%F0%0EY%A1Uq%B7%EA%1F%81%88V%E8X%3F%B4%CEy%B7h%D1%A2E%EBohU%FC%D9%AF2fO%8BBeD%BE%F7X%0C%97%A4%D6b7%2Ck%A5%12%E3%9B%60v%B7r%C7%1AI%8C%BD%2B%23r%00c0%B2v%9B%AD%CA%26%0C%1Ek%05A%FD%93%D0%2B%A1u%8B%16-%95q%5Ce%DCSO%8E%E4M%23%8B%F7%C2%FE%40%BB%BD%8C%FC%8A%B5V%EBu%40%F9%3B%A72%FA%AE%8C%D4%01%CC%B5%DA%13%9CB%AB%E2I%18%24%B0n%A9%0CZ*Ce%9C%A22%8E%D8NJ%1E%EB%FF%8F%AE%CAP%19*%C3%BAEKe%AC%D1%AAX%8C*%DEH%8F%C5W%A1e%AD%D4%B7%5C%5B%19%C5%DB%0D%EF%9F%19%1D%7B%5E%86%BD%0C%95%A12%AC%5B*%83%96%CAP%19%F62T%86%CAP%19*%83%96%CA%B8Xe%BC%FE)T%19%A1%17xg%7F%DA%CBP%19*%C3%BA%A52T%86%CAP%19%F62T%86%CA%B0n%A9%0CZ%1DV%C6%3D%F3%FCH%DE%B4%B8~%7F%5CZc%F1%D6%1F%AF%84%F9%0F6%E6%EBVt9%0E~%BEr%AF%23%B0%97%A12T%86%CAP%19%B4T%86%CA%B8Re%D8%CBP%19*%C3%BA%A52huX%19%AE%CA%E5%BC%0C%7B%19*CeX%B7h%A9%0C%95%E1%BC%0C%7B%19*CeX%B7T%06%AD%CB%5E%95%2B%BF.%8F%C5%97%D5%E4%7B%EE%82%D6%FB%CF-%9C%FD%B9%CF%3By%7B%19%F62T%86%CA%B0n%D1R%19*%A3%D3%CA%B0%97%A12T%86uKe%D0%EA%B02*%3F1%99%5DB%2B%A4%B5%F8%3A%7C%BA%2B%8Co%7D%5C%EDe%A8%0C%95a%DDR%19%B4T%C66%82fA%B2%ED%DA%9FC%FC%17GZ%06%C9%E1%B3%E5%2C%1A%9FoiB%EB%96%CA%A0%D5qe4%7B%7D%FD%85%F7%5B%ED_%E0s%07%F0k%951%ECr%0D%B5C%D7-g%D1%A8%0C%EB%96%CA%A0%A52T%C6)*%C3%5E%86%CAP%19%D6-%95A%EB*%95q%F8%BB%E3%F9%AB%F6%E21%ACZ%B7%22%B7%9B%3F%02%85%CB%A2%5B%B7%BA%5E%B7%9C%97%E1%BC%0C%EB%16-%95%A12z%AC%0C%BFc%A22T%86uKe%D0%EA%B02V%DD%AD%8A%2B%8CWhe%5E%AF%CF%F5%3B%26%CE%CBh%5C%19%CE%CB%B0%F3%A4%095%A1%CAP%19*Ce%A8%0C%3BO*Ce%A8%0C%95%A12%3A%AD%8C%0A%82%7B%F0v%1F%2FD%A9%5B%9F%EE%EA%26%AF%03%CA%DF9%7B%19*Ce%A8%0C%95%A12T%86%CA%B8Ze%D8%CBP%19*Ce%A8%0C%95%D1ae%EC%F7%89I%E1%B4%D7M%D7P%8BjU%5C%BB%3E%F2%20%D8%CBP%19*Ce%A8%0C%95%A12T%C6%D5*%C3%5E%86%CAP%19*Ce%B4O%07%7B%F0W%7Bw%1C%7C%1A%8C%B3%3B%D1%EE%AA%5C%D6-%EBV%83%80%5E%D0%CA%10%5CU%2BD%E07YU%86%CAP%19*%E3%9A%95%91%D9%A0%C8%AD%5B%EDv%9E%82%FFKOee%E4%8FUe%A8%0C%95%A12T%C6%1F%A9%8C%C8%3D%5B%A5%15%FD%14%22r%E7B%9F%17l%F8%BF%ED%EAf%2B%7F%CF%ECe%D8%CBP%19*Ce%A8%0C%95%E1%93~%7B%19%F62T%86%CAP%19*Ce%A8%0C%E7%13%DA%CBP%19*Ce%A8%0CZf%8B%16-Z%B4h%D1R%19f%8B%16-Z%B4h%D1R%19%B4%CC%16-Z%B4h%D1R%19%B4%CC%16-Z%B4h%D1%A2%A52%CC%16-Z%B4h%D1%A2%A52h%99-Z%B4h%D1%A2%A52h%99-Z%B4h%D1%A2EKe%98-Z%B4h%D1%A2EKe%D02%5B%B4h%D1%A2EKe%D02%5B%B4h%D1%A2E%8B%96%CA0%5B%B4h%D1%A2E%8B%96%CA%A0e%B6h%D1%A2E%8B%96%CA%A0e%B6h%D1%A2E%8B%16-%95a%B6h%D1%A2E%8B%16-%95A%CBl%D1%A2E%8B%16-%95A%CBl%D1%A2E%8B%16-Z*%C3l%D1%A2E%8B%16-Z*%83%96%D9%A2E%8B%16-Z*%83%96%D9%A2E%8B%16-Z%B4T%86%D9%A2E%8B%16-Z%B4T%06-%B3E%8B%16-Z%B4T%06-%B3E%8B%16-Z%B4h%A9%0C%B3E%8B%16-Z%B4h%A9%0CZf%8B%16-Z%B4h%A9%0CZf%8B%16-Z%B4h%D1R%19f%8B%16-Z%B4h%D1R%19%B4%CC%16-Z%B4h%D1R%19%B4%CC%16-Z%B4h%D1%A2%A52%CC%16-Z%B4h%D1%A2%A52h%99-Z%B4h%D1%A2%A52h%99-Z%B4h%D1%A2EKe%98-Z%B4h%D1%A2EKe%D02%5B%B4h%D1%A2EKe%D02%5B%B4h%D1%A2E%8B%96%CA0%5B%B4h%D1%A2E%8B%96%CA%A0e%B6h%D1%A2E%8B%96%CA%A0e%B6h%D1%A2E%8B%16-%95a%B6h%D1%A2E%8B%16-%95A%CBl%D1%A2E%8B%16-%95A%CBl%D1%A2E%8B%16-Z*%C3l%D1%A2E%8B%16-Z*%83%96%D9%A2E%8B%16-Z*%83%96%D9%A2E%8B%16-Z%B4T%86%D9%A2E%8B%16-Z%B4T%06-%B3E%8B%16-Z%B4T%06-%B3E%8B%16-Z%B4h%A9%0C%B3E%8B%16-Z%B4h%A9%0CZf%8B%16-Z%B4h%A9%0CZf%8B%16-Z%B4h%D1R%19f%8B%16-Z%B4h%D1R%19%B4%CC%16-Z%B4h%D1R%19%B4%CC%16-Z%B4h%D1%A2%A52%CC%16-Z%B4h%D1%A2%A52h%99-Z%B4h%D1%A2%A52h%99-Z%B4h%D1%A2EKe%98-Z%B4h%D1%A2EKe%D02%5B%B4h%D1%A2EKe%D02%5B%B4h%D1%A2E%8B%96%CA0%5B%B4h%D1%A2E%8B%96%CA%A0e%B6h%D1%A2E%8B%96%CA%A0e%B6h%D1%A2E%8B%16-%95a%B6h%D1%A2E%8B%16-%95A%CBl%D1%A2E%8B%16-%95A%CBl%D1%A2E%8B%16-Z*%C3l%D1%A2E%8B%16-Z*%83%96%D9%A2E%8B%16-Z*%83%96%D9%A2E%8B%16-Z%B4T%86%D9%A2E%8B%16-Z%B4T%06-%B3E%8B%16-Z%B4%AE%A4%F5%25%C0%00%DE%BF%5C&apos;%0F%DA%B8q%00%00%00%00IEND%AEB%60%82&quot;) repeat-y !important;border-left: 1px solid #BBBBBB !important;border-right: 1px solid #000000 !important;border-bottom: 1px dashed #BBBBBB !important;}.overflowRulerX &gt;.firebugRulerV {left: 0 !important;}.overflowRulerY &gt;.firebugRulerH {top: 0 !important;}.fbProxyElement {position: fixed !important;pointer-events: auto !important;}</style></svg></button><ul class="dropdown-menu" role="menu"></ul></div>');
        /*HU*/
        /*HU Change*/
        utils.getBrowser().ie && t.find(".measuredraw-btntoggle-image").css({
            "background-position": "-120px 0"
        });
        for (var a, r, o = t.find(".dropdown-menu"), n = 0, s = e.length; s > n; n++)
            r = e[n],
            a = this._createRow(r),
            o.append(a);
        return this.$container.append(t),
        t
    }
}),
L.control.measureDraw = function(e) {
    return new L.Control.MeasureDraw(e)
}
;

L.Draw.Polyline.addInitHook(function() {
    this._vertexChanged = function(latlng, added) {
        this._updateFinishHandler();
        this._updateRunningMeasure(latlng, added);
        this._clearGuides();
        this._updateTooltip();
        this._map.fire("draw:vertexchanged", {
            latlng: latlng
        });
        /* So that we can add a label*/
    }
    ;

});



/*L.Control.MeasureDraw = L.Control.extend({
    options: {
        position: "topright",
        saveMode: "url",
        saveWfsUrl: "",
        saveWfsTypeName: "",
        layerName: "measurelayer",
        moreCoordsAsModal: !0,
        touchShowButtonAsDisabled: !0,
        stylePolygon: {
            color: "#0077e2",
            weight: 3
        },
        stylePolyline: {
            color: "#0077e2",
            weight: 9
        }
    },
    _lang: {
        sv: {
            btnDisabledBecauseTouch: "Rita & Mät stödjer inte din nuvarande enhet",
            close: "Stäng",
            drawTools: "Ritverktyg",
            draggableMarker: "Markören är dragbar",
            btnTitle: "Rita & Mät",
            drawPoint: "Punkt/Koordinater",
            drawLine: "Linje",
            drawPolygon: "Yta",
            drawCircle: "Cirkel",
            drawRectangle: "Rektangel",
            circumference: "Omkrets",
            radius: "Radie",
            area: "Area",
            len: "Längd",
            lenPart: "Sidlängd",
            easting: "Easting (x/longitud)",
            northing: "Northing (y/latitud)",
            clickToAddText: "Klicka för att lägga till text (stäng pratbubblan för att spara)",
            showMeasures: "Visa mätresultat",
            remove: "Ta bort",
            moreCoords: "Fler koordinatsystem",
            helpTextSavePopup: "Stäng pratbubblan för att spara",
            handlers: {
                circle: {
                    tooltip: {
                        start: "Klicka och dra för att rita cirkel."
                    }
                },
                marker: {
                    tooltip: {
                        start: "Klicka i kartan för att placera markör."
                    }
                },
                polygon: {
                    tooltip: {
                        start: "Klicka för att påbörja yta",
                        cont: "Klicka igen för att fortsätta rita ytan.",
                        end: "Dubbelklicka eller klicka första punkten för att avsluta ytan."
                    }
                },
                polyline: {
                    error: "<strong>Error:</strong> linjers kanter kan inte korsa varandra!",
                    tooltip: {
                        start: "Klicka för att påbörja linje.",
                        cont: "Klicka för att fortsätta linje.",
                        end: "Dubbelklicka för att avsluta linje."
                    }
                },
                rectangle: {
                    tooltip: {
                        start: "Klicka och dra för att rita rektangel."
                    }
                },
                simpleshape: {
                    tooltip: {
                        end: "Släpp musknappen för att avsluta."
                    }
                }
            }
        },
        en: {
            btnDisabledBecauseTouch: "Draw & Measure is not supported on your device",
            close: "Close",
            drawTools: "Draw tools",
            draggableMarker: "The marker is draggable",
            btnTitle: "Draw & Measure",
            drawPoint: "Point/Coordinates",
            drawLine: "Line",
            drawPolygon: "Area",
            drawCircle: "Circle",
            drawRectangle: "Rectangle",
            circumference: "Circumference",
            radius: "Radius",
            area: "Area",
            len: "Length",
            easting: "Easting (x/longitude)",
            northing: "Northing (y/latitude)",
            clickToAddText: "Click to add text",
            showMeasures: "Show measure results",
            remove: "Remove",
            moreCoords: "More projections",
            helpTextSavePopup: "Close the popup to save"
        }
    },
    _setLang: function(e) {
        e = e || smap.config.langCode,
        this._lang && (this.lang = this._lang ? this._lang[e] : null )
    },
    initialize: function(e) {
        L.setOptions(this, e),
        this._setLang(e.langCode),
        this._tools = {},
        this._setLabels()
    },
    _jsonCompressDict: {
        '"FeatureCollection":': ":fc:",
        '"Feature"': ":F:",
        '"Point"': ":P:",
        '"features":': ":fs:",
        '"type":': ":t:",
        '"geometry":': ":g:",
        '"coordinates":': ":c:",
        '"properties":': ":p",
        '"measure_form"': ":m:",
        '"measure_text"': ":mt:"
    },
    _compressJson: function(e) {
        var t, a = this._jsonCompressDict;
        for (var r in a)
            t = new RegExp(r,"g"),
            e = e.replace(t, a[r]);
        return e
    },
    _uncompressJson: function(e) {
        var t, a = this._jsonCompressDict;
        for (var r in a)
            t = new RegExp(a[r],"g"),
            e = e.replace(t, r);
        return e
    },
    onAdd: function(e) {
        this.map = e,
        this._container = L.DomUtil.create("div", "leaflet-control-measuredraw"),
        L.DomEvent.disableClickPropagation(this._container),
        this.$container = $(this._container),
        this._proxyListeners(),
        this._initDraw();
        var t = L.Browser.touch && this.options.touchShowButtonAsDisabled;
        if (!L.Browser.touch || t) {
            var a = this._createBtn();
            t ? (a.prop("disabled", !0),
            a.prop("title", this.lang.btnDisabledBecauseTouch),
            a.tooltip({
                placement: "bottom"
            })) : smap.event.on("smap.core.pluginsadded", function() {
                $(".leaflet-control-measuredraw .dropdown-toggle").dropdown()
            }
            )
        }
        var r = this;
        return this.map.on("layeradd", function() {
            r._layer.bringToFront(),
            r._layer.setZIndex(1e4),
            r._layer.eachLayer(function(e) {
                e.options.selectable = !0,
                e.options.clickable = !1,
                e.bringToFront && e.bringToFront(),
                e.setZIndex && e.setZIndex(1e4)
            }
            )
        }
        ),
        smap.event.on("smap.core.createparams", $.proxy(this._onCreateParams, this)),
        smap.event.on("smap.core.applyparams", $.proxy(this._onApplyParams, this)),
        this._container
    },
    _onCreateParams: function(e, t) {
        function a(e) {
            for (var t, r = 0, o = e.length; o > r; r++)
                t = e[r],
                t instanceof Array ? a(t) : e[r] = L.Util.formatNum(t, 5)
        }
        for (var r = t.ol, o = 0, n = r.length, s = this.options.layerName; n > o; o++)
            if (r[o] === s) {
                r.splice(o, 1);
                break
            }
        if ("url" === this.options.saveMode) {
            var i = []
              , l = 0;
            if (this._layer.eachLayer(function(e) {
                e._radius && (e.properties.radius = e.getRadius()),
                e._popup && e._popup._isOpen && (delete t.sel,
                e.properties.popupIsOpen = !0),
                i.push(e.properties),
                e.properties && (l += 1)
            }
            ),
            0 === l)
                return !1;
            for (var p, c, d = this._layer.toGeoJSON(), u = d.features, g = [], o = 0, n = u.length; n > o; o++)
                c = u[o],
                p = $.extend(!0, {}, c),
                a(p.geometry.coordinates),
                i[o] && (p.properties = $.extend({}, i[o]),
                delete p.properties.measure_form,
                g.push(p));
            d.features = g;
            var h = JSON.stringify(d);
            h = this._compressJson(h);
            var m = encodeURIComponent(this.options.saveMode + "," + h);
            m = m.replace(/%3A/g, ":"),
            m = m.replace(/%3A/g, ":"),
            t.md = m
        }
    },
    _onApplyParams: function(e, t) {
        if (t.MD) {
            var a = decodeURIComponent(t.MD)
              , r = a.search(",")
              , o = a.substring(0, r)
              , n = a.substring(r + 1);
            if ("url" === o) {
                n = this._uncompressJson(n);
                var s, i = JSON.parse(n), l = L.geoJson(i), p = this;
                l.eachLayer(function(e) {
                    var t = {
                        Point: "marker",
                        LineString: "polyline",
                        Polygon: "polygon"
                    };
                    if ("Point" === e.feature.geometry.type) {
                        var a = e.feature.geometry.coordinates;
                        s = L.marker([a[1], a[0]]),
                        s.properties = $.extend(!0, {}, e.feature.properties)
                    } else
                        s = e;
                    p.onCreated({
                        _silent: !0,
                        layerType: t[e.feature.geometry.type],
                        layer: s
                    })
                }
                )
            }
        }
    },
    _proxyListeners: function() {
        this.__onRowClick = $.proxy(this._onRowClick, this)
    },
    onRemove: function() {},
    readableDistance: function(e, t) {
        t = t || 1;
        var a = "m"
          , r = 0;
        if (1 === t && e >= 1e3 || 2 === t && e >= 1e5) {
            var o = Math.pow(1e3, t - 1);
            e /= o,
            e /= 1e3,
            r = 3,
            a = "km"
        }
        return a = 1 === t ? a : a + t,
        utils.round(e, r) + " " + a
    },
    onNodeClick: function(e) {
        var t = e.latlng || null 
          , a = this._nodes;
        if (this._labels = this._labels || [],
        t && a.push(t),
        a.length > 1) {
            var r = a.slice(a.length - 2)
              , o = utils.getLength(r);
            if (0 >= o)
                return !1;
            var n = L.latLng((r[0].lat + r[1].lat) / 2, (r[0].lng + r[1].lng) / 2)
              , s = utils.createLabel(n, this.readableDistance(o, 1), "leaflet-maplabel leaflet-maplabel-small");
            this._layer.addLayer(s),
            this._labels.push(s);
            var i = $(".leaflet-maplabel.leaflet-maplabel-small:last");
            i.css({
                "margin-left": -i.width() / 2 + "px"
            })
        }
    },
    _createCoordsHtml: function(e, t) {
        t = t || !1;
        var a = utils.projectLatLng(e, "EPSG:4326", "EPSG:3006")
          , r = utils.projectLatLng(e, "EPSG:4326", "EPSG:3008")
          , o = utils.projectLatLng(e, "EPSG:4326", "EPSG:3021")
          , n = ""
          , s = ""
          , i = "";
        return t || (n = " hidden",
        s = '<div style="margin-bottom:1em;">[' + this.lang.draggableMarker + "]</div>",
        i = '<br><button ondrag="return false;" class="btn btn-primary btn-sm"><i class="fa fa-plus"></i>&nbsp;&nbsp;' + this.lang.moreCoords + "</button></div></div>"),
        html = s + "<div><strong>WGS 84 (EPSG:4326)</strong><br>Lat: &nbsp;" + utils.round(e.lng, 5) + "<br>Lon: &nbsp;" + utils.round(e.lat, 5) + "<div>" + i,
        html += "<br><div class='measuredraw-morecoords" + n + "'><strong>Sweref99 TM (EPSG:3006)</strong><br>East: &nbsp;" + utils.round(a.lng) + "<br>North: &nbsp;" + utils.round(a.lat) + "<br><br><strong>Sweref99 13 30 (EPSG:3008)</strong><br>East: &nbsp;" + utils.round(r.lng) + "<br>North: &nbsp;" + utils.round(r.lat) + "<br><br><strong>RT90 2.5 gon V (EPSG:3021)</strong><br>East: &nbsp;" + utils.round(o.lng) + "<br>North: &nbsp;" + utils.round(o.lat) + "</div>",
        html
    },
    _getLabel: function(e) {
        var t;
        return this._layer.eachLayer(function(a) {
            a._parentFeature && a._parentFeature === e && (t = a)
        }
        ),
        t
    },
    onCreated: function(e) {
        var t = this;
        this._deactivateAll();
        var a = e.layerType
          , r = e.layer;
        if (r.properties && r.properties.radius) {
            var o = r.properties;
            a = "circle",
            r = L.circle(r._latlng, r.properties.radius),
            r.properties = o
        }
        if (r.setStyle)
            switch (a) {
            case "polyline":
                r.setStyle(this.options.stylePolyline);
                break;
            default:
                r.setStyle(this.options.stylePolygon)
            }
        "marker" === a && (r.options.draggable = !0,
        r.on("dragstart", function(e) {
            var t = e.target;
            t.closePopup()
        }
        ),
        r.on("drag", function(e) {
            var a = e.target
              , r = t._getLabel(a);
            r.setLatLng(a.getLatLng());
            var o = t._createCoordsHtml(a.getLatLng());
            $(r._icon).html(o);
            var n = $(".alert");
            if (n.length) {
                var s = smap.cmd.notify(t._createCoordsHtml(a.getLatLng(), !0), "blank");
                s.addClass("notify-transition notify-visible")
            }
        }
        )),
        this._layer.addLayer(r),
        r.options.layerId = r._leaflet_id,
        r.feature && (r.properties = r.feature.properties || r.properties,
        delete r.feature),
        r.properties && (r.properties.measure_form || r.properties.measure_text) || (r.properties = {
            id: r._leaflet_id,
            measure_form: '<div class="measuredraw-popup-div-save"><textarea class="form-control" placeholder="' + this.lang.clickToAddText + '" rows="3"></textarea></div>',
            measure_text: ""
        }),
        r.properties.id = r._leaflet_id,
        r._measureDrawFeature = !0,
        this._layer.fire("load"),
        r.unbindPopup();
        var n, s, i, l = "";
        switch (a) {
        case "marker":
            var p = n = r.getLatLng();
            l = this._createCoordsHtml(p);
            break;
        case "polyline":
            var c = r.getLatLngs();
            n = c[parseInt(c.length / 2)],
            s = utils.getLength(c),
            l = this.lang.len + ": &nbsp;" + this.readableDistance(s, 1) + "<br>";
            break;
        case "polygon":
            n = r.getBounds().getCenter();
            var c = r.getLatLngs();
            c.push(c[0]);
            var i = L.GeometryUtil.geodesicArea(c);
            s = utils.getLength(c),
            l = this.lang.circumference + ": &nbsp;" + this.readableDistance(s, 1) + "<br>" + this.lang.area + ": &nbsp;" + this.readableDistance(i, 2);
            break;
        case "circle":
            n = r.getBounds().getCenter();
            var d = r.getRadius();
            i = d * d * Math.PI,
            s = 2 * d * Math.PI,
            l = this.lang.circumference + ": &nbsp;" + this.readableDistance(s, 1) + "<br>" + this.lang.radius + ": &nbsp;" + this.readableDistance(d, 1) + "<br>" + this.lang.area + ": &nbsp;" + this.readableDistance(i, 2);			
            break;
        case "rectangle":
            n = r.getBounds().getCenter();
            var c = r.getLatLngs();
            c.push(c[0]);
            var i = L.GeometryUtil.geodesicArea(c);
            s = utils.getLength(c),
            l = this.lang.circumference + ": &nbsp;" + this.readableDistance(s, 1) + "<br>" + this.lang.area + ": &nbsp;" + this.readableDistance(i, 2)
        }
        var u = r._leaflet_id
          , g = "measuredrawlabel_" + u + "_"
          , h = "leaflet-maplabel " + g;
        if (L.Browser.touch)
            ;
        else {
            (e._silent || "rectangle" === a) && r.getLatLngs && (this._nodes = [],
            $.each(r.getLatLngs(), function(e, a) {
                t.onNodeClick({
                    latlng: a
                })
            }
            ));
            var m = utils.createLabel(n, l, h);
            if (this._layer.addLayer(m),
            r.on("mouseover", this.onMouseOver),
            r.on("mouseout", this.onMouseOut),
            m.options.clickable = !0,
            "marker" === a) {
                var f = function() {
                    if (t.options.moreCoordsAsModal) {
                        var e = t._createCoordsHtml(r.getLatLng(), !0);
                        smap.cmd.notify(e, "blank", {
                            fade: !0
                        })
                    } else {
                        var a = $(this)
                          , o = a.parent().parent().parent();
                        o.find(".measuredraw-morecoords").toggleClass("hidden"),
                        a.parent().remove()
                    }
                    return !1
                }
                  , b = function() {
                    var e = $(this);
                    e.find("button").off("click", f).on("click", f)
                }
                ;
                $(m._icon).on("mouseenter", b),
                $(m._icon).on("click", function() {
                    return !1
                }
                )
            }
            this._labels = this._labels || [],
            this._labels.push(m);
            for (var _ = this._labels || [], v = 0, y = _.length; y > v; v++)
                _[v]._parentFeature = r;
            this._labels = [];
            var w = $(".leaflet-maplabel:last");
            "marker" === a && w.css("transition", "none"),
            w.css({
                "margin-left": -w.width() / 2 - 15 + "px"
            })
        }
        e._silent ? r.properties && r.properties.popupIsOpen && (delete r.properties.popupIsOpen,
        this.map.fire("selected", {
            feature: r,
            selectedFeatures: [],
            layer: this._layer
        })) : w && (w.addClass("leaflet-maplabel-hover"),
        setTimeout(function() {
            w.removeClass("leaflet-maplabel-hover")
        }
        , 2e3))
    },
    onMouseOver: function(e) {
        var t = $(".measuredrawlabel_" + e.target._leaflet_id + "_");
        t.addClass("leaflet-maplabel-hover")
    },
    onMouseOut: function(e) {
        $(".measuredrawlabel_" + e.target._leaflet_id + "_").removeClass("leaflet-maplabel-hover")
    },
    _setLabels: function() {
        var e = L.drawLocal.draw;
        $.extend(!0, e.handlers, this.lang.handlers || {})
    },
    _selection: function(e) {
        var t, a, r = [smap.cmd.getControl("L.Control.SelectWMS"), smap.cmd.getControl("L.Control.SelectVector")];
        for (a = 0; a < r.length; a++)
            t = r[a],
            t && (e === !0 ? t.activate() : t.deactivate())
    },
    _initDraw: function() {
        this._layer = L.featureGroup(),
        this._layer.options = {
            layerId: this.options.layerName,
            popup: "${measure_text}${measure_form}",
            uniqueKey: "id"
        },
        this.map.addLayer(this._layer),
        this._drawControl = new L.Control.Draw({
            draw: {
                marker: !1,
                polyline: !1,
                polygon: !1,
                rectangle: !1,
                circle: !1
            },
            edit: null 
        }),
        this._onCreated = this._onCreated || $.proxy(this.onCreated, this),
        this._onNodeClick = this._onNodeClick || $.proxy(this.onNodeClick, this),
        this._onPopupOpen = this._onPopupOpen || $.proxy(this.onPopupOpen, this),
        this.map.on("draw:created", this._onCreated);
        var e = this;
        e.map.on("click", function() {
            this._removeAlerts()
        }
        , this),
        this.map.on("draw:drawstart", function() {
            e._nodes = [],
            e._selection(!1),
            e.map.on("click", e._onNodeClick)
        }
        ),
        this.map.on("draw:drawstop", function(t) {
            e.map.off("click", e._onNodeClick),
            e._nodes && _.indexOf(["polygon", "rectangle"], t.layerType) > -1 && e._onNodeClick({
                latlng: e._nodes[0]
            }),
			/*Mohammad chnage:
			/*e._selection(!0)
			setTimeout(function(){e._selection(!0)},50)
			/*Mohammad chnage:
            
        }
        ),
        this.map.on("popupopen", this._onPopupOpen)
    },
    _removeFeature: function(e) {
        var t = this;
        this.map.fire("unselected", {}),
        this.map._popup && this.map.closePopup();
        this._labels;
        e.off(),
        this._layer.eachLayer(function(a) {
            a._parentFeature && a._parentFeature === e && (a.off(),
            t.map.removeLayer(a))
        }
        ),
        this._layer.removeLayer(e)
    },
    onPopupOpen: function(e) {
        var t = this;
        this._removeAlerts();
        var a = e.popup && e.popup._source ? e.popup._source : null ;
        if (a && a._measureDrawFeature) {
            var r = smap.cmd.getControl("L.Control.SelectWMS");
            r._dblclickWasRegistered = !0,
            r && setTimeout(function() {
                r._dblclickWasRegistered = !1
            }
            , 400);
            var o = $(".measuredraw-popup-div-save textarea")
              , n = '<br><br><button class="btn btn-default btn-sm measuredraw-btn-popupremove">' + this.lang.remove + "</button>"
              , s = e.popup
              , i = s.getContent();
            if (-1 === i.search("measuredraw-btn-popupremove") && (i += n,
            s.setContent(i),
            s.update(),
            o = $(".measuredraw-popup-div-save textarea")),
            $(".leaflet-popup-content").find(".measuredraw-btn-popupremove").on("click", function() {
                return t._removeFeature(a),
                !1
            }
            ),
            o.length) {
                o.placeholder(),
                o.tooltip({
                    placement: "top",
                    title: this.lang.helpTextSavePopup,
                    container: ".leaflet-popup",
                    trigger: "manual"
                }),
                o.on("keypress", function() {
                    $(".tooltip:visible").length || $(this).tooltip("show")
                }
                );
                var l = utils.getBrowser();
                o.on("focus", function() {
                    $(".measuredraw-btn-popupremove").prop("disabled", !0),
                    (l.ie10 || l.ie11) && $(this).val("")
                }
                );
                {
                    this.lang.clickToAddText
                }
                o.on("blur", function() {
                    $(".measuredraw-btn-popupremove").prop("disabled", !1),
                    $(this).tooltip("hide");
                    var t = e.popup._source
                      , a = $(this).val();
                    "" === a || (t.properties.measure_text = a,
                    t.properties.measure_form = "",
                    t.closePopup())
                }
                )
            }
        }
    },
    _getDrawToolbar: function(e) {
        var t;
        for (var a in this._drawControl._toolbars)
            if (t = this._drawControl._toolbars[a],
            t && t._modes && t._modes[e])
                return t._modes[e];
        return null 
    },
    _deactivateAll: function() {
        var e = this._tools;
        for (var t in e)
            e[t].disable(),
            this.$container.find(".dropdown-menu li.active").removeClass("active");
        this._removeAlerts()
    },
    _removeAlerts: function() {
        var e = $(".alert");
        e.length && (e.removeClass("notify-visible"),
        setTimeout(function() {
            e.remove()
        }
        , 500))
    },
    _onRowClick: function(e) {
        var t = "li" === e.target.tagName ? $(e.target) : $(e.target).parents("li")
          , a = t.data("geomType");
        return t.hasClass("active") ? (t.removeClass("active"),
        this._tools[a].disable()) : (this._deactivateAll(),
        t.toggleClass("active"),
        this._tools[a].enable(),
        setTimeout(function() {
            $(".leaflet-control-measuredraw .dropdown-menu").dropdown("toggle")
        }
        , 200)),
        !1
    },
    _createRow: function(e) {
        var t = $('<li><a><div><span class="drawicons ' + e.cl + '"></span><span>' + e.label + "</span></div></a></li>");
        t.data("geomType", e.geomType),
        t.on("click", this.__onRowClick);
        var a = L.Draw[utils.capitalize(e.geomType)]
          , r = new a(this.map,this._drawControl.options.draw[e.geomType]);
        r.options.shapeOptions = r.options.shapeOptions || {};
        var o = {};
        switch (e.geomType) {
        case "polyline":
            o = this.options.stylePolyline;
            break;
        default:
            o = this.options.stylePolygon
        }
        return $.extend(r.options.shapeOptions, o),
        this._tools[e.geomType] = r,
        t
    },
    _createBtn: function() {
        var e = [{
            label: this.lang.drawPoint,
            cl: "leaflet-draw-draw-marker",
            geomType: "marker"
        }, {
            label: this.lang.drawLine,
            cl: "leaflet-draw-draw-polyline",
            geomType: "polyline"
        }, {
            label: this.lang.drawPolygon,
            cl: "leaflet-draw-draw-polygon",
            geomType: "polygon"
        }, {
            label: this.lang.drawCircle,
            cl: "leaflet-draw-draw-circle",
            geomType: "circle"
        }, {
            label: this.lang.drawRectangle,
            cl: "leaflet-draw-draw-rectangle",
            geomType: "rectangle"
        }]
          , t = $('<div class="btn-group"><button type="button" title="' + this.lang.btnTitle + '" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><span class="drawicons leaflet-draw-draw-marker measuredraw-btntoggle-image"></span></button><ul class="dropdown-menu" role="menu"></ul></div>');
        utils.getBrowser().ie && t.find(".measuredraw-btntoggle-image").css({
            "background-position": "-120px 0"
        });
        for (var a, r, o = t.find(".dropdown-menu"), n = 0, s = e.length; s > n; n++)
            r = e[n],
            a = this._createRow(r),
            o.append(a);
        return this.$container.append(t),
        t
    }
}),
L.control.measureDraw = function(e) {
    return new L.Control.MeasureDraw(e)
}
;*/
L.Control.MalmoHeader = L.Control.extend({
    options: {
        position: "bottomright"
    },
    _lang: {
        sv: {
            exampleLabel: "Ett exempel"
        },
        en: {
            exampleLabel: "An example"
        }
    },
    _setLang: function(e) {
        e = e || smap.config.langCode,
        this._lang && (this.lang = this._lang ? this._lang[e] : null )
    },
    initialize: function(e) {
        L.setOptions(this, e),
        this._setLang(e.langCode)
    },
    onAdd: function(e) {
        this.map = e,
        this._container = L.DomUtil.create("div", "leaflet-control-MalmoHeader"),
        L.DomEvent.disableClickPropagation(this._container),
        this.$container = $(this._container);
        var t = '<!--[if IE]><meta content="IE=edge" http-equiv="X-UA-Compatible" /><![endif]-->    <!--[if lte IE 8]><script src="//assets.malmo.se/external/v4/html5shiv-printshiv.js" type="text/javascript"></script><![endif]-->    <link href="//assets.malmo.se/external/v4/masthead_standalone.css" media="all" rel="stylesheet" type="text/css"/>    <!--[if lte IE 8]><link href="//assets.malmo.se/external/v4/legacy/ie8.css" media="all" rel="stylesheet" type="text/css"/><![endif]-->    <noscript><link href="//assets.malmo.se/external/v4/icons.fallback.css" rel="stylesheet"></noscript>    <link rel="icon" type="image/x-icon" href="//assets.malmo.se/external/v4/favicon.ico" />';
        return $("head").prepend(t),
        $("body").addClass("mf-v4 no-footer"),
        $("body").append('<script src="//assets.malmo.se/external/v4/masthead_standalone_without_jquery.js"></script>'),
        this._container
    },
    onRemove: function() {
        $("#malmo-masthead").remove()
    }
}),
L.control.malmoHeader = function(e) {
    return new L.Control.MalmoHeader(e)
}
;



/*////////////Kristianstad Header////////////////////////////////////////*/

L.Control.KristianstadHeader = L.Control.extend({
    options: {
        position: "bottomright"
    },
    _lang: {
        sv: {
            exampleLabel: "Ett exempel"
        },
        en: {
            exampleLabel: "An example"
        }
    },
    _setLang: function(e) {
        e = e || smap.config.langCode,
        this._lang && (this.lang = this._lang ? this._lang[e] : null )
    },
    initialize: function(e) {
        L.setOptions(this, e),
        this._setLang(e.langCode)
    },
    onAdd: function(e) {
        this.map = e,
        this._container = L.DomUtil.create("div", "leaflet-control-KristianstadHeader"),
        L.DomEvent.disableClickPropagation(this._container),
        this.$container = $(this._container);
        
        var t = '<!--[if IE]><meta content="IE=edge" http-equiv="X-UA-Compatible" /><![endif]-->    <!--[if lte IE 8]><script src="v4/html5shiv-printshiv.js" type="text/javascript"></script><![endif]-->    <link href="v4/masthead_standalone.css" media="all" rel="stylesheet" type="text/css"/>    <!--[if lte IE 8]><link href="v4/ie8.css" media="all" rel="stylesheet" type="text/css"/><![endif]-->    <noscript><link href="v4/icons.fallback.css" rel="stylesheet"></noscript>    <link rel="icon" type="image/x-icon" href="http://kartor.kristianstad.se/kkarta4/img/favicon.png" />';
        return $("head").prepend(t),
        $("body").addClass("mf-v4 no-footer"),
        $("body").append('<script src="v4/masthead_standalone_without_jquery.js"></script>'),
        this._container
    },
    onRemove: function() {
        $("#malmo-masthead").remove()
    }
}),
L.control.kristianstadHeader = function(e) {
    return new L.Control.KristianstadHeader(e)
}
;


/*////////////Kristianstad Header////////////////////////////////////////*/



L.Control.Menu = L.Control.extend({
    options: {
        position: "topright",
        btnID: "my-btn"
    },
    _lang: {
        sv: {
            caption: "Exempeltext som jag ändrar"
        },
        en: {
            caption: "Share position link"
        }
    },
    _setLang: function(n) {
        n = n || smap.config.langCode,
        this._lang && (this.lang = this._lang ? this._lang[n] : null )
    },
    initialize: function(n) {
        L.setOptions(this, n),
        this._setLang(n.langCode)
    },
    onAdd: function(n) {
        this.map = n,
        this._container = L.DomUtil.create("div", "leaflet-control-Menu"),
        L.DomEvent.disableClickPropagation(this._container),
        this.$container = $(this._container),
        this._createMenu();
        var a = "";
        return this.options.btnID && (a = this.options.btnID),
        this.addButton(a, "My button", "fa fa-link", function() {
            return !1
        }),
        this._container
    },
    addButton: function(n, a, t, o, i) {
        i = i || {};
        var s = n || ""
          , 
        e = $('<li><a id="' + s + '" href="btn btn-default"><span class="' + t + '"></span> ' + a + "</a></li>");
        i.proxy && (o = $.proxy(o, i.proxy)),
        e.on("click", o),
        $("#btns").append(e),
        i.callback && i.callback(e)
    },
    _createMenu: function() {
        var n = $('<header id="smap-menu-div" class="navbar navbar-static-top bs-docs-nav" role="banner"><div class="container"><div class="navbar-header">    <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".bs-navbar-collapse">      <span class="sr-only">Toggle navigation</span>      <span class="fa fa-bars"></span>    </button><a class="navbar-brand" href="#">Stadsatlas</a>  </div>  <nav class="collapse navbar-collapse bs-navbar-collapse" role="navigation">    <ul id="btns" class="nav navbar-nav navbar-right">    </ul>  </nav></div></header>');
        $("#maindiv").prepend(n)
    },
    onRemove: function() {}
}),
L.control.menu = function(n) {
    return new L.Control.Menu(n)
}
;
L.Control.Opacity = L.Control.extend({
    options: {
        position: "bottomright",
        addToMenu: !1
    },
    _lang: {
        sv: {
            caption: "Ändra genomskinlighet på lager",
            close: "Stäng",
            collapsebtn: "visa/dölj lagerlista",
            btntitle: "Justera transparens",
            prefTxt: "Spara inställningar"
        },
        en: {
            caption: "Transparency tool",
            close: "Close",
            collapsebtn: "show/hide layers",
            btntitle: "Adjust transparency",
            prefTxt: "Save settings"
        }
    },
    _setLang: function(t) {
        t = t || smap.config.langCode,
        this._lang && (this.lang = this._lang ? this._lang[t] : null )
    },
    initialize: function(t) {
        L.setOptions(this, t),
        this._setLang(t.langCode)
    },
    onAdd: function(t) {
        var a = this;
        return a.allNamesInGui = [],
        t.on("layeradd layerremove", function(t) {
            if (t.layer.options && t.layer.options.layerId && !t.layer.feature) {
                var e = t.layer.options.layerId;
                if (-1 == $.inArray(e, a.allNamesInGui))
                    a.allNamesInGui.push(e);
                else if ("layerremove" === t.type) {
                    var o = $.inArray(e, a.allNamesInGui);
                    a.allNamesInGui.splice(o, 1),
                    $("#op-rowsdiv").find("#" + e).remove()
                }
            }
        }),
        a._container = L.DomUtil.create("div", "leaflet-control-Opacity"),
        L.DomEvent.disableClickPropagation(a._container),
        a.$container = $(a._container),
        a._createBtn(),
        a._container
    },
    _setOp100: function() {
        if (L.Control.Opacity.prototype.SliderList) {
            if (L.Control.Opacity.prototype.SliderList.length > 0) {
                for (var i = 0; i < L.Control.Opacity.prototype.SliderList.length; i++) {
                    L.Control.Opacity.prototype.SliderList[i].slider('setValue', 100, false, true)
                }
            }
        }
    },
    
    _addLayers: function(t) {
        L.Control.Opacity.prototype.SliderList = [];
        var e = $("<div class='op-opdiv'><button style='display:none;' id='op-collapsebtn' type='button' class='btn' data-toggle='collapse' data-target='#op-rowsdiv'>" + this.lang.collapsebtn + "</button><div id='op-rowsdiv' class='collapse in'></div></div>")
          , 
        o = e.children("#op-rowsdiv");
        return a = 0,
        $.each(t, function() {
            var t = smap.core.layerInst._getLayer(this);
            //Mohammad Change
            //if (null  != t) {
            if (null  != t && t.options.layerId != "measurelayer" && (typeof t.options.isMultipleBaseLayer === "undefined" || t.options.isMultipleBaseLayer === null  && t.options.isMultipleBaseLayer !== !0)) {
                //Mohammad Change
                var e = null  != t.options.opacity ? t.options.opacity : 1
                  , 
                n = Math.round(100 * e)
                  , 
                i = $("<div class='op-rows' id='" + t.options.layerId + "' ><span class='op-mapname'>" + t.options.displayName + "</span><input class='op-sliderdiv' data-slider-tooltip='hide'data-slider-id='slider" + a + "' type='text' data-slider-min='0' data-slider-max='100' data-slider-value='" + n + "' data-slider-step='1'/><span class='op-values'>" + n + "</span>");
                var cre_sli = i.children("input").slider();
                L.Control.Opacity.prototype.SliderList.push(cre_sli);
                cre_sli.on("change", function(t) {
                    var a = $(this).closest("div.op-rows")
                      , 
                    e = a.get(0).id
                      , 
                    currentLg = smap.core.layerInst._getLayer(e);
                    if (currentLg && currentLg.options && currentLg.options.mergeLayers) {
                        if (currentLg.options.mergeLayers.length > 0) {
                            if (smap.cmd.mergeLayers && smap.cmd.mergeLayers.mergeLayers) {
                                for (mglg in smap.cmd.mergeLayers.mergeLayers) {
                                    if (mglg.split('_mergedLayer_')[1] === e) {
                                        var o = smap.core.layerInst._getLayer(mglg);
                                        o.setOpacity ? o.setOpacity(t.value.newValue / 100) : o.options.style && o.setStyle({
                                            opacity: t.value.newValue / 100,
                                            fillOpacity: t.value.newValue / 100
                                        });
                                        a.children("span.op-values").text(t.value.newValue)
                                    
                                    
                                    }
                                }
                            
                            }
                        
                        }
                    }
                    
                    var o = smap.core.layerInst._getLayer(e);
                    o.setOpacity ? o.setOpacity(t.value.newValue / 100) : o.options.style && o.setStyle({
                        opacity: t.value.newValue / 100,
                        fillOpacity: t.value.newValue / 100
                    }),
                    a.children("span.op-values").text(t.value.newValue)
                
                
                }).on("slideStart", function() {
                    $("#op-modal").addClass("op-modal-slideeffect")
                }).on("slideStop", function() {
                    $("#op-modal").removeClass("op-modal-slideeffect")
                }),
                a += 1,
                o.append(i)
            }
        }),
        e
    },
    
    _onClose: function() {
        this.options.savePrefBox && 0 == $("#op-prefs").is(":checked") && $.each($("div.op-rows"), function() {
            smap.core.layerInst._getLayer(this.id).setOpacity ? smap.core.layerInst._getLayer(this.id).setOpacity(1) : theLyr.options.style && theLyr.setStyle({
                opacity: 1,
                fillOpacity: 1
            }),
            $(this).children("span.op-values").text(100)
        })
    },
    activate: function() {
        
        var t = this
          , 
        a = t._addLayers(t.allNamesInGui);
        if (!t._$dialog) {
            if (t.options.savePrefBox && 1 == t.options.savePrefBox)
                var e = "<div id='op-prefdiv'><label for='op-prefs'>" + t.lang.prefTxt + "</label><input id='op-prefs' type='checkbox'  name='saveprefs' checked /></div><button type='button' class='btn btn-default' data-dismiss='modal'>" + this.lang.close + "</button>";
            else
                var e = '<button id="_setOP100" class="btn btn-default" onclick="L.Control.Opacity.prototype._setOp100();">Sätt alla på 100</button><button type="button" class="btn btn-default" data-dismiss="modal">' + this.lang.close + "</button>";
            t._$dialog = utils.drawDialog(t.lang.caption, a, e),
            t._$dialog.attr("id", "op-modal"),
            $('#_setOP100').on('click', function() {
                t._setOp100();
            
            }),
            t._$dialog.on("hidden.bs.modal", function() {
                t._onClose(),
                t._$dialog.empty().remove(),
                t._$dialog = null 
            })
        
        }
        t._$dialog.modal("show");
        //M
        if ($('.modal-backdrop.fade.in')) {
            if ($('.modal-backdrop.fade.in').length > 0) {
                $('.modal-backdrop.fade.in')[0].style.opacity = 0;
            }
        }
        //M
    },
    _createBtn: function() {
        var t = this;
        if (t.options.addToMenu)
            smap.cmd.addToolButton("", "fa fa-adjust", function() {
                return t.activate(),
                !1
            }, null );
        else {
            //HU Change
            //var a = $('<button id="smap-opacity-btn" title="' + t.lang.btntitle + '" class="btn btn-default"><span class="fa fa-adjust"></span></button>');
            var a = $('<button id="smap-opacity-btn" title="' + t.lang.btntitle + '" class="btn btn-default"><span class="fa fa-opacity"><img class="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAQAAADYWf5HAAAAAXNSR0IArs4c6QAAAHBJREFUKM+VkkEOgCAMBKfEh+nLqi+Tn+EBSCxYgT0BmexuaCWRddUDACoYSeqQLzR4kH0PTEnOxiua212CNx+pwSomNOJ3nOwWRl7Zb9VtgLVjeWtfduvH3HuV0QMcyUMM5q8AqKx/iNdRxYT+bfEDEF4eXRN1RNoAAAAASUVORK5CYII="></span></button>');
            //HU
            //HU Change
            a.on("click", function() {
                return t.activate(),
                !1
            }),
            t.$container.append(a)
        }
    },
    onRemove: function() {}
}),
L.control.opacity = function(t) {
    return new L.Control.Opacity(t)
}
;
L.Control.Print = L.Control.extend({
    options: {
        position: "topleft",
        printUrl: "//localhost/print-servlet/print",
        compactConditions: !1
    },
    _lang: {
        sv: {
            caption: "Skriv ut",
            mTitle: "Skriv ut/Exportera",
            header: "Rubrik",
            tip_header: "Rubrik (valfritt)",
            descript: "Beskrivning",
            tip_descript: "Beskrivning (valfritt)",
            layout: "Pappersformat",
            resolution: "Upplösning",
            orientation: "Orientering",
            portrait: "Stående",
            landscape: "Liggande",
            create: "Skapa bild",
            close: "Stäng",
            loading: "Laddar…",
            processingPrint: "Skapar bild…",
            northarrow: "Nordpil",
            scale: "Skala",
            misc: "Övrigt",
            legend: "Teckenförklaring",
            couldNotLoadCapabilities: "Kan inte skriva ut/exportera. Fick inget/felaktigt svar från servern.",
            conditionsHeader: "Jag godkänner <span>användarvillkoren</span>",
            /*Mohammad Change*/
            /*conditions: 'För utdrag från kartan/flygfotot till tryck eller annan publicering, krävs tillstånd från Malmö Stadsbyggnadskontor. Vid frågor om tillstånd, användningsområden eller kartprodukter kontakta Stadsbyggnadskontorets kartförsäljning:<br>040-34 24 35 eller <a href="mailto:sbk.sma@malmo.se?subject=Best%E4lla karta">sbk.sma@malmo.se</a>.',*/
            conditions: 'För utdrag från kartan/flygfotot till tryck eller annan publicering, krävs tillstånd från Kristianstads kommun miljö- och samhällsbyggnadsförvaltningen. Vid frågor om tillstånd, användningsområden eller kartprodukter kontakta miljö- och samhällsbyggnadsförvaltningen kartförsäljning:<br>044-13 50 00 eller <a href="mailto:msf@kristianstad.se?subject=Best%E4lla karta">msf@kristianstad.se</a>.',
            /*Mohammad Change*/
            conditionsTip: "För att kunna skriva ut måste du godkänna användarvillkoren.",
            confirm: "Kom ihåg mitt val"
        },
        en: {
            caption: "Print",
            mTitle: "Print/Export",
            header: "Rubrik",
            tip_header: "Header (optional)",
            descript: "Description",
            tip_descript: "Description (optional)",
            layout: "Layout",
            resolution: "Resolution",
            orientation: "Orientation",
            portrait: "Portrait",
            landscape: "landscape",
            create: "Create image",
            close: "Close",
            loading: "Loading…",
            processingPrint: "Creating image…",
            northarrow: "North arrow",
            scale: "Scale",
            misc: "Miscellaneous",
            legend: "Legend",
            couldNotLoadCapabilities: "Cannot print/export. Bad response from the server.",
            conditionsHeader: "I agree to these <span>terms</span>",
            conditions: 'For excerpts from the map or aerial photo for commercial printing or other types of publication, permission is required from the City Planning Office. For questions about these terms or map products, please contact our sales office: <br> +46 40 34 24 35 or <a href="mailto:sbk.sma@malmo.se?subject=Best%E4lla karta">sbk.sma@malmo.se</a>.',
            conditionsTip: "To print you must agree to the user terms.",
            confirm: "Remember my choice"
        
        }
    },
    _setLang: function(t) {
        t = t || smap.config.langCode,
        this._lang && (this.lang = this._lang ? this._lang[t] : null )
    },
    initialize: function(t) {
        L.setOptions(this, t),
        this._setLang(t.langCode)
    },
    onAdd: function(t) {
        return this.map = t,
        this._container = L.DomUtil.create("div", "leaflet-control-Print"),
        L.DomEvent.disableClickPropagation(this._container),
        this.$container = $(this._container),
        this._createBtn(),
        this._initPrint(),
        this._drawModal(),
        this._container
    },
    onRemove: function() {
        this._removeBtn(),
        this._destroyPrint()
    },
    _createBtn: function() {
        var t = this;
        this.$btn = $('<button id="smap-print-btn" title="' + t.lang.caption + '" class="btn btn-default"><span class="fa fa-print"></span></button>'),
        this.$btn.on("click touchstart", function() {
            /*Mohammad Add*/
            window.printRelatedPopup_closed_once = false;
            /*Mohammad: Experiment*/
            /*if (document.getElementById('sprint_a5_label')) {
                document.getElementById('sprint_a5_label').click();
            }
            if (document.getElementById('sprint_a5')) {
                document.getElementById('sprint_a5').checked = true;
            }*/
            /*Mohammad: Experiment*/
            /*Mohammad Add*/
            return t.show(),
            !1
        }),
        this.$container.append(this.$btn)
    },
    _removeBtn: function() {
        this.$btn.remove()
    },
    _initPrint: function() {
        function t() {
            smap.cmd.notify(i.lang.couldNotLoadCapabilities, "error", {
                parent: $(".modal-body")
            }),
            i._modal.off("shown.bs.modal", t)
        }
        var i = this;
        L.mapbox = L.mapbox || {
            TileLayer: L.Class.extend({})
        },
        this.printProvider = L.print.provider({
            method: "POST",
            url: this.options.printUrl,
            autoLoad: !0,
            /*Mohammad Change*/
            /*copy: "© Stadsbyggnadskontoret, Malmö stad",*/
            copy: "© Geodatasamverkan, © Kristianstads kommun",
            /*Mohammad Change*/
            layout: "A4_Portrait_NoArrow_NoBar",
            outputFormat: "pdf",
            map: this.map
        }),
        this.printProvider.on("printexception printsuccess", function() {
            var t = i._modal.find("button[type='submit']");
            t.button("reset"),
            smap.cmd.loading(!1)
        }),
        this.printProvider.on("oncapabilitiesloaderror", function() {
            i._modal && ($(".modal-body").length ? t() : i._modal.on("shown.bs.modal", t))
        }),
        this.printOptions = {
            paperFormat: "A4",
            orientation: "Portrait",
            arrow: !1,
            scalebar: !1,
            dpi: 96,
            legends: []
        },
        this.printProvider.on("capabilitiesload", function(t) {
            t.capabilities.printURL = t.capabilities.printURL.replace(/localhost:8080/g, "localhost").replace(document.domain, "localhost"),
            t.capabilities.createURL = t.capabilities.createURL.replace(/localhost:8080/g, "localhost").replace(document.domain, "localhost"),
            /*Mohammad Add: Print related*/
            L.Control.Print.prototype._savedPrintCapabilities = t.capabilities
            /*Mohammad Add: Print related*/
        })
    },
    _destroyPrint: function() {
        this.printProvider.destroy(),
        this.printProvider = null ,
        this._modal.remove()
    },
    _getMercatorScaleForLat: function() {
        var t = this.map.getCenter().lat
          , 
        i = this.printProvider._getScale()
          , 
        n = 1 / Math.cos(t * Math.PI / 180);
        return i = parseInt(Math.round(i / n))
    },
    _makeLegends: function() {
        var t, i, n, o, e = [], 
        a = this.map._layers;
        for (lid in a)
            t = a[lid],
            o = t.options,
            !o || void 0 !== o.printLegend && o.printLegend === !1 || (o.isBaseLayer ? delete o.printLegend : o && (o.printLegend || t instanceof L.TileLayer.WMS || t instanceof L.GeoJSON.WFS) && (i = o.printLegend,
            i && i.length || (i = -1 === t._url.search(/\?/) ? t._url + "?" : t._url,
            i = i + "request=GetLegendGraphic&format=image/png&width=20&height=20&layer=" + o.layers),
            i && (n = o.displayName || "Unnamed layer"),
            e.push({
                name: n,
                icon: i
            })));
        var r = [{
            name: "Teckenförklaring",
            classes: e
        }];
        return r
    },
    _preprocessPrintOptions: function(t) {
        var i = {
            mapTitle: t.mapTitle,
            comment: t.comment,
            dpi: t.dpi,
            legends: this._makeLegends(),
            displayscale: this.lang.scale + " 1:",
            layout: [t.paperFormat, t.orientation, t.legend ? "Legend" : "NoLegend"].join("_")
        };
        return i
    },
    _preprocessLayers: function() {
        var t, i, n = this.map;
        for (t in n._layers) {
            var o = n._layers[t];
            if (o.options && o.options.layerId) {
                if (i = smap.cmd.getLayerConfig(o.options.layerId),
                !i)
                    continue;
                if (o instanceof L.NonTiledLayer.WMS && !i.options.printLayer) {
                    var e = $.extend(!0, {}, i.options);
                    e.layerId += "1",
                    i.options.printLayer = {
                        url: i.url,
                        init: "L.TileLayer.WMS",
                        options: e
                    },
                    o.options.printLayer = $.extend(!0, {}, i.options.printLayer)
                }
            }
        }
    },
    print: function(t) {
        if (!this.printProvider._capabilities)
            return !1;
        var i = this._modal.find("button[type='submit']");
        i.attr("data-loading-text", this.lang.processingPrint),
        i.button("loading"),
        smap.cmd.loading(!0),
        this._preprocessLayers();
        //this.printProvider.print(t)
        
        if(document.getElementById('select_scale')){
             var currentScale= document.getElementById('select_scale').value;
             this.options.currentScale=currentScale;
        }
        this.printProvider.print(t,this.options)
    },
    _drawModal: function() {
        var t = this
          , 
        i = "resources/PrintModal.html";
        document.URL.search(/\/dev.html/) > -1 && (i = "plugins/Print/" + i);
        var n = L.Browser.touch ? "tap" : "click";
        $.get(i, function(i) {
            i = utils.extractToHtml(i, t.lang),
            /*Mohammad Change*/
            /*t._modal = utils.drawDialog(t.lang.mTitle, i);*/
            /*e = '<button type="button" class="btn btn-default" data-dismiss="modal">Stäng</button>',*/
            t._modal = utils.drawDialog(t.lang.mTitle, i, null , null , "LControlPrint");
            /*Mohammad Change*/
            var o = t._modal.find(".print-conditions");
            t.conditionsCheckbox = t._modal.find('[name="conditions"]'),
            t.submitDiv = t._modal.find("#submitDiv");
            var e = t._modal.find("button[type=submit]")
              , 
            a = t._modal.find("#conditionsLink span")
              , 
            r = t._modal.find('[name="storeAnswer"]');
            t.options.compactConditions ? ("yes" === localStorage.getItem("smapConditionsAgreed") ? (t.conditionsCheckbox.prop("checked", !0),
            r.prop({
                checked: !0,
                disabled: !1
            }),
            e.prop("disabled", !1)) : t.conditionsCheckbox.prop("checked", !1),
            a.addClass("link"),
            r.change(function() {
                t._storeConditions(r.prop("checked"))
            }),
            r.next().on(n, function() {
                var t = $(this).prev();
                return t.prop("checked", !t.prop("checked")),
                !1
            }),
            o.hide(),
            a.on(n, function() {
                o.slideToggle(250)
            })) : (a.append(":"),
            t._modal.find("#store").hide()),
            t.conditionsCheckbox.change(function() {
                t._setButtonState(t.conditionsCheckbox.prop("checked"))
            }),
            t.submitDiv.on(n, function(i) {
                t.conditionsCheckbox.prop("checked") || (t.conditionsCheckbox = $("#printmodal").find('[name="conditions"]'),
                t.conditionsCheckbox.popover({
                    content: t.lang.conditionsTip,
                    trigger: "manual",
                    placement: "right",
                    animation: "false"
                }),
                t.conditionsCheckbox.popover("show"),
                i.stopPropagation(),
                t._modal.one(n, function() {
                    t.conditionsCheckbox.popover("destroy")
                }))
            }),
            
            
            t._modal.attr("id", "printmodal"),
            t._modal.addClass("printmodal"),
            t._modal.find("form").submit(function() {
                var i = utils.paramsStringToObject($(this).serialize(), !1);
                return i = t._preprocessPrintOptions(i),
                t.printProvider.setDpi(i.dpi),
                t.print(i),
                !1
            }),
            smap.event.trigger("smap:print:modaldrawn"),
            t._modal.find("[placeholder]").placeholder();
            /*Mohammad Add: Print related*/
            t.sprint_a3_responsive = t._modal.find("#sprint_a3"),
            t.sprint_a4_responsive = t._modal.find("#sprint_a4"),
            t.sprint_a5_responsive = t._modal.find("#sprint_a5"),
            t.sprint_portrait_responsive = t._modal.find("#sprint_portrait"),
            t.sprint_landscape_responsive = t._modal.find("#sprint_landscape"),
            t._print_adjust_selectScale = t._modal.find("#select_scale");
            
            
            t.sprint_a3_responsive.on('change', function(i) {
                this.checked = true;
                t._drawCaptureBox();
            
            
            }),
            
            t.sprint_a4_responsive.on('change', function(i) {
                this.checked = true;
                t._drawCaptureBox();
            
            
            }),
            t.sprint_a5_responsive.on('change', function(i) {
                this.checked = true;
                t._drawCaptureBox();
            
            
            }),
            t.sprint_portrait_responsive.on('change', function(i) {
                this.checked = true;
                t._drawCaptureBox();
            
            
            }),
            t.sprint_landscape_responsive.on('change', function(i) {
                this.checked = true;
               t._drawCaptureBox();
            
            
            }),

            t._print_adjust_selectScale.on('change', function(i) {             
                t._drawCaptureBox();
				
			if(t._print_scale_header){
				if(t._print_scale_header.options.length>0){
					for(var i=0;i<t._print_scale_header.options.length;i++){
		            if(t._print_scale_header.options[i].value === t._print_adjust_selectScale[0].value){
		            t._print_scale_header.options[i].selected=true;					
		        	break;			
		              }		
	                }	
				}
				
			}					
            }),

            t._modal.on('shown.bs.modal', function() {
				$('#select_scale_header')?$('#select_scale_header').hide():"";
                t._drawCaptureBox();
                /*$('#printmodal')[0].style.opacity=0.8;*/
                $('#printmodal')[0].style.opacity = 1;
				
				
				if(!window._print_scale_header_eventRegistered){					
				    $('#select_scale_header').on('change', $.proxy(function(){	                	
					if(t._print_adjust_selectScale){
						if(t._print_adjust_selectScale[0].options.length>0){
					    for(var i=0;i<t._print_adjust_selectScale[0].options.length;i++){
		                if(t._print_adjust_selectScale[0].options[i].value === t._print_scale_header.value){
		                t._print_adjust_selectScale[0].options[i].selected=true;
					    t._drawCaptureBox();
		        	    break;			
		                  }		
	                    }
							
						}
					}
										
	                },t._print_scale_header)
                    )		        						
				}
				window._print_scale_header_eventRegistered=true;
				
				$('#modalDialogMinimizeID_LControlPrint').on('click touchstart',function(){
					if($('.modal-body')[0].style.display==="none"){
					$('#select_scale_header')[0].style.display="table-row";	
					}else{
					$('#select_scale_header').hide()	
					}
					
					})
				
				
				
				
				
            }),
            t._modal.on('hidden.bs.modal', function() {
                t._removeCaptureBox();
                if (typeof window.popup_print !== "undefined" && window.popup_print !== null ) {
                    smap.map.removeLayer(window.popup_print)
                }
                if (document.getElementById('anvandarvillkoren')) {
                    document.getElementById('anvandarvillkoren').style.display = "table";
                }
                if (document.getElementById('conditions')) {
                    document.getElementById('conditions').style.display = "none"
                }
                ;
            
            }),
            
            t._print_adjust_left = t._modal.find("#print_adjust_left"),
            t._print_adjust_right = t._modal.find("#print_adjust_right"),
            t._print_adjust_plus = t._modal.find("#print_adjust_plus"),
            t._print_adjust_up = t._modal.find("#print_adjust_up"),
            t._print_adjust_down = t._modal.find("#print_adjust_down"),
            t._print_adjust_minus = t._modal.find("#print_adjust_minus"),

            
            t._print_adjust_left.on(n, function(i) {
                smap.map.panBy([-100, 0]);
                /*t._drawCaptureBox();*/
            }),
            t._print_adjust_right.on(n, function(i) {
                smap.map.panBy([100, 0]);
                /*t._drawCaptureBox();*/
            
            }),
            t._print_adjust_plus.on(n, function(i) {
                $('#zoombar-plus').click();
                /*t._drawCaptureBox();*/
            }),
            t._print_adjust_up.on(n, function(i) {
                smap.map.panBy([0, -100]);
               /*t._drawCaptureBox();*/
            }),
            t._print_adjust_down.on(n, function(i) {
                smap.map.panBy([0, 100]);
               /*t._drawCaptureBox();*/
            }),
            t._print_adjust_minus.on(n, function(i) {
                $('#zoombar-minus').click();
                /*smap.map.on("zoomend", function(){if($('#printmodal').hasClass('in')){L.Control.Print.prototype._drawCaptureBox()}})*/
            
            }),
            
            /*t._printModalTransparent=t._modal.find("#printModalTransparent"),
			t._printModalTransparent.slider().on("slide", function(t) {
					$('#printmodal')[0].style.opacity=t.value/100;
                }
				);*/
            
            
            t._print_minimize_alternative = t._modal.find("#minimize_alternative"),
            t._print_anvandarvillkoren = t._modal.find("#anvandarvillkoren"),
            t._print_conditions = t._modal.find("#conditions"),
            t._print_minimize_alternative.on(n, function(i) {
                var click_tap = L.Browser.touch ? "tap" : "click";
				
                if (click_tap === "click") {
                    window.setTimeout(function() {
                        $('#modalDialogMinimizeID_LControlPrint').click();
						$('#select_scale_header')[0].style.display="table-row";
                    }, 200);
                } else if (click_tap === "tap") {
                    window.setTimeout(function() {
                        $('#modalDialogMinimizeID_LControlPrint').tap();
						$('#select_scale_header')[0].style.display="table-row";
                    }, 200);
                }
            }),	
					
            t._print_anvandarvillkoren.on(n, function(i) {
                this.style.display = "none",
                t._print_conditions[0].style.display = "block";
            });
            /*t._print_conditions.on(n,function(i){this.style.display="none",t._print_anvandarvillkoren[0].style.display="block";});*/
            
           
            smap.map.on("zoomend", function() {
                if ($('#printmodal').hasClass('in')) {
            if(document.getElementById('select_scale')){
             var currentScale= document.getElementById('select_scale').value;
             if(currentScale.length===0){
                L.Control.Print.prototype._drawCaptureBox()
             }
              }
                    

                }
            });
            smap.map.on("dragend", function() {
                if ($('#printmodal').hasClass('in')) {
                L.Control.Print.prototype._drawCaptureBox()
                   

                }
            });
            
            /*Mohammad Add: Print related*/
			
		   t._print_scale_header = document.createElement("select");
           t._print_scale_header.id="select_scale_header";
           t._print_scale_header.style.width="35px",t._print_scale_header.style.height="32px",t._print_scale_header.style.float="right",
           t._print_scale_header.style.marginTop="-3px",t._print_scale_header.style.marginRight="3px",t._print_scale_header.style.display = "table-row";
           
           t._print_scale_header.className = "form-control";
           t._print_scale_header.style.backgroundImage ="url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAgCAYAAACYTcH3AAADKUlEQVR42s3YXWyLURgH8Ee2LD4yxkRGh4hvG8MYso52QzAShPiKuCCYjwvqgo0gvjLfJhPZDVN2oTapjrDYdJZITElEiMXH3LhAJIi13Szmf97+t7xpYlNtk/ckv3R71/f06TnPOc/ZKyLihlOwC+7AVlgBVbAe1kEN7IWdcJbyYRtUgA2y4Qb7Wc2+DrO/I1DE3zdAGeyHqXAJimEjyCFYDCmQA2NgKMyBETAc5sIEGMcOlPF8r5X3JoGFPw9jX5NgNF8z+Kr6zII0SIRMfqkLwm+rOo9G68EPXw4rYZXOUgbchwEdEA55TpSCGcAp98ALaID38BkaOZVqtE1gjnYwsTCIUz4f1nAEXsM3qIeJkAtX1A07ojhNqsVBX+aWWgTVTPpaeMY8ms4FoWV4VhSDiYdUBnITHsAerqD2YNTo5Kk3l8OSMD8wBrozYWN119W1yXAUnnIbyeMoFfCaCmQm36P9YUiYwZg41LMgWXddJeVJJuxt2MzVM4rT4gkO5jj3h3BaOmyB3dxP+jFpL8JDcMJa7j/tU2fmKCXpp6kwAsFYmHvF3FOs3FlVkjpgGUdP33rDYCZ4RwJnR2CaLNzyS7h0j8EHLle1uXXr4v6OpV0RgQS2MDfUsn0Odaw96hv3+secM7fXpqwIBHMe3nFE1PQcZKGdx3oV38n9HeUgM2gF/E+bwn3kMTziaJ+D08yFhUzUvzWzNiilTWK66pVkF15DdR3sTTIwNVfGsrIXMHf0bMyJzoJRp4TZgs7uO/xS4/KLO1S3/FJ9zSvOki9azenJbT8xSAL/FtNFAtul3C+NVS3yqa5VvofK/Uu+On3y0uGTTWFOc2BpVzbLx9pW+eFpk7ZQ1f+W5rst8qayJbBhhdHStJOeQYLJ1LYCgwRj1fYpgwSjKvt2owRjqAReAKVGCSZJO/oaJJgZsM8owQRqk0GCCdQmgwQTqE2GWtqqUN6LTKGM47konYfyBD4sUGed/rw+jYfyFP6/pK6N5NLOF7tPXjm80uDyydtQIZCGMq88ufxTe8yhPnwRnIAzfEpRwMctGTz4F/FxiY0H+EI+IlGnTdcfGqCd0GGmQbMAAAAASUVORK5CYII=)";
           t._print_scale_header.style.backgroundRepeat="no-repeat";
           t._print_modal_header = t._modal.find(".modal-header");
               if(t._print_adjust_selectScale){
				   if(t._print_adjust_selectScale[0].options.length>0){
					   
					   for (b = 0; b < t._print_adjust_selectScale[0].options.length; b = b + 1) {
                        option = document.createElement("option");
                        option.value = t._print_adjust_selectScale[0].options[b].value;
                        option.text = t._print_adjust_selectScale[0].options[b].text;
                        t._print_scale_header.appendChild(option);
                    } 
					
					
				    t._print_modal_header[0].appendChild(t._print_scale_header);
					

					
					   
				   }
			   }  
			
			
			
			
        
        })
    },
    _setButtonState: function(t) {
        var i = $("#printmodal").find("button[type=submit]")
          , 
        n = $("#printmodal").find('[name="storeAnswer"]');
        i.prop("disabled", t ? !1 : !0),
        n.prop({
            disabled: t ? !1 : !0
        })
    },
    _storeConditions: function(t) {
        if ("undefined" != typeof Storage) {
            var i = localStorage.getItem("smapConditionsAgreed");
            if ("yes" === i && t)
                return !1;
            i && !t ? localStorage.removeItem("smapConditionsAgreed") : t && localStorage.setItem("smapConditionsAgreed", "yes")
        }
    },
    _loadCapabilities: function() {},
    show: function() {
        var t = this;
        this.printProvider._capabilities || this._loadCapabilities(),
        this._modal ? this._modal.modal("show") : smap.event.off("smap:print:modaldrawn").on("smap:print:modaldrawn", function() {
            t._modal.modal("show")
        })
    },
    /*Mohammad Add: Print related*/
    
    _drawCaptureBox: function() {
        
        this._removeCaptureBox();
        /*var _getScale_current= this.printProvider._getScale();*/
        var _getScale_current = function() {
            var map = smap.map, 
            bounds = map.getBounds(), 
            inchesKm = L.print.Provider.INCHES_PER_METER * 1000, 
            scales = L.Control.Print.prototype._savedPrintCapabilities.scales, 
            sw = bounds.getSouthWest(), 
            ne = bounds.getNorthEast(), 
            halfLat = (sw.lat + ne.lat) / 2, 
            midLeft = L.latLng(halfLat, sw.lng), 
            midRight = L.latLng(halfLat, ne.lng), 
            mwidth = midLeft.distanceTo(midRight), 
            pxwidth = map.getSize().x, 
            kmPx = mwidth / pxwidth / 1000, 
            mscale = (kmPx || 0.000001) * inchesKm * L.print.Provider.DPI, 
            closest = Number.POSITIVE_INFINITY, 
            i = scales.length, 
            diff, 
            scale;
            while (i--) {
                diff = Math.abs(mscale - scales[i].value);
                if (diff < closest) {
                    closest = diff;
                    scale = parseInt(scales[i].value, 10);
                }
            }
            return scale;
        }
        var current_mapPrintCapableScale = _getScale_current();

         if(document.getElementById("select_scale")) {
            var n = document.getElementById("select_scale").value;
            if(n.length>0){
				//20180927
				//current_mapPrintCapableScale = n
				current_mapPrintCapableScale = eval(n)*1.7888404922734575;
				//20180927				
				}
            
        }

        var center_point_3857 = utils.projectLatLng(smap.map.getCenter(), "EPSG:3857");
        
        var paperWidth = 0
          , 
        paperHeight = 0
          , 
        layerId = "noPrintID";
        
        
        if (document.getElementById('sprint_a3').checked === true) {
            if (document.getElementById('sprint_portrait').checked === true) {
                /*Mohammad: Experimental:*/
                /*paperWidth=297,paperHeight=420,layerId='A3_Portrait';*/
                /*paperWidth = 148,
                paperHeight = 210,
                layerId = 'A3_Portrait';*/
                /*Mohammad: Experimental:*/
                /*rollback*/
                paperWidth=297,paperHeight=420,layerId='A3_Portrait';
                /*rollback*/
            } else if (document.getElementById('sprint_landscape').checked === true) {
                /*Mohammad: Experimental:*/
                /*paperWidth=420,paperHeight=297,layerId='A3_Landscale';*/
                /*paperWidth = 210,
                paperHeight = 148,
                layerId = 'A3_Landscale';*/
                /*Mohammad: Experimental:*/
                /*rollback*/
                paperWidth=420,paperHeight=297,layerId='A3_Landscale';
                /*rollback*/
            }
        
        } else if (document.getElementById('sprint_a4').checked === true) {
            
            
            if (document.getElementById('sprint_portrait').checked === true) {
                /*Mohammad: Experimental:*/
                /*paperWidth=210,paperHeight=297,layerId='A4_Portrait';*/
                /*paperWidth = 148,
                paperHeight = 210,
                layerId = 'A4_Portrait';*/
                /*Mohammad: Experimental:*/
                /*rollback*/
                paperWidth=210,paperHeight=297,layerId='A4_Portrait';
                /*rollback*/


            } else if (document.getElementById('sprint_landscape').checked === true) {
                /*Mohammad: Experimental:*/
                /*paperWidth=297,paperHeight=210,layerId='A4_Landscale';*/
                /*paperWidth = 210,
                paperHeight = 148,
                layerId = 'A4_Landscale';*/
                /*Mohammad: Experimental:*/
                /*rollback*/
                paperWidth=297,paperHeight=210,layerId='A4_Landscale';
                /*rollback*/
            }
        
        } else if (document.getElementById('sprint_a5').checked === true) {
            
            
            if (document.getElementById('sprint_portrait').checked === true) {
                
                paperWidth = 148,
                paperHeight = 210,
                layerId = 'A5_Portrait';
            
            } else if (document.getElementById('sprint_landscape').checked === true) {
                
                paperWidth = 210,
                paperHeight = 148,
                layerId = 'A5_Landscale';
            
            }
        
        }
        
        
        
        
        /*console.log(layerId);*/
        
        var size_width = (paperWidth / 1000) / 2
          , 
        size_height = (paperHeight / 1000) / 2
          , 
        offset_height_top = 22 - 1
          , 
        offset_width = 14.5 - 1
          , 
        offset_width_bottom = 21.5 - 1;
        
        var SW_point = utils.projectPoint(center_point_3857.lng - ((size_width - (offset_width / 1000)) * current_mapPrintCapableScale), center_point_3857.lat - ((size_height - (offset_width_bottom / 1000)) * current_mapPrintCapableScale), "EPSG:3857", "EPSG:4326");
        var SW_point_LatLng = L.latLng(SW_point[1], SW_point[0]);
        var NE_point = utils.projectPoint(center_point_3857.lng + ((size_width - (offset_width / 1000)) * current_mapPrintCapableScale), center_point_3857.lat + ((size_height - (offset_height_top / 1000)) * current_mapPrintCapableScale), "EPSG:3857", "EPSG:4326");
        var NE_point_LatLng = L.latLng(NE_point[1], NE_point[0]);
        var bounds = L.latLngBounds(SW_point_LatLng, NE_point_LatLng);
        
        L.rectangle(bounds, {
            color: "#228B22",
            fillColor: "#90EE90",
            fillOpacity: 0.3,
            weight: 7,
            layerId: layerId,
            _noprint: true
        }).addTo(smap.map);
        if (typeof window.popup_print !== "undefined" && window.popup_print !== null ) {
            smap.map.removeLayer(window.popup_print)
        }
        window.popup_print = L.popup({
            keepInView: false
        })
        .setLatLng(smap.map.getCenter())
        .setContent('<p>Panorera eller zooma in/ut för att ändra utskriftsområde.</p>');
        
        if (typeof window.printRelatedPopup_closed_once !== "undefined" && window.printRelatedPopup_closed_once !== null ) {
            if (window.printRelatedPopup_closed_once) {} else {
                window.popup_print.openOn(smap.map);
                window.popup_print._wrapper.style.background = "rgba(255,255,255,0.2)";
                window.popup_print._closeButton.onclick = function() {
                    if (typeof window.printRelatedPopup_closed_once !== "undefined" && window.printRelatedPopup_closed_once !== null ) {
                        window.printRelatedPopup_closed_once = true
                    }
                }
                ;
            
            }
        } else {
            window.popup_print.openOn(smap.map);
            window.popup_print._wrapper.style.background = "rgba(255,255,255,0.2)";
            window.popup_print._closeButton.onclick = function() {
                if (typeof window.printRelatedPopup_closed_once !== "undefined" && window.printRelatedPopup_closed_once !== null ) {
                    window.printRelatedPopup_closed_once = true
                }
            }
            ;
        
        }
    
       //20180927
		var SW_point_3857 = utils.projectPoint(center_point_3857.lng - ((size_width - (offset_width / 1000)) * current_mapPrintCapableScale), center_point_3857.lat - ((size_height - (offset_width_bottom / 1000)) * current_mapPrintCapableScale), "EPSG:3857", "EPSG:3857");
		var NE_point_3857 = utils.projectPoint(center_point_3857.lng + ((size_width - (offset_width / 1000)) * current_mapPrintCapableScale), center_point_3857.lat + ((size_height - (offset_height_top / 1000)) * current_mapPrintCapableScale), "EPSG:3857", "EPSG:3857");
		this._drawScaleBar(center_point_3857,SW_point_3857,NE_point_3857);
		//20180927    
    
    },
	
    //20180927
    _drawScaleBar: function(center_point_3857,SW_point_3857,NE_point_3857){
   		
		    var _getScale_current = function() {
            var map = smap.map, 
            bounds = map.getBounds(), 
            inchesKm = L.print.Provider.INCHES_PER_METER * 1000, 
            scales = L.Control.Print.prototype._savedPrintCapabilities.scales, 
            sw = bounds.getSouthWest(), 
            ne = bounds.getNorthEast(), 
            halfLat = (sw.lat + ne.lat) / 2, 
            midLeft = L.latLng(halfLat, sw.lng), 
            midRight = L.latLng(halfLat, ne.lng), 
            mwidth = midLeft.distanceTo(midRight), 
            pxwidth = map.getSize().x, 
            kmPx = mwidth / pxwidth / 1000, 
            mscale = (kmPx || 0.000001) * inchesKm * L.print.Provider.DPI, 
            closest = Number.POSITIVE_INFINITY, 
            i = scales.length, 
            diff, 
            scale;
            while (i--) {
                diff = Math.abs(mscale - scales[i].value);
                if (diff < closest) {
                    closest = diff;
                    scale = parseInt(scales[i].value, 10);
                }
            }
            return scale;
        }
		var currentMapScale = null;
		var scaleBarDistanceOnPrint = 2;
		var selected_scale = document.getElementById("select_scale").value;
            if(selected_scale.length>0){
				//20180927
				//current_mapPrintCapableScale = n
				currentMapScale = eval(selected_scale)*1.7888404922734575;
		if(currentMapScale <= (300*1.7888404922734575)+100){scaleBarDistanceOnPrint = 5}
		else if(currentMapScale > (300*1.7888404922734575)+100 && currentMapScale <= (643*1.7888404922734575)+100){scaleBarDistanceOnPrint = 10}
		else if(currentMapScale > (643*1.7888404922734575)+100 && currentMapScale <= (1250*1.7888404922734575)+200){scaleBarDistanceOnPrint = 30}
		else if(currentMapScale > (1250*1.7888404922734575)+200 && currentMapScale <= (2500*1.7888404922734575)+250){scaleBarDistanceOnPrint = 50}
		else if(currentMapScale > (2500*1.7888404922734575)+250 && currentMapScale <= (5000*1.7888404922734575)+300){scaleBarDistanceOnPrint = 100}
		else if(currentMapScale > (5000*1.7888404922734575)+300 && currentMapScale <= (10022*1.7888404922734575)+400){scaleBarDistanceOnPrint = 200}
		else if(currentMapScale > (10022*1.7888404922734575)+400 && currentMapScale <= (20152*1.7888404922734575)+500){scaleBarDistanceOnPrint = 500}
		else if(currentMapScale > (20152*1.7888404922734575)+500 && currentMapScale <= (40305*1.7888404922734575)+700){scaleBarDistanceOnPrint = 1000}
		else if(currentMapScale > (40305*1.7888404922734575)+700 && currentMapScale <= (80750*1.7888404922734575)+1000){scaleBarDistanceOnPrint = 2000}
		else if(currentMapScale > (80750*1.7888404922734575)+1000 && currentMapScale <= (161500*1.7888404922734575)+10000){scaleBarDistanceOnPrint = 3000}
		else if(currentMapScale > (161500*1.7888404922734575)+10000 && currentMapScale <= (328970*1.7888404922734575)+20000){scaleBarDistanceOnPrint = 5000}
		else if(currentMapScale > (328970*1.7888404922734575)+20000 && currentMapScale <= (657940*1.7888404922734575)+40000){scaleBarDistanceOnPrint = 10000}
		else if(currentMapScale > (657940*1.7888404922734575)+40000 && currentMapScale <= (1315881*1.7888404922734575)){scaleBarDistanceOnPrint = 30000}
		else{scaleBarDistanceOnPrint = 35000}
				//20180927
		}else{
		       currentMapScale = _getScale_current();
		 //in miter
		if(currentMapScale <= 300+100){scaleBarDistanceOnPrint = 5}
		else if(currentMapScale > 300+100 && currentMapScale <= 643+100){scaleBarDistanceOnPrint = 10}
		else if(currentMapScale > 643+100 && currentMapScale <= 1250+200){scaleBarDistanceOnPrint = 30}
		else if(currentMapScale > 1250+200 && currentMapScale <= 2500+250){scaleBarDistanceOnPrint = 50}
		else if(currentMapScale > 2500+250 && currentMapScale <= 5000+300){scaleBarDistanceOnPrint = 100}
		else if(currentMapScale > 5000+300 && currentMapScale <= 10022+400){scaleBarDistanceOnPrint = 200}
		else if(currentMapScale > 10022+400 && currentMapScale <= 20152+500){scaleBarDistanceOnPrint = 500}
		else if(currentMapScale > 20152+500 && currentMapScale <= 40305+700){scaleBarDistanceOnPrint = 1000}
		else if(currentMapScale > 40305+700 && currentMapScale <= 80750+1000){scaleBarDistanceOnPrint = 2000}
		else if(currentMapScale > 80750+1000 && currentMapScale <= 161500+10000){scaleBarDistanceOnPrint = 3000}
		else if(currentMapScale > 161500+10000 && currentMapScale <= 328970+20000){scaleBarDistanceOnPrint = 5000}
		else if(currentMapScale > 328970+20000 && currentMapScale <= 657940+40000){scaleBarDistanceOnPrint = 10000}
		else if(currentMapScale > 657940+40000 && currentMapScale <= 1315881){scaleBarDistanceOnPrint = 30000}
		else{scaleBarDistanceOnPrint = 35000}

		
		}
		
       var someFactor = 0, someFactor_side = 0, scaleTextPositionFactor_x = 0, scaleTextPositionFactor_y = 0;	
       if (document.getElementById('sprint_a3').checked === true) {
		   //-------fixed
		    if (document.getElementById('sprint_portrait').checked === true) {
			   someFactor = ((NE_point_3857[1] - SW_point_3857[1])/27.5); //done
		       someFactor_side = someFactor/3.3;//Done
            } else if (document.getElementById('sprint_landscape').checked === true) {
		       someFactor = ((NE_point_3857[1] - SW_point_3857[1])/18.64);//Done
		       someFactor_side = someFactor/2.8;//Done
            }
			scaleTextPositionFactor_x= 8;
			scaleTextPositionFactor_y = 14
			   //----
	   } else if (document.getElementById('sprint_a4').checked === true) {
		      //----fixed
		    if (document.getElementById('sprint_portrait').checked === true) {
		         someFactor = ((NE_point_3857[1] - SW_point_3857[1])/65);
		         someFactor_side = someFactor/1.4;
            } else if (document.getElementById('sprint_landscape').checked === true) {
		        someFactor = ((NE_point_3857[1] - SW_point_3857[1])/46);
		        someFactor_side = someFactor/1.125;
            }
			scaleTextPositionFactor_x= 2;
			scaleTextPositionFactor_y = 8
           //----fixed			
	   } else if (document.getElementById('sprint_a5').checked === true) {
		  //----fixed
	      //----
		    if (document.getElementById('sprint_portrait').checked === true) {
		         someFactor = -((NE_point_3857[1] - SW_point_3857[1])/55);
		         someFactor_side = Math.abs(someFactor/1.4);
            } else if (document.getElementById('sprint_landscape').checked === true) {
		        someFactor = -((NE_point_3857[1] - SW_point_3857[1])/32);
		        someFactor_side = Math.abs(someFactor/1.125);
            }
			scaleTextPositionFactor_x= 2;
			scaleTextPositionFactor_y = 8
           //----fixed
	   }
		console.log(NE_point_3857[1] +'_______'+SW_point_3857[1] + '__________' + (NE_point_3857[1]-SW_point_3857[1])+ '_________' + someFactor);
		
		var scaleBarCenter_x = center_point_3857.lng,
		    scaleBarCenter_y = SW_point_3857[1] + someFactor;
		   
		var scaleBarLeftPoint_x = scaleBarCenter_x - ((scaleBarDistanceOnPrint/2)*1.7888404922734575),
		    scaleBarLeftPoint_y = scaleBarCenter_y;
		
        var scaleBarRightPoint_x = scaleBarCenter_x + ((scaleBarDistanceOnPrint/2)*1.7888404922734575),
		    scaleBarRightPoint_y = scaleBarCenter_y;

		var scaleBarLeftPoint = utils.projectPoint(scaleBarLeftPoint_x,scaleBarLeftPoint_y,"EPSG:3857", "EPSG:4326");
		var scaleBarLeftPointLatLng = L.latLng(scaleBarLeftPoint[1], scaleBarLeftPoint[0]);
        var scaleBarRightPoint = utils.projectPoint(scaleBarRightPoint_x,scaleBarRightPoint_y,"EPSG:3857", "EPSG:4326");
		var scaleBarRightPointLatLng = L.latLng(scaleBarRightPoint[1], scaleBarRightPoint[0]);
		
		var scaleBarLeftPointUpp = utils.projectPoint(scaleBarLeftPoint_x,scaleBarLeftPoint_y + someFactor_side,"EPSG:3857", "EPSG:4326");
		var scaleBarLeftPointUppLatLng = L.latLng(scaleBarLeftPointUpp[1], scaleBarLeftPointUpp[0]);

        var scaleBarRightPointUpp = utils.projectPoint(scaleBarRightPoint_x,scaleBarRightPoint_y + someFactor_side,"EPSG:3857", "EPSG:4326");
		var scaleBarRightPointUppLatLng = L.latLng(scaleBarRightPointUpp[1], scaleBarRightPointUpp[0]);		
		
	    var scaleBarPoints = [scaleBarLeftPointUppLatLng, scaleBarLeftPointLatLng, scaleBarRightPointLatLng, scaleBarRightPointUppLatLng];

		if (typeof L.Control.Print.prototype.scaleBarLayerToPrint != "undefined" || L.Control.Print.prototype.scaleBarLayerToPrint != null ) {
                 L.Control.Print.prototype.scaleBarLayerToPrint.clearLayers();
         }				
		if (typeof L.Control.Print.prototype.scaleBarLayerToPrint === "undefined" || L.Control.Print.prototype.scaleBarLayerToPrint === null ) {
            L.Control.Print.prototype.scaleBarLayerToPrint = L.layerGroup(),
            L.Control.Print.prototype.scaleBarLayerToPrint.id = "scalebarlayertoprint_id",
            smap.map.addLayer(L.Control.Print.prototype.scaleBarLayerToPrint);
            }
			
		var scaleBarTest = L.polyline(scaleBarPoints,{color:'black',opacity:'1',fillOpacity:'1',lineCap:'square',weight:1}).addTo(L.Control.Print.prototype.scaleBarLayerToPrint);
				     			 
	    var scaleBarText = null; 
		if(scaleBarDistanceOnPrint < 1000){
			scaleBarText = scaleBarDistanceOnPrint+ 'm';
		}else{
			scaleBarText = scaleBarDistanceOnPrint/1000+ 'km';
		}
			 
		var scaleBarMarkerIcon = L.divIcon({
            className: 'height-div-icon',
            html: '<p style="position:relative;left:8px;top:-2px;font-size:7pt;font-family:Arial;font-weight:normal;color:black;text-shadow:0 0 5px #fff;"><b>' + scaleBarText + '&nbsp;</b></p>'
        });
			 
			 
	    var scaleBarMarkerOptions = {
            icon: scaleBarMarkerIcon,
            clickable: false,
            externalGraphic: "http://" + window.location.host + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1) + "img/legend/empty.png",
            label: scaleBarText,
            fontColor: "black",
            fontSize: 10.5,
            fontFamily: "Arial",
            fontWeight: "normal",
            labelAlign: "lb"
            
            }
		var scaleBarTextPosition = utils.projectPoint(scaleBarLeftPoint_x + Math.abs(someFactor)/scaleTextPositionFactor_x, scaleBarLeftPoint_y + Math.abs(someFactor)/scaleTextPositionFactor_y,"EPSG:3857", "EPSG:4326");
		var scaleBarTextPositionLatLng = L.latLng(scaleBarTextPosition[1], scaleBarTextPosition[0]);
        var scaleBarMarker = L.marker([scaleBarTextPositionLatLng.lat, scaleBarTextPositionLatLng.lng], scaleBarMarkerOptions);
        scaleBarMarker.addTo(L.Control.Print.prototype.scaleBarLayerToPrint)		
	},
	//20180927
	
	
    _removeCaptureBox: function() {
        for (v in smap.map._layers) {
            smap.map._layers[v].options ? smap.map._layers[v].options.layerId === "A3_Portrait" || smap.map._layers[v].options.layerId === "A3_Landscale" || smap.map._layers[v].options.layerId === "A4_Portrait" || smap.map._layers[v].options.layerId === "A4_Landscale" || smap.map._layers[v].options.layerId === "A5_Portrait" || smap.map._layers[v].options.layerId === "A5_Landscale" ? smap.map.removeLayer(smap.map._layers[v]) : "" : ""
        }
		
	 //20180927
	 if (typeof L.Control.Print.prototype.scaleBarLayerToPrint != "undefined" || L.Control.Print.prototype.scaleBarLayerToPrint != null ) {
                 L.Control.Print.prototype.scaleBarLayerToPrint.clearLayers();
         }
	//20180927		
    },
    /*Mohammad Add: Print related*/
    hide: function() {
        this._modal.modal("hide")
    }
}),
L.control.Print = function(t) {
    return new L.Control.Print(t)
}
;
L.Control.Printer = L.Control.extend({
    options: {
        position: "bottomright"
    },
    _lang: {
        sv: {
            exampleLabel: "Ett exempel"
        },
        en: {
            exampleLabel: "An example"
        }
    },
    _setLang: function(n) {
        n = n || smap.config.langCode,
        this._lang && (this.lang = this._lang ? this._lang[n] : null )
    },
    initialize: function(n) {
        L.setOptions(this, n),
        this._setLang(n.langCode)
    },
    onAdd: function(n) {
        return this.map = n,
        this._container = L.DomUtil.create("div", "leaflet-control-printer"),
        L.DomEvent.disableClickPropagation(this._container),
        this.$container = $(this._container),
        this._container
    },
    onRemove: function() {}
});
L.Control.RedirectClick = L.Control.extend({
    options: {
        position: "topright"
    },
    _setLang: function(t) {
        t = t || smap.config.langCode || navigator.language.split("-")[0] || "en",
        this._lang && (this._lang = $.extend(!0, this._lang, this.options._lang),
        this.lang = this._lang ? this._lang[t] : null )
    },
    initialize: function(t) {
        this._lang = {
            sv: {},
            en: {}
        },
        L.setOptions(this, t),
        this._setLang(t.langCode)
    },
    _setURL: function(t) {
        var i = this;
        i.options.url = t ? t || i.options.url : null 
    },
    onAdd: function(t) {
        return this.map = t,
        this._container = L.DomUtil.create("div", "leaflet-control-RedirectClick"),
        L.DomEvent.disableClickPropagation(this._container),
        this.$container = $(this._container),
        this._createButton(),
        this._container
    },
    addHooks: function() {
        this.map.on("click", this.onMapClick, this),
        L.Browser.touch ? (this.staticTooltip = $('<div class="rclick-static-tooltip">' + this.lang.hoverText + "</div>"),
        $("#mapdiv").append(this.staticTooltip)) : L.Browser.touch || (this._tooltip = {},
        this._tooltip.text = this.lang.hoverText,
        this.tooltip = new L.Tooltip(this.map).updateContent(this._tooltip),
        this.map.on("mousemove mouseup", this._onMouseMove, this))
    },
    removeHooks: function() {
        this.map.off("click", this.onMapClick, this),
        this.tooltip && (this.map.off("mousemove mouseup", this._onMouseMove, this),
        this.tooltip.dispose())
    },
    _projectEPSG: function(t) {
        var i = new Proj4js.Proj("EPSG:4326")
          , 
        o = new Proj4js.Proj("EPSG:3008")
          , 
        n = (L.Proj,
        new Proj4js.Point(t.latlng.lng,t.latlng.lat));
        return Proj4js.transform(i, o, n),
        t.latlng.lat = n.x,
        t.latlng.lng = n.y,
        t
    },
    _onMouseMove: function(t) {
        this.tooltip.updatePosition(t.latlng)
    },
    onMapClick: function(t) {
        this.onDone(t),
        this._deactivate()
    },
    _createButton: function() {
        var t = this
          , 
        i = $('<button title="' + this.lang.name + '" class="btn btn-default"><span class="' + this.options.btnClass + '"></span></button>');
        i.on("click touchstart", function() {
            return t.active && t.active !== !1 ? (t._deactivate(),
            $("#mapdiv").focus(),
            t.active = !1) : (t._deactivate(),
            t._activate(),
            t.active = !0),
            !1
        }),
        this.$btn = i,
        t.$container.append(i)
    },
    _activate: function() {
        return this.active ? !1 : (this._deactivateAll(),
        this.$btn.addClass("active"),
        this.$btn.blur(),
        void (this.options.url ? (this.removeHooks(),
        this.addHooks(),
        $("#mapdiv").css({
            cursor: this.options.cursor
        })) : (this._deactivate(),
        $("#mapdiv").focus(),
        utils.log("RedirectClick error: Redirect URL missing. Check config-file."))))
    },
    _deactivate: function() {
        this.active = !1,
        this.$btn.removeClass("active"),
        this.removeHooks(),
        this.staticTooltip && this.staticTooltip.remove(),
        $("#mapdiv").css({
            cursor: ""
        })
    },
    _deactivateAll: function() {
        for (var t = smap.cmd.getControls("RedirectClick"), i = 0; i < t.length; i++)
            t[i]._deactivate()
    },
    onRemove: function() {
        this.$container.empty(),
        this.staticTooltip && this.staticTooltip.remove()
    },
    onDone: function(t) {
        var i = this
          , 
        o = i.options.url
          , 
        n = new proj4.Proj("EPSG:4326")
          , 
        s = new proj4.Proj("EPSG:3008")
          , 
        e = {
            x: t.latlng.lng,
            y: t.latlng.lat
        };
        this.staticTooltip && this.staticTooltip.remove(),
        proj4.transform(n, s, e),
        o = o.replace(/\${x}/g, e.x).replace(/\${y}/g, e.y),
        window.open(o, this.lang.name)
    }
}),
L.control.redirectclick = function(t) {
    return new L.Control.RedirectClick(t)
}
;
L.Control.Search = L.Control.extend({
    options: {
        whitespace: "%20",
        wsOrgProj: "EPSG:3006",
        pxDesktop: 992,
        clearEntryAfterSearch: !1,
        funcSetPosition: function() {
            var e = smap.cmd.getControl("L.Control.LayerSwitcher");
            e || $("#smap-search-div").css("left", "10px")
        },
        gui: !1,
        addToMenu: !1,
        zoom: 15,
        iconOptions: $.extend({}, (new L.Icon.Default).options, {
            iconUrl: L.Icon.Default.imagePath + "/marker-icon.png"
        }),
        source: null ,
        acHeight: null ,
        autoScrollAcOnRowNbr: 2,
        acOptions: {
            items: 100
        }
    },
    _lang: {
        sv: {
            search: "Sök adress",
            addressNotFound: "Den sökta adressen hittades inte",
            remove: "Ta bort"
        },
        en: {
            search: "Search address",
            addressNotFound: "The searched address was not found",
            remove: "Remove"
        }
    },
    _setLang: function(e) {
        e = e || smap.config.langCode || navigator.language.split("-")[0] || "en",
        this._lang && (this.lang = this._lang ? this._lang[e] : null )
    },
    initialize: function(e) {
        L.setOptions(this, e),
        this.options._lang && $.extend(!0, this._lang, this.options._lang),
        this._setLang(e.langCode);
        var t = this.options.funcSetPosition;
        t && smap.event.on("smap.core.pluginsadded", function() {
            t()
        })
    },
    onAdd: function(e) {
        function t() {
            this._cacheLayer(c, !1, this.options.wfsSearch),
            c.off("load", t)
        }
        var s = this;
        if (this.map = e,
        this._container = L.DomUtil.create("div", "leaflet-control-search"),
        L.DomEvent.disableClickPropagation(this._container),
        this._searchLayer = L.layerGroup(),
		L.Control.Search.prototype._searchLayer = this._searchLayer,
        this.map.addLayer(this._searchLayer),
        (void 0 === this.options.gui || this.options.gui === !0) && (this.$container = $(this._container),
        this.$container.css("display", "none"),
        this._makeSearchField(),
        this.map.on("click", this._blurSearch)),
        this.options.vectorSearch && (this._cachedFeatures = this._cachedFeatures || {},
        this.map.on("layeradd", this._onLayerAdd, this),
        this.map.on("layerremove", this._onLayerRemove, this)),
        this.options.wfsSearch) {
            this._cachedFeatures = this._cachedFeatures || {};
            var o = this.options.wfsSearch;
            this._setACOptions(o);
            var a, r;
            this._wfsLayerGroup = L.layerGroup();
            for (var n = 0, i = o.layerIds.length; i > n; n++)
                if (a = smap.cmd.getLayerConfig(o.layerIds[n])) {
                    r = $.extend(!0, {}, a),
                    r.options.layerId += 1;
                    var c = smap.core.layerInst._createLayer(r);
                    this._initVectorSearch(c),
                    this._wfsLayerGroup.addLayer(c),
                    s.map.whenReady(function() {
                        c._map = e,
                        c.on("load", t, s),
                        c._refresh({
                            force: !0,
                            bounds: !1
                        }),
                        c._map = null 
                    }, 1e3)
                }
        }
        return this.__onApplyParams = this.__onApplyParams || $.proxy(this._onApplyParams, this),
        smap.event.on("smap.core.applyparams", this.__onApplyParams),
        this.__onCreateParams = this.__onCreateParams || $.proxy(this._onCreateParams, this),
        smap.event.on("smap.core.createparams", this.__onCreateParams),
        $(".leaflet-top.leaflet-left").addClass("with-search-bar"),
        s._container
    },
    _blurSearch: function() {
        $(".smap-search-div input").blur()
    },
    onRemove: function() {
        smap.event.off("smap.core.applyparams", this.__onApplyParams),
        smap.event.off("smap.core.createparams", this.__onCreateParams),
        this.map.off("click", this._blurSearch),
        $(".leaflet-top.leaflet-left").removeClass("with-search-bar")
    },
    _onLayerAdd: function(e) {
        var t = e.layer || {};
        t.options && !t.options._silent && t.options.layerId && !t.feature && this.options.vectorSearch && $.inArray(t.options.layerId, this.options.vectorSearch.layerIds) > -1 && (this._setACOptions(this.options.vectorSearch),
        this._initVectorSearch(t))
    },
    _onLayerRemove: function(e) {
        var t = e.layer || {};
        t.options && !t.options._silent && t.options.layerId && !t.feature && this.options.vectorSearch && $.inArray(t.options.layerId, this.options.vectorSearch.layerIds) > -1 && this._cacheLayer(t, !0)
    },
    _cacheProperties: function(e, t, s) {
        var o, a, r = [];
        a = $.extend(!0, {}, {
            name: e[t[0]]
        }),
        r = [];
        for (var n = 0, i = t.length; i > n; n++)
            o = e[t[n]],
            o && o.length && r.push(s[n] + "==" + o);
        return a.searchWords = r.join("&&"),
        a
    },
    _cacheLayer: function(e, t, s) {
        t = t || !1,
        s = s || {},
        this._acVector = this._acVector || [];
        var o, a, r = [], 
        n = this._cacheProperties, 
        i = s.keyVals, 
        c = this._acVector, 
        p = [], 
        h = [];
        for (var l in i)
            p.push(l),
            h.push(i[l]);
        e.eachLayer(function(e) {
            o = e.feature.properties,
            a = n(o, p, h),
            c.splice(a),
            t || r.push(a)
        }),
        this._acVector = this._acVector.concat(r),
        $("#smap-search-div input").prop("disabled", !1)
    },
    _initVectorSearch: function(e) {
        function t() {
            this._cacheLayer(e, !1, this.options.vectorSearch),
            e.off("load", t)
        }
        var s = e.options;
        return s ? ($("#smap-search-div input").prop("disabled", !0),
        void ($.isEmptyObject(e._layers) ? e.on("load", t, this) : this._cacheLayer(e, !1, this.options.vectorSearch))) : !1
    },
    _setACOptions: function(e) {
        var t = this;
        for (var s in e.keyVals)
            break;
        var o = e.keyVals[s]
          , 
        a = e.suffix
          , 
        r = this.options.suffix;
        this.options.typeaheadOptions = $.extend(!0, {}, this.options.typeaheadOptions, {
            source: $.proxy(function(e, t) {
                e = encodeURIComponent(e);
                var s = this.options.wsAcUrl;
                s ? (this.options.whitespace && (e = e.replace(/%20/g, this.options.whitespace)),
                this._proxyInst && this._proxyInst.abort(),
                smap.cmd.loading(!0),
                this._proxyInst = $.ajax({
                    type: "GET",
                    url: this.options.useProxy ? smap.config.ws.proxy + encodeURIComponent(s + "?q=") + e : s + "?q=" + e,
                    dataType: "text",
                    context: this,
                    success: function(e) {
                        for (var s, o = e.split("\n"), a = [], r = 0, n = o.length; n > r; r++)
                            s = $.trim(o[r]),
                            s.length && a.push({
                                name: s,
                                searchWords: "Adress==" + s
                            });
                        a = this._acVector.concat(a),
                        t(a)
                    },
                    error: function() {},
                    complete: function() {
                        smap.cmd.loading(!1)
                    }
                })) : t(this._acVector)
            }, this),
            displayText: function(e) {
                return e.searchWords
            },
            highlighter: function(e) {
                for (var t, s = {}, o = e.split("&&"), a = 0, r = o.length; r > a; a++)
                    t = o[a].split("=="),
                    s[t[0]] = t[1];
                var n = ""
                  , 
                a = 0;
                for (var i in s)
                    n += 0 === a ? '<div style="font-size:1.2em;">' + s[i] + "</div>" : "<div><span>" + i + "</span>:&nbsp;<span>" + s[i] + "</span></div>",
                    a++;
                return n
            },
            updater: function(e) {
                for (var t, s = {}, n = e.searchWords.split("&&"), i = 0, c = n.length; c > i; i++)
                    t = n[i].split("=="),
                    s[t[0]] = t[1];
                return s[o] ? e.name + " " + a : e.name + " " + r
            },
            afterSelect: function(s) {
                if (t._searchLayer.clearLayers(),
                t.options.clearEntryAfterSearch && $(".smap-search-div input").val(null ),
                encodeURIComponent(s).search(encodeURIComponent(r)) > -1)
                    s = $.trim(s.replace(r, "")),
                    t._geoLocate(s, "");
                else if (encodeURIComponent(s).search(encodeURIComponent(a)) > -1) {
                    s = $.trim(s.replace(a, ""));
                    for (var o in e.keyVals)
                        break;
                    var n, i, c, p, h = t.map;
                    for (p in h._layers)
                        if (n = h._layers[p],
                        n._layers)
                            for (c in n._layers)
                                if (i = n._layers[c],
                                i.feature && i.feature.properties[o] === s) {
                                    var l;
                                    return l = i.getLatLng ? i.getLatLng() : i.getBounds().getCenter(),
                                    h.setView(l, 17),
                                    void h.fire("selected", {
                                        feature: i.feature,
                                        selectedFeatures: [i],
                                        layer: n,
                                        latLng: l,
                                        shiftKeyWasPressed: !1
                                    })
                                }
                    t._wfsLayerGroup.eachLayer(function(e) {
                        e.eachLayer(function(a) {
                            if (a.feature && a.feature.properties[o] === s) {
                                t._searchLayer.addLayer(a),
                                this.marker = a;
                                var r;
                                return r = a.getLatLng ? a.getLatLng() : a.getBounds().getCenter(),
                                h.setView(r, 17),
                                void h.fire("selected", {
                                    feature: a.feature,
                                    selectedFeatures: [a],
                                    layer: e,
                                    latLng: r,
                                    shiftKeyWasPressed: !1
                                })
                            }
                        })
                    })
                }
            }
        });
        var n = $("#smap-search-div input");
        n.typeahead("destroy"),
        this._initAutoComplete(n)
    },
    _onApplyParams: function(e, t) {
        
        
        /*if (t.POI) {
                var s = t.POI instanceof Array ? t.POI[0] : t.POI;
                s = s.replace(/--c--/g, ",");
                var o = t.POI instanceof Array && t.POI.length > 1 ? t.POI[1] : !1
                  , a = !1
                  , r = smap.core.paramInst.getWebParamsAsObject()
                  , n = config.params
                  , i = r.ZOOM || this.options.zoom;
                r.CENTER || (a = !0,
                !r.POI && n.CENTER && (a = !1,
                i = t.ZOOM)),
                this._geoLocate(decodeURIComponent(s), {
                    setView: a,
                    zoom: i,
                    showPopup: o
                })
            }*/
        
        /*Mohammad Add and Change: For vakant*/
        
        if (typeof t.QL !== "undefined" && t.QL !== null  && typeof t.QA !== "undefined" && t.QA !== null ) {
        
        } else if (t.POI) {
            var s = t.POI instanceof Array ? t.POI[0] : t.POI;
            s = s.replace(/--c--/g, ",");
            var o = t.POI instanceof Array && t.POI.length > 1 ? t.POI[1] : !1
              , 
            a = !1
              , 
            r = smap.core.paramInst.getWebParamsAsObject()
              , 
            n = config.params
              , 
            i = r.ZOOM || this.options.zoom;
            r.CENTER || (a = !0,
            !r.POI && n.CENTER && (a = !1,
            i = t.ZOOM)),
            this._geoLocate(decodeURIComponent(s), {
                setView: a,
                zoom: i,
                showPopup: o
            })
        }
		
		
		else if(t.POIM){
			
			
			var diainfo ="";
			if(t.DIAINFO){
				
				try{
				diainfo=t.DIAINFO instanceof Array ? t.DIAINFO : t.DIAINFO;
				if(diainfo.length>0){
					if(diainfo instanceof Array){
						diainfo=eval(diainfo.join());
					}else{
						dia_str=eval(diainfo);
						if(dia_str instanceof Array){
							diainfo=dia_str;
						}
					}
				}	
				}catch (e){
				diainfo ="";	
				}
				
			}
			
			

			var s = t.POIM instanceof Array ? t.POIM : t.POIM;
			//console.log(s);
			if (s instanceof Array){
			var features_all = {"type":"FeatureCollection","features":[]};
			
			

				
				
			for (var i=0;i <s.length;i++){
				
				s[i] = s[i].replace(/--c--/g, ",");
				/*Mohamad Add*/
                var e = s[i].replace(/^\s+|\s+$/g, "");
                /*Mohammad add*/
				e = decodeURIComponent(e);
                e = encodeURIComponent(e);
                
                var o = this.options.wsLocateUrl;
                if (this.options.useProxy) {
                    o = smap.config.ws.proxy + encodeURIComponent(o + "?q=") + e;
                    var a = this.options.whitespace;
                    a && (o = o.replace(/%20/g, a))
                } else
                    o = o + "?q=" + e;
				
				var single_sok_xhr= new smap.cmd._xhr_handler();
				    single_sok_xhr.open("GET", o, false);
	                single_sok_xhr.send(null );
			        if (single_sok_xhr.readyState == 4 && single_sok_xhr.status == 200) {
			        var single_sok_xhrResponse = JSON.parse(single_sok_xhr.responseText);	
                    if (single_sok_xhrResponse instanceof Object){						
						if(single_sok_xhrResponse.features.length>0){
							for (var j=0;j<single_sok_xhrResponse.features.length;j++){
								features_all.features.push(single_sok_xhrResponse.features[j]);
							}
						}
					}					
	  		  
		            }
				
				
				
			}
			
			if(features_all.features.length>0){
				
				
				
				if(diainfo instanceof Array){
					for(var ft=0;ft<features_all.features.length;ft++){
						try{
						features_all.features[ft].properties['fritext'] = diainfo[ft][0];	
						}catch (e){
							features_all.features[ft].properties['fritext'] = "";
						}
						
						
					}
				}
				
				
				if(features_all.features.length===1){
					
			              var s = t.POIM instanceof Array ? t.POIM[0] : t.POIM;
                          s = s.replace(/--c--/g, ",");
                          var o = t.POIM instanceof Array && t.POIM.length > 1 ? t.POIM[1] : !1
                            , 
                          a = !1
                            , 
                          r = smap.core.paramInst.getWebParamsAsObject()
                            , 
                          n = config.params
                            , 
                          i = r.ZOOM || this.options.zoom;
                          r.CENTER || (a = !0,
                          !r.POIM && n.CENTER && (a = !1,
                          i = t.ZOOM));
						 
						  if(diainfo instanceof Array){
							  diainfo=diainfo[0][0];
						  }else{
							  diainfo="";
						  }
						 
                          this._geoLocate(decodeURIComponent(s), {
                              setView: a,
                              zoom: i,
                              showPopup: o,
							 
							  poim:!0,
							  diainfo:diainfo
							  
							  
                          })
						  
						  
				}else{
					
			
			  
                var  multiGeolocate = function(s,that) {
                function o() {
                    $("#smap-search-popupbtn").off("click").on("click", function() {
						var that_marker=eval(this.getAttribute('markar_id'));
                        return a._searchLayer.removeLayer(a._searchLayer._layers[that_marker]),
                        a.marker = null ,
                        !1
                    })
					
					
					if($(".lead")){
					if($(".lead").length>0){
					$(".lead")[0].style.width = ($(".leaflet-popup-content").width() - $(".leaflet-popup-close-button").width()) +"px";	
					}
					}
					
					
                }
				
                var a = that;
				
				//Coordinate Search: 20160907
				if(typeof L.Control.Search.prototype.marker !== "undefined" && L.Control.Search.prototype.marker !== null){
					that.marker = L.Control.Search.prototype.marker;
				}
				//Coordinate Search: 20160907
				//Working now
                if (that.marker && (that._searchLayer.clearLayers(),
				//Working now
                that.marker = null ),
                !s.features.length)
                    return void smap.cmd.notify(that.lang.addressNotFound, "error");
					window.searchLayerMarker_catch=[];
				var all_sok_pos=[];	
				var serchItems=[];
				for(var ii=0;ii<s.features.length;ii++){
				
				//Single	
                var r = s.features[ii].geometry.coordinates
                  , 
                n = L.latLng(r[1], r[0])
                  , 
                i = "EPSG:4326";
                if (that.options.wsOrgProj && that.options.wsOrgProj !== i) {
                    var c = window.proj4(that.options.wsOrgProj, i, [n.lng, n.lat]);
                    n = L.latLng(c[1], c[0])
                }
				all_sok_pos.push(n);
                that.map.off("popupopen", o),
                that.map.on("popupopen", o),
                that.marker = L.marker(n, {
                    iconOptions: L.icon(that.options.iconOptions)
                }).addTo(that._searchLayer),
                that.marker.options.q = e;
				serchItems.push(s.features[ii].properties.name);
				var hideSearchDeleteButton=window.getQueryParameters('hideSDeleteButton');
				
				if(hideSearchDeleteButton.length>0){
					if(hideSearchDeleteButton==="true"){
						if(typeof s.features[ii].properties.fritext !== "undefined" && s.features[ii].properties.fritext !==null){
						if(s.features[ii].properties.fritext.length>0){													
						that.marker.bindPopup('<p class="lead">'+decodeURIComponent(s.features[ii].properties.fritext)+'</p><div><button markar_id='+that.marker._leaflet_id+' style="display:none;" id="smap-search-popupbtn" class="btn btn-default btn-sm">' + that.lang.remove + "</button></div>");
						}else{
						that.marker.bindPopup('<p class="lead">' + decodeURIComponent(s.features[ii].properties.name) + '</p><div><button markar_id='+that.marker._leaflet_id+' style="display:none;" id="smap-search-popupbtn" class="btn btn-default btn-sm">' + that.lang.remove + "</button></div>");	
						}	
						}else{
						that.marker.bindPopup('<p class="lead">' + decodeURIComponent(s.features[ii].properties.name) + '</p><div><button markar_id='+that.marker._leaflet_id+' style="display:none;" id="smap-search-popupbtn" class="btn btn-default btn-sm">' + that.lang.remove + "</button></div>");	
						}

						
					}else{
						if(typeof s.features[ii].properties.fritext !== "undefined" && s.features[ii].properties.fritext !==null){
						if(s.features[ii].properties.fritext.length>0){						
						that.marker.bindPopup('<p class="lead">'+decodeURIComponent(s.features[ii].properties.fritext)+'</p><div><button markar_id='+that.marker._leaflet_id+' id="smap-search-popupbtn" class="btn btn-default btn-sm">' + that.lang.remove + "</button></div>");
						}else{
						that.marker.bindPopup('<p class="lead">' + decodeURIComponent(s.features[ii].properties.name) + '</p><div><button markar_id='+that.marker._leaflet_id+' id="smap-search-popupbtn" class="btn btn-default btn-sm">' + that.lang.remove + "</button></div>");	
						}	
						}else{
						that.marker.bindPopup('<p class="lead">' + decodeURIComponent(s.features[ii].properties.name) + '</p><div><button markar_id='+that.marker._leaflet_id+' id="smap-search-popupbtn" class="btn btn-default btn-sm">' + that.lang.remove + "</button></div>");		
						}

						
					}
				}else{
					if(typeof s.features[ii].properties.fritext !== "undefined" && s.features[ii].properties.fritext !==null){
						if(s.features[ii].properties.fritext.length>0){							
						that.marker.bindPopup('<p class="lead">'+decodeURIComponent(s.features[ii].properties.fritext)+'</p><div><button markar_id='+that.marker._leaflet_id+' id="smap-search-popupbtn" class="btn btn-default btn-sm">' + that.lang.remove + "</button></div>");
						}else{
						that.marker.bindPopup('<p class="lead">' + decodeURIComponent(s.features[ii].properties.name) + '</p><div><button markar_id='+that.marker._leaflet_id+' id="smap-search-popupbtn" class="btn btn-default btn-sm">' + that.lang.remove + "</button></div>");	
						}	
					}else{
					that.marker.bindPopup('<p class="lead">' + decodeURIComponent(s.features[ii].properties.name) + '</p><div><button markar_id='+that.marker._leaflet_id+' id="smap-search-popupbtn" class="btn btn-default btn-sm">' + that.lang.remove + "</button></div>");	
					}

					   
				}
			
				
                //that.marker.bindPopup('<p class="lead">' + decodeURIComponent(e) + '</p><div><button id="smap-search-popupbtn" class="btn btn-default btn-sm">' + that.lang.remove + "</button></div>");
                var p = t.zoom || that.options.zoom;
				
			    t.setView=!1,t.showPopup=!1;
				
			
				
				 t.setView ? that.map.setView(n, p, {
                    animate: !1
                }) : that.marker._popup.options.autoPan = !1;
				that.marker._popup.options.autoPan = !0;
				
					
				/*if(ii ===s.features.length-1){
                 that.marker._popup.options.minWidth=decodeURIComponent(s.features[ii].properties.name).length*10+20;					
				}else{				
				}
				*/
				
               
                
                
                t.showPopup && that.marker.openPopup();
                
                /*Mohammad Change: Darty fix for Android*/
				
				//Coordinate Search: 20160907
				L.Control.Search.prototype.marker = that.marker;
				//Coordinate Search: 20160907
				
                window.searchLayerMarker_catch.push(that.marker);
                window.setTimeout(function() {
                    //window.searchLayerMarker_catch.closePopup();
                    //window.searchLayerMarker_catch.openPopup();
					var hideSearchInfo=window.getQueryParameters('hideSearchInfo');
					if(hideSearchInfo.length>0){
						if(hideSearchInfo==="true"){
							for(var sl=0;sl<window.searchLayerMarker_catch.length;sl++){
							window.searchLayerMarker_catch[sl].closePopup();	
							}
							
						}else{
							
							for(var sl=0;sl<window.searchLayerMarker_catch.length;sl++){
								if(sl===window.searchLayerMarker_catch.length-1){
									window.searchLayerMarker_catch[sl].openPopup();
								}
								
							}
							
							var hideSearchDeleteButton=window.getQueryParameters('hideSDeleteButton');
							if(hideSearchDeleteButton.length>0){
								if(hideSearchDeleteButton==="true"){
									$('#smap-search-popupbtn')[0].style.display="none";
								}
							}
						}
					}else{
						var hideSearchDeleteButton=window.getQueryParameters('hideSDeleteButton');
							if(hideSearchDeleteButton.length>0){
								if(hideSearchDeleteButton==="true"){
									$('#smap-search-popupbtn')[0]?$('#smap-search-popupbtn')[0].style.display="none":"";
								}
							}
						
					}
                }, 300);
                /*Mohammad Change: Darty fix for Android*/
                
                that.options.clearEntryAfterSearch && $(".smap-search-div input").val(null ),
                $(".smap-search-div input").blur(),
                setTimeout(function() {
                    $(".smap-search-div input").blur()
                }, 100)
				
				
				
				//Single
				}
				if(serchItems.length>1){
				that.marker.options.q = serchItems;	
				}
				
				that.map.fitBounds(L.latLngBounds(all_sok_pos));

				
            }
								
						multiGeolocate(features_all,this);											
				
				}
			}
			
			
				
				
			}else{
				
				
			var s = t.POIM instanceof Array ? t.POIM[0] : t.POIM;
            s = s.replace(/--c--/g, ",");
            var o = t.POIM instanceof Array && t.POIM.length > 1 ? t.POIM[1] : !1
              , 
            a = !1
              , 
            r = smap.core.paramInst.getWebParamsAsObject()
              , 
            n = config.params
              , 
            i = r.ZOOM || this.options.zoom;
            r.CENTER || (a = !0,
            !r.POIM && n.CENTER && (a = !1,
            i = t.ZOOM));
			
			if(diainfo instanceof Array){
			   diainfo=diainfo[0][0];
			}else{
			   diainfo="";
			}
			
            this._geoLocate(decodeURIComponent(s), {
                setView: a,
                zoom: i,
                showPopup: o,
				
				poim:!0,
				diainfo:diainfo
				
            })
        
			}
			
		}
		
        
        /*Mohammad Add and Change: For vakant*/
    
    
    },
    _onCreateParams: function(e, t) {
        if (this.marker && this.marker.options.q) {
            var s = this.marker.getPopup()._isOpen ? !0 : !1;
			
			if(this.marker.options.q instanceof Array){
				t.poim ="";
				for(var i=0;i<this.marker.options.q.length;i++){
				
				if(i===0){t.poim=[encodeURIComponent(this.marker.options.q[i].replace(/,/g, "--c--"))]}else{t.poim=t.poim+","+[encodeURIComponent(this.marker.options.q[i].replace(/,/g, "--c--"))]}
					
				}
			
			s=false,
             s && t.poim.push(1)			
			}else{
			t.poi = [encodeURIComponent(this.marker.options.q.replace(/,/g, "--c--"))],
            s && t.poi.push(1)			
			}
			
            //t.poi = [encodeURIComponent(this.marker.options.q.replace(/,/g, "--c--"))],
            //s && t.poi.push(1)
           
        }
    },
    _rmAdressMarker: function(e) {
        null  != e && (this._searchLayer.removeLayer(e),
        this.addressMarker = null )
    },
    _makeSearchField: function() {
        function e() {
            var e = $(window).width();
            if (!(e >= o.options.pxDesktop) && L.Browser.touch) {
                var t = $("#smap-search-bg");
                t.length || (t = $('<div id="smap-search-bg" />'),
                a.addClass("search-active"),
                $("#mapdiv").append(t),
                setTimeout(function() {
                    t.addClass("search-bg-visible")
                }, 1))
            }
        }
        
        function t() {
            var e = $(window).width();
            e >= o.options.pxDesktop || !L.Browser.touch || (a.removeClass("search-active"),
            $("#smap-search-bg").removeClass("search-bg-visible"),
            setTimeout(function() {
                $("#smap-search-bg").remove()
            }, 300))
        }
        
        function s(e) {
            e.stopPropagation()
        }
        var o = this
        /*, a = $('<div id="smap-search-div" class="smap-search-div input-group input-group-lg"><span class="input-group-addon"><span class="glyphicon glyphicon-search"></span></span><input autocorrect="off" autocomplete="off" data-provide="typeahead" type="text" class="form-control" placeholder="' + this.lang.search + '"></input></div>')*/
        /*Mohammad Change*/
          
        , 
        a = $('<div id="smap-search-div" class="smap-search-div input-group input-group-lg"><span class="input-group-addon"><span class="glyphicon glyphicon-search"></span></span><input id="searchInputDetact" autocorrect="off" autocomplete="off" data-provide="typeahead" type="text" class="form-control" placeholder="' + this.lang.search + '"></input></div>')
        
        /*Mohammad Change*/
          
        , r = a.find("input");
        r.placeholder(),
        L.Browser.msTouch && r.attr("pattern", "[0-9]"),
        r.on("dblclick", s).on("mousedown", s).on("focus", function() {
            $(this).parent().addClass("smap-search-div-focused"),
            $("#mapdiv").trigger("touchstart"),
            e()
        }).on("blur", function() {
            $(this).parent().removeClass("smap-search-div-focused")
        }).on("touchstart", function() {
            $(this).focus()
        }),
        a.on("click touchstart", function(e) {
            $(this).find("input").focus(),
            e.stopImmediatePropagation()
        }),
        r.on("blur", t),
        $("#maindiv").append(a),
        smap.event.on("smap.core.pluginsadded", function() {
            var e = $("#smap-menu-div nav");
            e.length && a.addClass("smap-search-div-in-toolbar")
        });
        var n = this.options.whitespace
          , 
        i = this.options._geoLocate || this._geoLocate
          , 
        c = {
            items: 5,
            minLength: 2,
            highlight: !0,
            hint: !0,
            afterSelect: function(e) {
                return smap.cmd.loading(!0),
                i.call(o, e),
                t(),
                e
            }
        };
        $.extend(c, this.options.acOptions || {}),
        this.options.source ? c.source = $.proxy(this.options.source, this) : this.options.wsAcUrl ? c.source = function(e, t) {
            /*Mohamad Add*/
            e = e.replace(/^\s+|\s+$/g, "");
            /*console.log(e);*/
            /*Mohammad add*/
            e = encodeURIComponent(e);
            
            var s = o.options.wsAcUrl;
            n && (e = e.replace(/%20/g, n)),
            o._proxyInst && o._proxyInst.abort(),
            o._proxyInst = $.ajax({
                type: "GET",
                url: o.options.useProxy ? smap.config.ws.proxy + encodeURIComponent(s + "?q=") + e : s + "?q=" + e,
                dataType: "text",
                success: function(e) {
                    /*Mohammad Change*/
                    /*var s = e.split("\n");*/
                    var s = decodeURIComponent(e).replace(/^\s+|\s+$/g, "").split("\n");
                    /*Mohammad Change*/
                    
                    t(s)
                },
                error: function() {}
            })
        }
         : 
        this.options.wsAcLocal && this.options.wsAcLocal instanceof Array && (c.source = this.options.wsAcLocal),
        this._initAutoComplete(r, c)
    },
    _initAutoComplete: function(e, t) {
        t = t || this.options.typeaheadOptions;
        var s = this.options.autoScrollAcOnRowNbr;
        if (this._onKeyPress = this._onKeyPress || function(e) {
            var t = 38 === e.which
              , 
            o = 40 === e.which;
            if (t || o) {
                var a = $(".typeahead.dropdown-menu li.active")
                  , 
                r = a.parent().find("li").length;
                if (t && 1 === a.index() || o && a.index() === r - 1)
                    a.parent().scrollTo($(".typeahead.dropdown-menu li:first"), 0);
                else if (t && 0 === a.index())
                    a.parent().scrollTo($(".typeahead.dropdown-menu li:last"), 0);
                else if (a.index() >= s) {
                    for (var n = a, i = 0; s / 2 > i; i++)
                        n = n.prev();
                    n && n.length && a.parent().scrollTo(n, 0)
                }
            }
			
			if(typeof e.which !== "undefined" && e.which !== null){
			if(e.which === 13){
			var input_text= document.getElementById('searchInputDetact').value;
			if(input_text.length >4 && isFinite(input_text.replace(/ /gi,"").replace(",","").replace(".",""))){
				
				input_text = (function(){ if ( input_text.indexOf(',') > -1) {  return input_text }else {  return input_text.replace(" ",",") } })();
				var lat= input_text.split(',')[0];
				var lan =input_text.split(',')[1];
				
				var execute_coor_search=function(lat,lan){
				         var search_coordinate=L.latLng(lat,lan);
						   if(typeof L.Control.Search.prototype.marker !== "undefined" && L.Control.Search.prototype.marker !== null){
					       //L.Control.Search.prototype._searchLayer.removeLayer(L.Control.Search.prototype.marker)
						  
						    for(key in L.Control.Search.prototype._searchLayer._layers){
									L.Control.Search.prototype._searchLayer.removeLayer(L.Control.Search.prototype._searchLayer._layers[key])
									}
						
				           }
				         L.Control.Search.prototype.marker = L.marker(search_coordinate, {
                             iconOptions: L.icon(L.Control.Search.prototype.options.iconOptions)
                         }).addTo(L.Control.Search.prototype._searchLayer);
				         L.Control.Search.prototype.marker.on("click touchstart",function(){L.Control.Search.prototype._searchLayer.clearLayers();})
				         
				         smap.map.setView(search_coordinate, smap.cmd.getControls('L.Control.Search')[0].options.zoom, {
                             animate: !1
                         });
				}
				
				
				if(lat>180 || lan > 180){
				
				if((lat < 6906693.7888 && lat > 6120098.8505) && (lan < 223225.0217 && lan > 60857.4994) ){
					var coordinate =utils.projectLatLng(L.latLng(lat,lan),"EPSG:3008" , "EPSG:4326", !1, !1);
					execute_coor_search(coordinate.lat,coordinate.lng)
				}else{
					alert("Du är utanför kartområdet.\nKoordinat sökningen exempel:\n 1. För WGS 84 decimal (lat, lon) (GPS):\n 56.03079 14.15312\n Eller\n 56.03079,14.15312\n  2. För Sweref99 13 30 (X, Y):\n 6212180.214 190711.885\n Eller\n 6212180.214,190711.885\n");
				}
				}else{
				if((lat > 55.11294 && lat < 57.38874) && (lan > 11.86523 && lan < 17.20459)){
					execute_coor_search(lat,lan)
				}else{
					alert("Du är utanför kartområdet.\nKoordinat sökningen exempel:\n 1. För WGS 84 decimal (lat, lon) (GPS):\n 56.03079 14.15312\n Eller\n 56.03079,14.15312\n  2. För Sweref99 13 30 (X, Y):\n 6212180.214 190711.885\n Eller\n 6212180.214,190711.885\n");
				}
				
				}
				
				

				
				
			}
				
			}
		}
			
			
			
			
			
        }
        ,
        e.off("keydown", this._onKeyPress).on("keydown", this._onKeyPress),
        e.typeahead(t),
        this.options.acHeight) {
            var o = e.data("typeahead").$menu;
            o.css({
                "max-height": this.options.acHeight
            })
        }
    },
    _geoLocate: function(e, t) {
        t = t || {};
        var s = {
            setView: !0,
            showPopup: !0
        };
        t = $.extend({}, s, t),
        this.options.qPattern && (e = utils.extractToHtml(this.options.qPattern, {
            q: e
        }));
        /*Mohamad Add*/
        var e = e.replace(/^\s+|\s+$/g, "");
        /*Mohammad add*/
        e = encodeURIComponent(e);
        
        var o = this.options.wsLocateUrl;
        if (this.options.useProxy) {
            o = smap.config.ws.proxy + encodeURIComponent(o + "?q=") + e;
            var a = this.options.whitespace;
            a && (o = o.replace(/%20/g, a))
        } else
            o = o + "?q=" + e;
        var r = {
            success: function(s) {
                function o() {
                    $("#smap-search-popupbtn").off("click").on("click", function() {
                        return a._searchLayer.removeLayer(a.marker),
                        a.marker = null ,
                        !1
                    })
					
					
					if($(".lead")){
					if($(".lead").length>0){
					$(".lead")[0].style.width = ($(".leaflet-popup-content").width() - $(".leaflet-popup-close-button").width()) +"px";	
					}
					}
					
					
					
                }
                var a = this;
				if(typeof L.Control.Search.prototype.marker !== "undefined" && L.Control.Search.prototype.marker !== null){
					this.marker = L.Control.Search.prototype.marker;
				}
				
				
                /*if (this.marker && (this._searchLayer.removeLayer(this.marker),
                this.marker = null ),
                !s.features.length)
                    return void smap.cmd.notify(this.lang.addressNotFound, "error");*/
					
					if (this.marker) {																			
								for(key in this._searchLayer._layers){
									this._searchLayer.removeLayer(this._searchLayer._layers[key])
									}																			
						this.marker = null;
					}
					if (!s.features.length) {
						
						smap.cmd.notify(this.lang.addressNotFound, "error");
						return;
					}
					
               					
					
                var r = s.features[0].geometry.coordinates
                  , 
                n = L.latLng(r[1], r[0])
                  , 
                i = "EPSG:4326";
                if (this.options.wsOrgProj && this.options.wsOrgProj !== i) {
                    var c = window.proj4(this.options.wsOrgProj, i, [n.lng, n.lat]);
                    n = L.latLng(c[1], c[0])
                }
                this.map.off("popupopen", o),
                this.map.on("popupopen", o),
                this.marker = L.marker(n, {
                    iconOptions: L.icon(this.options.iconOptions)
                }).addTo(this._searchLayer),
                this.marker.options.q = e;
					var hideSearchDeleteButton=window.getQueryParameters('hideSDeleteButton');
					
				
				if(hideSearchDeleteButton.length>0){
					if(hideSearchDeleteButton==="true"){
						
						if(typeof t.poim !== "undefined" && t.poim !==null){
						if(t.poim){
						if(t.diainfo.length>0){
						
                          this.marker.bindPopup('<p class="lead">'+decodeURIComponent(t.diainfo)+'</p><div><button style="display:none;" id="smap-search-popupbtn" class="btn btn-default btn-sm">' + this.lang.remove + "</button></div>");						
						}else{
						this.marker.bindPopup('<p class="lead">' + decodeURIComponent(e) + '</p><div><button style="display:none;" id="smap-search-popupbtn" class="btn btn-default btn-sm">' + this.lang.remove + "</button></div>");	
						}
						}else{
						this.marker.bindPopup('<p class="lead">' + decodeURIComponent(e) + '</p><div><button style="display:none;" id="smap-search-popupbtn" class="btn btn-default btn-sm">' + this.lang.remove + "</button></div>");	
						}
						}else{
						this.marker.bindPopup('<p class="lead">' + decodeURIComponent(e) + '</p><div><button style="display:none;" id="smap-search-popupbtn" class="btn btn-default btn-sm">' + this.lang.remove + "</button></div>");	
						}
						
						
					}else{
						
					if(typeof t.poim !== "undefined" && t.poim !==null){
					if(t.poim){
					if(t.diainfo.length>0){
					
                    this.marker.bindPopup('<p class="lead">'+decodeURIComponent(t.diainfo)+'</p><div><button id="smap-search-popupbtn" class="btn btn-default btn-sm">' + this.lang.remove + "</button></div>");						
					}else{
					this.marker.bindPopup('<p class="lead">' + decodeURIComponent(e) + '</p><div><button id="smap-search-popupbtn" class="btn btn-default btn-sm">' + this.lang.remove + "</button></div>");				
					}
					}else{
					this.marker.bindPopup('<p class="lead">' + decodeURIComponent(e) + '</p><div><button id="smap-search-popupbtn" class="btn btn-default btn-sm">' + this.lang.remove + "</button></div>");			
					}
					}else{
					this.marker.bindPopup('<p class="lead">' + decodeURIComponent(e) + '</p><div><button id="smap-search-popupbtn" class="btn btn-default btn-sm">' + this.lang.remove + "</button></div>");		
					}
						
						
					}
				}else{
					
				   if(typeof t.poim !== "undefined" && t.poim !==null){
				   if(t.poim){
				   if(t.diainfo.length>0){
				   
                   this.marker.bindPopup('<p class="lead">'+decodeURIComponent(t.diainfo)+'</p><div><button id="smap-search-popupbtn" class="btn btn-default btn-sm">' + this.lang.remove + "</button></div>");				   
				   }else{
				   this.marker.bindPopup('<p class="lead">' + decodeURIComponent(e) + '</p><div><button id="smap-search-popupbtn" class="btn btn-default btn-sm">' + this.lang.remove + "</button></div>");					
				   }
				   }else{
				   this.marker.bindPopup('<p class="lead">' + decodeURIComponent(e) + '</p><div><button id="smap-search-popupbtn" class="btn btn-default btn-sm">' + this.lang.remove + "</button></div>");				
				   }
				   }else{
				   this.marker.bindPopup('<p class="lead">' + decodeURIComponent(e) + '</p><div><button id="smap-search-popupbtn" class="btn btn-default btn-sm">' + this.lang.remove + "</button></div>");			
				   }
					
					   
				}
				
				
                //this.marker.bindPopup('<p class="lead">' + decodeURIComponent(e) + '</p><div><button id="smap-search-popupbtn" class="btn btn-default btn-sm">' + this.lang.remove + "</button></div>");
                var p = t.zoom || this.options.zoom;
                t.setView ? this.map.setView(n, p, {
                    animate: !1
                }) : this.marker._popup.options.autoPan = !1,
                
                
                t.showPopup && this.marker.openPopup();
                
                /*Mohammad Change: Dirty fix for Android*/
				L.Control.Search.prototype.marker = this.marker;
                window.searchLayerMarker_catch = this.marker;
                window.setTimeout(function() {
                    window.searchLayerMarker_catch.closePopup();
                    window.searchLayerMarker_catch.openPopup();
					var hideSearchInfo=window.getQueryParameters('hideSearchInfo');
					if(hideSearchInfo.length>0){
						if(hideSearchInfo==="true"){
						window.searchLayerMarker_catch.closePopup();
                        var url_p= smap.core.Param.prototype.getWebParamsAsObject();smap.map.setView(window.searchLayerMarker_catch.getLatLng(), url_p.ZOOM || 16, {animate: !1});						
						}else{
							
							var hideSearchDeleteButton=window.getQueryParameters('hideSDeleteButton');
							if(hideSearchDeleteButton.length>0){
								if(hideSearchDeleteButton==="true"){
									$('#smap-search-popupbtn')[0].style.display="none";
								}
							}
						}
					}else{
						var hideSearchDeleteButton=window.getQueryParameters('hideSDeleteButton');
							if(hideSearchDeleteButton.length>0){
								if(hideSearchDeleteButton==="true"){
									$('#smap-search-popupbtn')[0].style.display="none";
								}
							}
						
					}
                }, 300);
                /*Mohammad Change: Dirty fix for Android*/
                
                this.options.clearEntryAfterSearch && $(".smap-search-div input").val(null ),
                $(".smap-search-div input").blur(),
                setTimeout(function() {
                    $(".smap-search-div input").blur()
                }, 100)
            },
            complete: function() {
                smap.cmd.loading(!1)
            }
        };
        $.ajax({
            url: o,
            type: "GET",
            dataType: "json",
            context: this,
            success: this.options.onLocateSuccess || r.success,
            complete: r.complete
        })
    },
    CLASS_NAME: "L.Control.Search"
}),
L.control.search = function(e) {
    return new L.Control.Search(e)
}
;
L.Control.SelectVector = L.Control.extend({
    options: {
        position: "bottomright",
        selectStyle: {
            weight: 5,
            color: "#00FFFF",
            fillColor: "#00FFFF",
            opacity: 1,
            fillOpacity: .5
        }
    },
    _lang: {
        sv: {
            exampleLabel: "Ett exempel"
        },
        en: {
            exampleLabel: "An example"
        }
    },
    _selectedFeatures: [],
    _setLang: function(e) {
        e = e || smap.config.langCode,
        this._lang && (this.lang = this._lang ? this._lang[e] : null )
    },
    initialize: function(e) {
        L.setOptions(this, e),
        this._setLang(e.langCode);
        var t = this;
        this._onFeatureClick = function(e) {
            var i = 200;
            t._clickWasRegistered || (t.onFeatureClick(e),
            t._clickWasRegistered = !0,
            setTimeout(function() {
                t._clickWasRegistered = !1
            }, i))
        }
    },
    activate: function() {
        this._active = !0
    },
    deactivate: function() {
        this._active = !1
    },
    onAdd: function(e) {
        return this.map = e,
        this._container = L.DomUtil.create("div", "leaflet-control-selectvector"),
        L.DomEvent.disableClickPropagation(this._container),
        this.$container = $(this._container),
        this.$container.css("display", "none"),
        this._bindEvents(),
        this.activate(),
        this._container
    },
    onRemove: function() {
        this.map.off("layeradd", this._onLayerAdded),
        this.map.off("click", this._onMapClick),
        this.deactivate()
    },
    _bindEvents: function() {
        this._onLayerAdded = $.proxy(this.onLayerAdded, this),
        this._onLayerRemoved = $.proxy(this.onLayerRemoved, this),
        this._onMapClick = $.proxy(this.onMapClick, this),
        this.map.on("layeradd", this._onLayerAdded),
        this.map.on("layerremove", this._onLayerRemoved),
        this.map.on("click", this._onMapClick)
    },
    onMapClick: function() {
        this._selectedFeatures = []
    },
    _vectorLayers: [],
    onLayerAdded: function(e) {
        var t = this
          , 
        i = e.layer
          , 
        a = i.hasOwnProperty("_layers");
        a && i.on && (i.on("load", function() {
            var e = function(e) {
                e.options = e.options || {},
                e.options.layerId = i.options.layerId,
                e.off("click", t._onFeatureClick),
                e.on("click", t._onFeatureClick)
            }
            ;
            this.eachLayer && this.eachLayer(e),
            this.off("dblclick", t._onFeatureClick).on("dblclick", t._onFeatureClick)
        }),
        this._vectorLayers.push(i))
    },
    onLayerRemoved: function(e) {
        if (e.layer.options && e.layer.options.layerId) {
            var t = e.layer.options.layerId;
            if (t && e.layer._layers) {
                var i = $.inArray(e.layer, this._vectorLayers);
                i > -1 && this._vectorLayers.splice(i, 1)
            }
        }
    },
    _layerFromFeature: function(e, t) {
        var i = t._layers;
        for (var a in i) {
            var r = i[a];
            if (r.feature && r.feature.id === e.id)
                return r
        }
        return null 
    },
    unselect: function(e) {
        var t = e.layerId
          , 
        i = smap.cmd.getLayer(t)
          , 
        a = $.inArray(e, this._selectedFeatures);
        this._selectedFeatures.splice(a, 1);
        var r = utils.getLayerFromFeature(e, i) || i;
        i.resetStyle.call(i, r),
        this._map.fire("unselected", {
            feature: e
        })
    },
    onFeatureClick: function(e) {
        if (!this._active)
            return !1;
        var t = e.layer && e.layer.feature ? e.layer.feature : e.target.feature || e.target
          , 
        i = e.originalEvent ? e.originalEvent.shiftKey || !1 : !1
          , 
        a = e.target
          , 
        r = a.options.layerId || e.layer.options.layerId
          , 
        s = smap.core.layerInst._getLayer(r);
        if (i === !1 && (this._selectedFeatures = [],
        s && s.resetStyle)) {
            var n = s.resetStyle;
            s.eachLayer(function(e) {
                n.call(s, e)
            });
            for (var o = this._vectorLayers, l = 0, c = o.length; c > l; l++)
                h = o[l],
                h.resetStyle && h !== s && h.resetStyle(h)
        }
        var y = $.inArray(t, this._selectedFeatures);
        if (i === !0 && y > -1) {
            this._selectedFeatures.splice(y, 1),
            this._map.fire("unselected", {
                feature: t
            });
            var h = this._layerFromFeature(t, s);
            s.resetStyle.call(s, h)
        } else {
            if (t.layerId = r,
            t.uniqueKey = s && s.options ? s.options.uniqueKey : t.layerId,
            this._selectedFeatures.push(t),
            s) {
                var d = this._layerFromFeature(t, s);
                d && d.setStyle && d.setStyle(s.options.selectStyle || this.options.selectStyle)
            }
            this._map.fire("selected", {
                feature: t,
                selectedFeatures: this._selectedFeatures,
                layer: s || t,
                latLng: e.latlng,
                shiftKeyWasPressed: e.originalEvent ? e.originalEvent.shiftKey || !1 : !1
            })
        }
    }
}),
L.control.selectVector = function(e) {
    return new L.Control.SelectVector(e)
}
;
L.Control.SelectWMS = L.Control.extend({
    options: {
        wmsVersion: "1.3.0",
        info_format: "text/plain",
        maxFeatures: 20,
        buffer: 12,
        useProxy: !1
    },
    _layers: [],
    _selectedFeatures: [],
    initialize: function(t) {
        L.setOptions(this, t)
    },
    onAdd: function(t) {
        return this.map = t,
        this.activate(),
        this._container = L.DomUtil.create("div", "leaflet-control-selectwms"),
        $(this._container).css("display", "none"),
        L.DomEvent.disableClickPropagation(this._container),
        this._container
    },
    onRemove: function() {
        this.deactivate()
    },
    onSuccess: function(t) {
        t = t || [];
        for (var e, s, i, n, a, r, o, l, c = 0, p = t.length; p > c; c++)
            if (e = t[c],
            r = e[0],
            o = e[1],
            l = o.params,
            s = r.features,
            r)
                if (r.features) {
                    var i, n, a, s = r.features;
                    if (!s.length)
                        continue;
                    for (var h = 0, u = s.length; u > h; h++) {
                        if (i = s[h],
                        n = smap.cmd.getLayerConfigBy("options.layers", l.layers) || smap.cmd.getLayerConfigBy("options.selectOptions.layers", l.layers),
                        !n && i.id) {
                            var f = i.id.split(".")[0];
                            if (l.layers.search(f) > -1)
                                for (var y = l.layers.split(","), m = 0, d = y.length; d > m; m++)
                                    if (y[m].search(f) > -1) {
                                        var g = y[m];
                                        n = smap.cmd.getLayerConfigBy("options.layers", g) || smap.cmd.getLayerConfigBy("options.selectOptions.layers", g)
                                    }
                        }
                        if (!n)
                            break;
                        a = n.options,
                        a.selectOptions && a.selectOptions.srs && "EPSG:4326" !== a.selectOptions.srs && utils.projectFeature(i, "EPSG:4326", {});
                        var _ = i.geometry.type;
                        if ("Point" === _ || "MultiPoint" === _) {
                            var v = [];
                            switch (_) {
                            case "Point":
                                v = i.geometry.coordinates;
                                break;
                            case "MultiPoint":
                                v = i.geometry.coordinates[0]
                            }
                            i.latLng = L.latLng([v[1], v[0]])
                        } else
                            i.latLng = o.latLng;
                        i.options = $.extend({}, a),
                        s[h] = i
                    }
                    this._selectedFeatures = this._selectedFeatures.concat(s)
                } else {
                    var x, b, S = o.latLng;
                    for (var P in r) {
                        x = r[P];
                        var C = P.split(":")
                          , 
                        O = C[C.length - 1]
                          , 
                        n = smap.cmd.getLayerConfigBy("layers", O, {
                            inText: !0
                        });
                        if (n && n.options && n.options.layerId)
                            for (var E = n.options.layerId, h = 0, u = x.length; u > h; h++) {
                                b = x[h];
                                var i = {
                                    geometry: {
                                        coordinates: [S.lng, S.lat]
                                    },
                                    latLng: L.latLng([S.lat, S.lng]),
                                    properties: b,
                                    layerId: E,
                                    options: n.options
                                };
                                b && $.isEmptyObject(b) === !1 && this._selectedFeatures.push(i)
                            }
                    }
                }
        this._selectedFeatures.length && this.map.fire("selected", {
            layer: this,
            feature: this._selectedFeatures.length ? this._selectedFeatures[0] : null ,
            selectedFeatures: this._selectedFeatures
        })
    },
    _applyParam: function(t) {
        var e, s, i, n, a, r = JSON.parse(decodeURIComponent(t)), 
        o = [];
        for (s in r)
            i = r[s],
            i.xy && (e = smap.core.layerInst.showLayer(s),
            o.push(e));
        n = i.xy && i.xy.length ? i.xy[0] : null ,
        n && (a = L.latLng(n[1], n[0]),
        this.onMapClick({
            latlng: a,
            _layers: o
        }))
    },
    onApplyParams: function(t, e) {
        e.SEL && this._applyParam(decodeURIComponent(e.SEL))
    },
    activate: function() {
        return this._active ? !1 : (this._active = !0,
        void this._bindEvents())
    },
    deactivate: function() {
        this._active = !1,
        this._unbindEvents()
    },
    _bindEvents: function() {
        this._onApplyParams = this._onApplyParams || $.proxy(this.onApplyParams, this),
        smap.event.on("smap.core.applyparams", this._onApplyParams),
        this.map.on("layeradd", this.onLayerAdd, this).on("layerremove", this.onLayerRemove, this).on("click", this.onMapClick, this).on("dblclick", this.onMapDblClick, this)
    },
    _unbindEvents: function() {
        smap.event.off("smap.core.applyparams", this._onApplyParams),
        this.map.off("layeradd", this.onLayerAdd, this).off("layerremove", this.onLayerRemove, this).off("click", this.onMapClick, this).off("dblclick", this.onMapDblClick, this)
    },
    onLayerAdd: function(t) {
        var e = t.layer;
        this._layerShouldBeAdded(e) === !0 && this._layers.push(e)
    },
    onLayerRemove: function(t) {
        var e = t.layer
          , 
        s = this._hasLayer(e);
        s !== !1 && this._layers.splice(s, 1)
    },
    onMapDblClick: function() {
        this._dblclickWasRegistered = !0,
        this.xhr && this.xhr.abort(),
        setTimeout($.proxy(function() {
            this._dblclickWasRegistered = !1
        }, this), 400)
    },
    onMapClick: function(t) {
        this._selectedFeatures = [];
        var e = t.latlng;
        this.xhr && this.xhr.abort();
        var s = t._layers || this._layers;
        if (s.length) {
            var i, n, a, r, o, l = this, 
            c = {}, 
            p = 0;
            $.each(s, function(t, e) {
                if (o = e.options || {},
                n = e._url || e._wmsUrl,
                /*Mohammad Change*/
                /*a = n.toUpperCase(),*/
                a = n.toUpperCase() + '&randomversion=' + Math.random(),
                /*Mohammad Change*/
                c[a]) {
                    var s = c[a].selectOptions || {}
                      , 
                    i = o.selectOptions || {}
                      , 
                    h = s.info_format || l.options.info_format;
                    r = h && i.info_format && h !== i.info_format,
                    r && (a += "_1")
                }
                /*Mohammad Change*/
                /*c[a] || (c[a] = {
                        layerNames: [],
                        url: n,
                        wmsVersion: e._wmsVersion,
                        layerId: o.layerId,
                        selectOptions: o.selectOptions || {}
                    },
                    p += 1),*/
                c[a] = {
                    layerNames: [],
                    url: n,
                    wmsVersion: e._wmsVersion,
                    layerId: o.layerId,
                    selectOptions: o.selectOptions || {}
                },
                p += 1,
                /*Mohammad Change*/
                c[a].layerNames.push(o.selectOptions && o.selectOptions.layers ? o.selectOptions.layers : o.layers)
            });
            var h;
            setTimeout($.proxy(function() {
                if (this._dblclickWasRegistered === !0)
                    ;
                else {
                    var t = [];
                    for (var s in c) {
                        i = c[s],
                        /*Mohammad Change: Number: 1*/
                        /*bbox*/
                        /* h = this._makeParams({
                                     layers: i.layerNames.join(","),
                                     version: i._wmsVersion || this.options.wmsVersion,
                                     info_format: i.selectOptions.info_format || this.options.info_format,
                                     latLng: e,
                                     srs: i.selectOptions.srs || "EPSG:4326"
                                 }, i.selectOptions),*/
                        
                        h = this._makeParams({
                            layers: i.layerNames.join(","),
                            version: i._wmsVersion || this.options.wmsVersion,
                            info_format: i.selectOptions.info_format || this.options.info_format,
                            request: i.selectOptions.request || this.options.request,
                            query_layers: i.selectOptions.query_layers || i.layerNames.join(","),
                            service: i.selectOptions.service || this.options.service,
                            buffer: i.selectOptions.buffer || this.options.buffer,
                            outputFormat: i.selectOptions.outputFormat || this.options.outputFormat,
                            latLng: e,
                            srs: i.selectOptions.srs || "EPSG:4326"
                        }, i.selectOptions),
                        /*Mohammad*/
                        
                        "text/plain" === h.info_format && (h.version = "1.1.1");
                        var n = this.onSuccess;
                        this.request(i.selectOptions.url || i.url, h, {
                            onSuccess: function(e, s) {
                                p -= 1,
                                t.push([e, s]),
                                0 >= p && n.call(this, t)
                            },
                            onError: function() {
                                p -= 1
                            },
                            layerId: i.layerId,
                            latLng: e
                        })
                    }
                }
            }, this), 100)
        }
    },
    _layerShouldBeAdded: function(t) {
        var e = t.wmsParams ? !0 : !1;
        return t.options && t.options.selectable && t.options.selectable === !0 && this._hasLayer(t) === !1 && e === !0 ? !0 : !1
    },
    _hasLayer: function(t) {
        for (var e = this._layers, s = 0, i = e.length; i > s; s++)
            if (t === e[s])
                return s;
        return !1
    },
    _makeParams: function(t, e) {
        e = e || {};
        
        /* Mohammad Change: Number: 2*/
        /*var s = this.map.latLngToContainerPoint(t.latLng)
              , i = this.map.getBounds()
              , n = i.toBBoxString();*/
        
        var s = this.map.latLngToContainerPoint(t.latLng);
        var clk_buf = t.buffer;
        /*buffer around click*/
        
        var left_pixel = new OpenLayers.Pixel(s.x - clk_buf,s.y + clk_buf)
          , 
        right_pixel = new OpenLayers.Pixel(s.x + clk_buf,s.y - clk_buf);
        var left_point = L.point(left_pixel.x, left_pixel.y)
          , 
        right_point = L.point(right_pixel.x, right_pixel.y);
        var lng_lat_left = this.map.containerPointToLatLng(left_point)
          , 
        lng_lat_right = this.map.containerPointToLatLng(right_point);
        
        /*var i = this.map.getBounds();*/
        var i = L.latLngBounds(lng_lat_left, lng_lat_right);
        var n = i.toBBoxString();
        
        
        /* Mohammad Change*/
        
        
        if (e.srs && "EPSG:4326" !== t.srs) {
            var a = i.getSouthWest()
              , 
            r = i.getNorthEast();
            a = utils.projectLatLng(a, "EPSG:4326", t.srs, !1, !1),
            r = utils.projectLatLng(r, "EPSG:4326", t.srs, !1, !1),
            i = L.latLngBounds(a, r),
            n = i.toBBoxString()
        }
        if (e.reverseAxisBbox) {
            var o = n.split(",");
            n = [o[1], o[0], o[3], o[2]].join(",")
        }
        var l = $.extend({}, {
            service: "WMS",
            request: "GetFeatureInfo",
            version: this.options.version,
            bbox: n,
            layers: null ,
            styles: "",
            typename: t.layers,
            query_layers: t.layers,
            info_format: t.info_format,
            feature_count: this.options.maxFeatures,
            x: utils.round(s.x),
            y: utils.round(s.y),
            buffer: this.options.buffer,
            width: utils.round(this.map.getSize().x),
            height: utils.round(this.map.getSize().y),
            srs: "EPSG:4326",
            exceptions: "application%2Fvnd.ogc.se_xml"
        }, t);
        return delete l.latLng,
        l
    },
    _parseText: function(t) {
        for (var e, s, i, n, a, r, o = {}, l = {}, c = t.split("\n"), p = 0, h = c.length; h > p; p++)
            if (e = c[p],
            0 !== $.trim(e).length)
                if (-1 !== e.search("=")) {
                    if (s = e.split("="),
                    s.length > 2) {
                        var u = s.slice(1);
                        n = u.join("=")
                    } else
                        n = s[1];
                    n = $.trim(n),
                    "null" == n.toLowerCase() && (n = "");
                    var f = /^[0-9.]+$/.test(n)
                      , 
                    y = n.split(".")
                      , 
                    m = y.length <= 2 && y[0].length > 0 && (1 === y.length || 2 === y.length && y[1].length > 0);
                    if (f === !0 && m) {
                        try {
                            switch (y.length) {
                            case 1:
                                a = parseInt(n);
                                break;
                            case 2:
                                a = parseFloat(n)
                            }
                        } catch (d) {}
                        a && isNaN(a) === !1 && (n = a)
                    }
                    i = $.trim(s[0]),
                    l[i] = n
                } else {
                    var g = e.search(/'/);
                    if (g > -1) {
                        e = e.substring(g + 1),
                        g = e.search(/'/),
                        r && o[r] && $.isEmptyObject(l) === !1 && (o[r].push($.extend({}, l)),
                        l = {}),
                        r = e.substring(0, g),
                        o[r] || (o[r] = []);
                        continue
                    }
                    r && o[r] && $.isEmptyObject(l) === !1 && e.search(/\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-/gi) > -1 ? (o[r].push($.extend({}, l)),
                    l = {}) : i && n && (l[i] = n + " " + e)
                }
        return r && o[r] && $.isEmptyObject(l) === !1 && o[r].push($.extend({}, l)),
        o
    },
    request: function(t, e, s) {
        e = e || {},
        s = s || {};
        var i = null ;
        this.options.useProxy ? t = smap.config.ws.proxy + encodeURIComponent(t + "?" + $.param(e)) : i = e,
        this.xhr = $.ajax({
            url: t,
            data: i,
            type: "GET",
            dataType: "text",
            context: this,
            success: function(t) {
                var i, n = e.info_format;
                if ("text/plain" === n)
                    i = this._parseText(t);
                else {
                    if ("application/json" !== n)
                        return !1;
                    /*Mohammad Change*/
                    /*i = JSON.parse(t)*/
                    i = JSON.parse(t.replace(/(?:\r\n|\r|\n)/g, ''))
                    /*Mohammad Change*/
                }
                s.onSuccess.call(this, i, {
                    latLng: s.latLng,
                    map: this.map,
                    context: this,
                    params: e
                })
            },
            error: s.onError
        })
    },
    CLASS_NAME: "L.Control.SelectWMS"
}),
L.control.selectWMS = function(t) {
    return new L.Control.SelectWMS(t)
}
;
L.Control.SearchLund = L.Control.extend({
    options: {
        whitespace: "%2B",
        wsOrgProj: "EPSG:3006",
        pxDesktop: 992,
        addToMenu: !1
    },
    _lang: {
        sv: {
            search: "Sök",
            addressNotFound: "Den sökta adressen hittades inte",
            remove: "Ta bort"
        },
        en: {
            search: "Search property",
            addressNotFound: "The searched address was not found",
            remove: "Remove"
        }
    },
    _setLang: function(t) {
        t = t || smap.config.langCode || navigator.language.split("-")[0] || "en",
        this._lang && (this.lang = this._lang ? this._lang[t] : null )
    },
    initialize: function(t) {
        L.setOptions(this, t),
        this._setLang(t.langCode)
    },
    onAdd: function(t) {
        var o = this;
        return this.map = t,
        this._container = L.DomUtil.create("div", "leaflet-control-searchlund"),
        L.DomEvent.disableClickPropagation(this._container),
        this.$container = $(this._container),
        this.$container.css("display", "none"),
        this._makeSearchField(),
        this.__onApplyParams = this.__onApplyParams || $.proxy(this._onApplyParams, this),
        smap.event.on("smap.core.applyparams", this.__onApplyParams),
        this.__onCreateParams = this.__onCreateParams || $.proxy(this._onCreateParams, this),
        smap.event.on("smap.core.createparams", this.__onCreateParams),
        this.map.on("click", this._blurSearch),
        o._container
    },
    _blurSearch: function() {
        $("#smap-searchlund-div input").blur()
    },
    onRemove: function() {
        smap.event.off("smap.core.applyparams", this.__onApplyParams),
        smap.event.off("smap.core.createparams", this.__onCreateParams),
        this.map.off("click", this._blurSearch)
    },
    _onApplyParams: function(t, o) {
        if (o.POI) {
            var a = o.POI instanceof Array ? o.POI[0] : o.POI;
            a = a.replace(/--c--/g, ",");
            var e = o.POI instanceof Array && o.POI.length > 1 ? o.POI[1] : !1;
            this._geoLocate(decodeURIComponent(a), {
                setView: !1,
                showPopup: e
            })
        }
    },
    _onCreateParams: function(t, o) {
        if (this.marker && this.marker.options.q) {
            var a = this.marker.getPopup()._isOpen ? !0 : !1;
            o.POI = [encodeURIComponent(this.marker.options.q.replace(/,/g, "--c--"))],
            a && o.POI.push(1)
        }
    },
    _rmAdressMarker: function(t) {
        null  != t && (this.map.removeLayer(t),
        this.addressMarker = null )
    },
    _makeSearchField: function() {
        function t() {
            var t = $(window).width();
            if (!(t >= e.options.pxDesktop) && L.Browser.touch) {
                var o = $("#smap-searchlund-bg");
                o.length || (o = $('<div id="smap-searchlund-bg" />'),
                s.addClass("searchlund-active"),
                $("#mapdiv").append(o),
                setTimeout(function() {
                    o.addClass("searchlund-bg-visible")
                }, 1))
            }
        }
        
        function o() {
            var t = $(window).width();
            t >= e.options.pxDesktop || !L.Browser.touch || (s.removeClass("searchlund-active"),
            $("#smap-searchlund-bg").removeClass("searchlund-bg-visible"),
            setTimeout(function() {
                $("#smap-searchlund-bg").remove()
            }, 300))
        }
        
        function a(t) {
            t.stopPropagation()
        }
        var e = this
          , 
        s = $('<div id="smap-searchlund-div" class="input-group input-group-lg"><span class="input-group-addon"><span class="glyphicon glyphicon-search"></span></span><input autocorrect="off" autocomplete="off" data-provide="typeahead" type="text" class="form-control" placeholder="' + this.lang.search + '"></input></div>')
          , 
        n = s.find("input");
        L.Browser.msTouch && n.attr("pattern", "[0-9]"),
        n.on("keypress", t).on("dblclick", a).on("mousedown", a).on("focus", function() {
            $(this).parent().addClass("smap-searchlund-div-focused")
        }).on("blur", function() {
            $(this).parent().removeClass("smap-searchlund-div-focused")
        }).on("touchstart", function() {
            $(this).focus()
        }),
        s.on("click touchstart", function(t) {
            $(this).find("input").focus(),
            t.stopImmediatePropagation()
        }),
        n.on("blur", o),
        $("#mapdiv").append(s),
        smap.event.on("smap.core.pluginsadded", function() {
            var t = $("#smap-menu-div nav");
            t.length && s.addClass("smap-searchlund-div-in-toolbar")
        });
        var r = this.options.whitespace
          , 
        p = this.options._geoLocate || this._geoLocate
          , 
        c = {
            items: 10,
            minLength: 2,
            highlight: !0,
            hint: !0,
            updater: function(t) {
                return smap.cmd.loading(!0),
                p.call(e, t),
                o(),
                t
            }
        };
        this.options.wsAcUrl ? c.source = function(t, o) {
            var a = encodeURIComponent(e.options.wsAcUrl + "?format=json&prefix=" + t);
            r && (a = a.replace(/%20/g, r)),
            e.proxyInst && e.proxyInst.abort(),
            e.proxyInst = $.ajax({
                type: "GET",
                url: smap.config.ws.proxy + a,
                dataType: "text",
                success: function(t) {
                    var a = $.parseJSON(t)
                      , 
                    e = [];
                    for (i = 0,
                    len = a.items.length; i < len; i++)
                        e[i] = a.items[i].name;
                    o(e)
                },
                error: function() {}
            })
        }
         : 
        this.options.wsAcLocal && this.options.wsAcLocal instanceof Array && (c.source = this.options.wsAcLocal),
        n.typeahead(c)
    },
    _geoLocate: function(t, o) {
        o = o || {};
        var a = {
            setView: !0,
            showPopup: !0
        };
        o = $.extend({}, a, o),
        this.options.qPattern && (t = utils.extractToHtml(this.options.qPattern, {
            q: t
        }));
        var e = encodeURIComponent(this.options.wsLocateUrl + "?format=json&objectname=" + t)
          , 
        s = this.options.whitespace;
        s && (e = e.replace(/%20/g, s));
        var n = {
            success: function(a) {
                function e() {
                    $("#smap-searchlund-popupbtn").off("click").on("click", function() {
                        return s.map.removeLayer(s.marker),
                        s.marker = null ,
                        s.polyLayerGroup.clearLayers(),
                        s.map.removeLayer(s.polyLayerGroup),
                        !1
                    })
                }
                var s = this;
                if (this.marker && (this.map.removeLayer(this.marker),
                this.marker = null ,
                this.polyLayerGroup && (this.polyLayerGroup.clearLayers(),
                s.map.removeLayer(this.polyLayerGroup))),
                !a.items.length)
                    return void smap.cmd.notify(this.lang.addressNotFound, "error");
                for (var n = [], r = 0, i = a.items.length; i > r; r++)
                    n[r] = $.parseJSON(a.items[r].geometry);
                if ("MultiPoint" == n[0].type) {
                    var p = L.latLng(n[0].coordinates[0][1], n[0].coordinates[0][0])
                      , 
                    c = "EPSG:4326";
                    if (this.options.wsOrgProj && this.options.wsOrgProj !== c) {
                        var l = window.proj4(this.options.wsOrgProj, c, [p.lng, p.lat]);
                        p = L.latLng(l[1], l[0])
                    }
                }
                if ("Polygon" == n[0].type) {
                    for (var p, h = [], u = 0; u < n.length; u++)
                        h[u] = [];
                    for (var d = 0, m = n.length; m > d; d++)
                        for (var u = 0, f = n[d].coordinates[0].length; f > u; u++) {
                            var p = L.latLng(n[d].coordinates[0][u][1], n[d].coordinates[0][u][0])
                              , 
                            c = "EPSG:4326";
                            if (this.options.wsOrgProj && this.options.wsOrgProj !== c) {
                                var l = window.proj4(this.options.wsOrgProj, c, [p.lng, p.lat]);
                                p = L.latLng(l[1], l[0])
                            }
                            h[d].push(p)
                        }
                }
                if (this.map.off("popupopen", e),
                this.map.on("popupopen", e),
                "MultiPoint" == n[0].type && (this.marker = L.marker(p).addTo(this.map),
                this.marker.options.q = t,
                this.marker.bindPopup('<p class="lead">' + t + '</p><div><button id="smap-searchlund-popupbtn" class="btn btn-default">' + this.lang.remove + "</button></div>"),
                o.setView && this.map.setView(p, 17, {
                    animate: !1
                })),
                "Polygon" == n[0].type) {
                    this.polyLayerGroup = new L.LayerGroup;
                    for (var u = 0; u < n.length; u++)
                        this.mapPolygon = L.polygon(h[u]),
                        this.polyLayerGroup.addLayer(this.mapPolygon);
                    this.map.addLayer(this.polyLayerGroup);
                    var g = this.mapPolygon.getBounds().getCenter();
                    this.marker = L.marker(g).addTo(this.map),
                    this.marker.options.q = t,
                    this.marker.bindPopup('<p class="lead">' + t + '</p><div><button id="smap-searchlund-popupbtn" class="btn btn-default">' + this.lang.remove + "</button></div>"),
                    o.setView && this.map.setView(p, 17, {
                        animate: !1
                    })
                }
                o.showPopup && this.marker.openPopup(),
                $("#smap-searchlund-div input").val(null ),
                $("#smap-searchlund-div input").blur(),
                setTimeout(function() {
                    $("#smap-searchlund-div input").blur()
                }, 100)
            },
            complete: function() {
                smap.cmd.loading(!1)
            }
        };
        $.ajax({
            url: smap.config.ws.proxy + e,
            type: "GET",
            dataType: "json",
            context: this,
            success: this.options.onLocateSuccess || n.success,
            complete: n.complete
        })
    },
    CLASS_NAME: "L.Control.SearchLund"
}),
L.control.searchLund = function(t) {
    return new L.Control.SearchLund(t)
}
;
L.Control.ShareLink = L.Control.extend({
    options: {
        position: "bottomright",
        addToMenu: !1,
        maxLen: 2083,
        root: null 
    },
    _lang: {
        sv: {
            caption: "Länk till kartan",
            close: "Stäng",
            tooLong: "För lång länk",
            tooLongUrl: "Notera! Länken är för lång för att fungera i en del äldre webbläsare. Ta bort ett eller flera ritade objekt för att göra länken kortare."
        },
        en: {
            caption: "Share link",
            close: "Close",
            tooLong: "Too long link",
            tooLongUrl: "Note! The link may not work in some older browsers. Please remove one or more drawn features to make it shorter."
        }
    },
    _setLang: function(t) {
        t = t || smap.config.langCode,
        this._lang && (this.lang = this._lang ? this._lang[t] : null )
    },
    initialize: function(t) {
        L.setOptions(this, t),
        this._setLang(t.langCode)
    },
    onAdd: function(t) {
        return this.map = t,
        this._container = L.DomUtil.create("div", "leaflet-control-ShareLink"),
        L.DomEvent.disableClickPropagation(this._container),
        this.$container = $(this._container),
        this._createBtn(),
        this._container
    },
    activate: function() {
        function t() {
            s.find("input[type=text]").prop("disabled", !0),
            s.off("shown.bs.modal", t)
        }
        var n = this
          , 
        o = smap.cmd.createParams(this.options.root || !0)
          , 
		//2017-01-11
		//i = $('<div class="form-group"><input type="text" class="form-control" placeholder="' + this.lang.caption + '"></div>')
		//2018-07-09
		
        i = $('<div class="form-group"><input id="share_link_main_id" type="text" class="form-control" placeholder="' + this.lang.caption + '"></br><div id="qrcode_shortlink_id" style ="display:none;"><span><b style="color:#428bca;">Kort länk:</b></span></br><a id ="short_link_id" href="" target="_blank"></a></br></br><span>  <a id="download_qrcode_id" href="" download><b>Hämta QR-kod:  </b><span class="glyphicon glyphicon-download"></span></a> </span><div id="qrcode" style="width:150px; height:150px; margin-top:15px;"></div></div></div>')
		//2018-07-09
		//2017-01-11
          , 
        a = i.find("input");
        a.val(o);
        var e = function(t) {
            t.setSelectionRange ? t.setSelectionRange(0, 9999) : $(t).select()
        }
        ;
        if (!this._$dialog) {
			L.Control.ShareLink.prototype.qrcode_shortlink = {};
            window.sendMail = {},
            window.sendMail.upd_link = o,
            window.sendMail.shareLinkByMail = function() {
				//2018-07-09
				var shortLink = document.getElementById('short_link_id')[getTextContent(document.getElementById('short_link_id'))];

				//2018-07-09
                var a_t = document.createElement('a');
				
				if(shortLink.length > 0){
				a_t.href = "mailto:?body=" + encodeURIComponent(window.sendMail.upd_link) + '%0D%0A Kort länk: %0D%0A' + shortLink; 	
				}else{
				a_t.href = "mailto:?body=" + encodeURIComponent(window.sendMail.upd_link);	
				}
                
                a_t.click()
            }
            ;
			
		    //2017-01-11
		    window.sendMail.shareLinkBySocialMedia = function() {					   
            L.Control.ShareLink.prototype._createShareDialog();			            			
            $(".sharer-container").sharer();
            };
			//2017-01-11
			
			//2018-07-09
			L.Control.ShareLink.prototype.qrcode_shortlink._randomTextAndNumberParameter = function(){ 
            var text=""; 
		    var textPlusNumber="";		
            var possible="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxuz0123456789";
            for (var i=0;i<5;i++){
            text+=possible.charAt(Math.floor(Math.random()* possible.length))
            }; 
			textPlusNumber = "&"+text +"="+Math.floor(Math.random()*Math.pow(10,18))
             return textPlusNumber;
             }
			 
		   L.Control.ShareLink.prototype.qrcode_shortlink.registerShortLink = function(linkname){
			   var registerLink_url = "/kortlank/linkregister.php";			   
			   var reqParams = "linkname="+linkname;
			       reqParams += '&link='+encodeURIComponent(window.sendMail.upd_link);
				   reqParams += L.Control.ShareLink.prototype.qrcode_shortlink._randomTextAndNumberParameter();
			   var registerLink_xhr= new smap.cmd._xhr_handler();
	               registerLink_xhr.open("POST", registerLink_url, false);
				   registerLink_xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	               registerLink_xhr.send(reqParams );
			       if (registerLink_xhr.readyState == 4 && registerLink_xhr.status == 200) {
			       var registerLink_xhrResponse = JSON.parse(registerLink_xhr.responseText);				   				   
			       if(typeof registerLink_xhrResponse.save_status.match('Resource id #') !== "undefined" && registerLink_xhrResponse.save_status.match('Resource id #') !== null){
			       if(registerLink_xhrResponse.save_status.match('Resource id #').indexOf('Resource id #') >= 0){
					return "success";				
				    }else{
					return "fail";	
					}	
			        }else{
					return "fail";	
					}			              		 			              	 
				   }				   
			   
			  return "fail"; 
		   }
		   
		   L.Control.ShareLink.prototype.qrcode_shortlink.isLinkInDBPlusLinkName = function(){
			  var linkname = [];
			   var getLinkNameBy_link_url = "/kortlank/getlinknameby_link.php?link="+encodeURIComponent(window.sendMail.upd_link)+L.Control.ShareLink.prototype.qrcode_shortlink._randomTextAndNumberParameter();
			   var  getLinkNameBy_link_xhr= new smap.cmd._xhr_handler();
	               getLinkNameBy_link_xhr.open("GET", getLinkNameBy_link_url, false);
	               getLinkNameBy_link_xhr.send(null );
			       if (getLinkNameBy_link_xhr.readyState == 4 && getLinkNameBy_link_xhr.status == 200) {
			       var getLinkNameBy_link_xhr_xhrResponse = JSON.parse(getLinkNameBy_link_xhr.responseText);
                      return getLinkNameBy_link_xhr_xhrResponse.linkname;  		 			              	 
				   }				   
			   
			  return linkname; 
		    
			   
		   }

           L.Control.ShareLink.prototype.qrcode_shortlink.shortLinkAndQRCode = function(uniqueLinkName){		    
			var unique_short_link = window.location.protocol+"//"+window.location.host+"/kortlank/?id="+uniqueLinkName,				
            short_link_tag = document.getElementById('short_link_id');
			short_link_tag.href= unique_short_link;
			short_link_tag[getTextContent(short_link_tag)] = unique_short_link;
			
			if(typeof L.Control.ShareLink.prototype.qrcode_shortlink.qrcode !== "undefined" && L.Control.ShareLink.prototype.qrcode_shortlink.qrcode !== null){
				L.Control.ShareLink.prototype.qrcode_shortlink.qrcode.clear();
                for(var i = L.Control.ShareLink.prototype.qrcode_shortlink.qrcode._el.childNodes.length-1; i>-1 ; i--){
					L.Control.ShareLink.prototype.qrcode_shortlink.qrcode._el.removeChild(L.Control.ShareLink.prototype.qrcode_shortlink.qrcode._el.childNodes[i]);
				}				
				
			}
			
				L.Control.ShareLink.prototype.qrcode_shortlink.qrcode = new QRCode(document.getElementById("qrcode"), {
	              width : 150,
	              height : 150
                  });
                			  
		        L.Control.ShareLink.prototype.qrcode_shortlink.qrcode.makeCode(unique_short_link);
				window.currentQRCode = "";
				L.Control.ShareLink.prototype.qrcode_shortlink.downloadQRCode=setInterval(function(){if(window.currentQRCode.length > 0){document.getElementById('download_qrcode_id').href = window.currentQRCode;document.getElementById('download_qrcode_id').download = uniqueLinkName;clearInterval(L.Control.ShareLink.prototype.qrcode_shortlink.downloadQRCode)}},100);			

			   
			   
		   }		   
         	
		   L.Control.ShareLink.prototype.qrcode_shortlink.createShortLinkAndQRCode = function(){
			if(window.sendMail.upd_link.length > L.Control.ShareLink.prototype.options.maxLen){
				alert('Notera! Länken är för lång för att fungera i en del äldre webbläsare. Ta bort ett eller flera ritade objekt för att göra länken kortare.');
			}else{
            var datum = new Date(),
			uniqueLinkName = datum.getFullYear()+'-'+(eval(datum.getMonth())+1)+'-'+datum.getDate()+'-'+datum.getHours()+'-'+datum.getMinutes()+'-'+datum.getSeconds()+'-'+datum.getMilliseconds();
            var isLinkInDBPlusLinkName = L.Control.ShareLink.prototype.qrcode_shortlink.isLinkInDBPlusLinkName();
			
			if(isLinkInDBPlusLinkName.length > 0){
				
			var linkNameFromDB = isLinkInDBPlusLinkName[0].linkname;
			L.Control.ShareLink.prototype.qrcode_shortlink.shortLinkAndQRCode(linkNameFromDB);
			document.getElementById('qrcode_shortlink_id').style.display = "block";
			
			}else{
			if(L.Control.ShareLink.prototype.qrcode_shortlink.registerShortLink(uniqueLinkName)==="success"){
				
			L.Control.ShareLink.prototype.qrcode_shortlink.shortLinkAndQRCode(uniqueLinkName);			
			document.getElementById('qrcode_shortlink_id').style.display = "block";
			
			}else{
			 alert('Failed to create short link and qr code');	
			}
			
			}			 	
							
			}   
			}

           //2018-07-09						
						
			//2017-01-11
            //var l = '<button class="btn btn-default" onclick="window.sendMail.shareLinkByMail();">Skicka e-post</button><button type="button" class="btn btn-default" data-dismiss="modal">' + this.lang.close + "</button>";
            //2018-07-09
			var l = '<button  style="margin-top:5px;margin-bottom:5px;" class="btn btn-default" onclick="L.Control.ShareLink.prototype.qrcode_shortlink.createShortLinkAndQRCode();">Skapa QR-kod och kort länk</button> <button style="margin-top:5px;margin-bottom:5px;"  class="btn btn-default" onclick="window.sendMail.shareLinkBySocialMedia();">Dela länk</button><button style="margin-top:5px;margin-bottom:5px;" class="btn btn-default" onclick="window.sendMail.shareLinkByMail();">Skicka e-post</button><button style="margin-top:5px;margin-bottom:5px;" type="button" class="btn btn-default" data-dismiss="modal">' + this.lang.close + "</button>";
            //2018-07-09
			//2017-01-11
			
			this._$dialog = utils.drawDialog(this.lang.caption, i, l),
            this._$dialog.attr("id", "slink-modal"),
            a.on("tap click", function() {
                e(this)
            }),
            this._$dialog.on("shown.bs.modal", function() {
                e(a[0])
            }),
            this._$dialog.on("hide.bs.modal", function() {
                $(this).find("input[type=text]").blur()
            }),
            this._$dialog.on("hidden.bs.modal", function() {
                n._$dialog.empty().remove(),
                n._$dialog = null 
            })
        }
        if (o.length > this.options.maxLen) {
            var s = this._$dialog
              , 
            r = smap.cmd.notify(this.lang.tooLongUrl, "warning", {
                parent: i.parent()
            });
            r.removeClass("map-alert"),
            s.find("input[type=text]").val(this.lang.tooLong),
            s.on("shown.bs.modal", t)
        }
        this._$dialog.modal("show");
		
    },
	//2017-01-11
	_createShareDialog: function(){
		
	    var innerWidth_custom = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
          , 
        innerHeight_custom = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        var geDiv = document.createElement('div')
          , 
        width = innerWidth_custom
          , 
        height = innerHeight_custom;
        geDiv.id = "socialSiteShare_Id",
        geDiv.style.width = width + "px",
        geDiv.style.height = height + "px",
        geDiv.style.left = (innerWidth_custom / 2 - width / 2) + "px",
        geDiv.style.top = (innerHeight_custom / 2 - height / 2) + "px",
        geDiv.style.background = "rgba(0,0,0,0.5)",
        geDiv.style.zIndex = "10000",
        geDiv.style.position = "fixed",
        geDiv.style.border = "5px solid white",
        geDiv.style.borderRadius = "15px";		
        
        var closeSpan_div = document.createElement('div');
        closeSpan_div.id = "closeSpan_div_id",
        closeSpan_div.style.position = "relative";
        closeSpan_div.style.paddingBottom="13px";
        var closeSpan = document.createElement('span');
		closeSpan.id="closeSpan_text_id",
        closeSpan.style.color = "white",
        closeSpan[getTextContent(closeSpan)] = " X ",
        closeSpan.style.position = "relative",
        closeSpan.style.borderRadius = "20px",
        closeSpan.style.background = "rgba(0,0,0,1)",
        closeSpan.style.fontSize = "25px",		
        closeSpan.style.top = "10px",
        closeSpan.style.left = (width / 2 - 10) + "px";
        closeSpan.onclick = function() {
            var getSplDiv = document.getElementById("socialSiteShare_Id");
            if (getSplDiv) {
                document.body.removeChild(getSplDiv);
            }
        }
        ;
        closeSpan_div.appendChild(closeSpan),
        geDiv.appendChild(closeSpan_div);		
		var share_div = document.createElement('div');
            share_div.className = 'sharer-container';
			share_div.style.display='block';
			
			if(width <= 400){
			var margin_left_px=0;	
			}else{
			var margin_left_px=(width / 2 - 200);	
			}
			
			share_div.style.marginLeft= margin_left_px + "px";
			share_div.id='sharer-bottom';
			geDiv.appendChild(share_div);			
           document.body.appendChild(geDiv);
		   
		smap.map.on('resize onorientationchange', function() {
        var geDiv = document.getElementById("socialSiteShare_Id");
        
		if(geDiv){
		var innerWidth_custom = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,innerHeight_custom = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;		       
        geDiv.style.width = innerWidth_custom + "px",
        geDiv.style.height = innerHeight_custom + "px";
        var sharer_container = document.getElementById("sharer-bottom");
		
		if(innerWidth_custom <= 400){
		var margin_left_px=0;	
		}else{
		var margin_left_px=(innerWidth_custom / 2 - 200);	
		}		
		sharer_container.style.marginLeft= margin_left_px + "px";
		
		var closeSpan_text = document.getElementById("closeSpan_text_id"); 
            closeSpan_text.style.left = (innerWidth_custom / 2 - 10) + "px";
		
		}		

        });
        
		   
	},
	//2017-01-11
    _createBtn: function() {
        var t = this
          , 
        n = $('<button id="smap-sharelink-btn" title="' + this.lang.caption + '" class="btn btn-default"><span class="fa fa-link"></span></button>');
        n.on("click touchstart", function() {
            return t.activate(),
            !1
        }),
        this.$container.append(n)
    },
    onRemove: function() {}
}),
L.control.sharePos = function(t) {
    return new L.Control.SharePos(t)
}
;
L.Control.SharePosition = L.Control.extend({
    options: {
        position: "bottomright",
        autoActivate: !1,
        wfsSource: "//kartor.malmo.se:8081/geoserver/wfs",
        wfsFeatureType: "sandbox:sharedpositions",
        wfsUri: "//www.malmo.se/sandbox/",
        useProxy: !0,
        maxAge: 15,
        _refreshIntervalMs: 1e4,
        _storeIntervalMs: 1e4
    },
    _lang: {
        sv: {
            dTitle: "Dela position",
            dShare: "Dela!",
            yourName: "Ditt namn",
            stopSharing: "Sluta dela",
            btnCancel: "Avbryt"
        },
        en: {
            dTitle: "Share position",
            dShare: "Share!",
            yourName: "Your name",
            stopSharing: "Stop sharing",
            btnCancel: "Cancel"
        }
    },
    _setLang: function(t) {
        t = t || smap.config.langCode || navigator.language.split("-")[0] || "en",
        this._lang && (this.lang = this._lang ? this._lang[t] : null )
    },
    initialize: function(t) {
        L.setOptions(this, t),
        this._setLang(t.langCode)
    },
    deactivate: function() {
        this._stopRefresh(),
        $("#smap-share-btn").removeClass("btn-danger"),
        this.dialog.find("input").val(null ),
        $("#smap-share-btn").hide(),
        this.map.removeLayer(this.layer)
    },
    onAdd: function(t) {
        return this.map = t,
        this._container = L.DomUtil.create("div", "leaflet-control-shareposition"),
        L.DomEvent.disableClickPropagation(this._container),
        this.$container = $(this._container),
        this._drawGui(),
        this._bindEvents(),
        this._container
    },
    onRemove: function(t) {
        t.stopLocate()
    },
    _drawGui: function() {
        var t = $('<button id="smap-share-btn" class="btn btn-default" type="button"><span class="fa fa-user"></span></button>');
        t.hide(),
        this.$container.append(t);
        var e = this;
        smap.event.on("smap.core.pluginsadded", function() {
            $(".leaflet-control-Geolocate").before(e.$container)
        });
        var n = '<div class="form-group"><label>' + this.lang.yourName + '</label><input type="text" class="form-control" placeholder="' + this.lang.yourName + '"></input></div>'
          , 
        s = $('<button type="button" class="btn btn-default" data-dismiss="modal">' + this.lang.btnCancel + '</button><button type="button" class="btn btn-primary">' + this.lang.dShare + "</button>");
        this.dialog = utils.drawDialog(this.lang.dTitle, n, s)
    },
    _makeFilter: function() {
        var t = this.options.maxAge
          , 
        e = new Date
          , 
        n = e.getTime()
          , 
        s = n - 60 * t * 1e3
          , 
        a = new Date(s)
          , 
        o = new OpenLayers.Filter.Comparison({
            type: OpenLayers.Filter.Comparison.GREATER_THAN,
            property: "datetime_changed",
            value: a
        })
          , 
        i = new OpenLayers.Format.Filter({
            version: "1.1.0"
        })
          , 
        r = new OpenLayers.Format.XML
          , 
        l = r.write(i.write(o));
        return l
    },
    _addLayer: function() {
        var t = this;
        this.layer = smap.core.layerInst._createLayer({
            init: "L.GeoJSON.WFS",
            url: this.options.wfsSource,
            options: {
                noBindZoom: !0,
                noBindDrag: !0,
                layerId: "_shareposition",
                displayName: "Shared locations",
                featureType: this.options.wfsFeatureType,
                attribution: "Malmö stads WFS",
                inputCrs: "EPSG:4326",
                selectable: !0,
                popup: '<span><strong>${text_username}</strong>&nbsp;&nbsp;(<span style="white-space:nowrap;">${function(p) {var d = new Date(p.datetime_changed);var dNow = new Date(); var dDiff = new Date( Math.abs(dNow.getTime() - d.getTime()) ); return dDiff.getMinutes(); }}</span> min ago)</span>',
                hoverColor: "#FF0",
                zIndex: 350,
                reverseAxis: !1,
                reverseAxisBbox: !0,
                uniqueKey: "id",
                params: {
                    typeName: "sandbox:sharedpositions",
                    version: "1.1.0",
                    maxFeatures: 1e4,
                    format: "text/geojson",
                    outputFormat: "json"
                
                }
            }
        }),
        this.layer.options.params.filter = this._makeFilter(),
        this.layer.off("load"),
        this.layer.on("load", function() {
            t.layer.eachLayer(function(e) {
                var n = L.userMarker(e.getLatLng(), {
                    pulsing: !0,
                    smallIcon: !0
                });
                if (t.layer.removeLayer(e),
                e.feature) {
                    var s = parseInt(e.feature.id.split(".")[1])
                      , 
                    a = t.uid || localStorage.share_uid || null ;
                    a = parseInt(a),
                    (!a || a && a !== s) && t.layer.addLayer(n);
                    var o = utils.extractToHtml(t.layer.options.popup, e.feature.properties);
                    n.bindLabel(o, {
                        noHide: !0,
                        direction: "right"
                    }).showLabel()
                }
            }),
            smap.cmd.loading(!1)
        }),
        this.map.addLayer(this.layer);
        var t = this
    },
    _bindEvents: function() {
        var t = this;
        smap.event.on("smap.core.pluginsadded", function() {
            $("#smap-glocate-btn").on("click", function() {
                return $(this).hasClass("btn-primary") ? ($("#smap-share-btn").show(),
                t._addLayer(),
                t._startRefresh()) : (t._stopShare(),
                t.deactivate()),
                !1
            }),
            $("#smap-share-btn").on("click", function() {
                var e = $(this).hasClass("btn-danger");
                e ? ($(this).removeClass("btn-danger"),
                t._stopShare()) : t.dialog.modal("show")
            })
        }),
        this.dialog.find("input").on("click", function() {
            $(this).focus()
        }),
        this.dialog.find(".modal-footer .btn-primary").on("click", function() {
            $("#smap-share-btn").addClass("btn-danger"),
            t.dialog.modal("hide");
            var e = $.trim(t.dialog.find("input[type='text']").val());
            t._startShare(e)
        })
    },
    _onLocationFound: function(t) {
        this._location = t
    },
    _onLocationError: function() {
        smap.cmd.loading(!1)
    },
    _setLocateSettings: function() {
        var t = {
            watch: !0,
            timeout: 3e4,
            enableHighAccuracy: !0,
            frequency: 3e3
        };
        $.extend(this.map._locateOptions, t)
    },
    _startShare: function(t) {
        return this._storeInterval ? !1 : (utils.log("START sharing"),
        this.uName = t,
        this.__onLocationFound = this.__onLocationFound || $.proxy(this._onLocationFound, this),
        this.__onLocationError = this.__onLocationError || $.proxy(this._onLocationError, this),
        this.map.on("locationfound", this.__onLocationFound),
        this.map.on("locationerror", this.__onLocationFound),
        this.uid = localStorage.share_uid || null ,
        this.__store = this.__store || $.proxy(this._store, this),
        this._storeInterval = setInterval(this.__store, this.options._storeIntervalMs),
        this._setLocateSettings(),
        void this.map.fire("drag"))
    },
    _startRefresh: function() {
        return this._refreshInterval ? !1 : (utils.log("start refreshing"),
        this.__refresh = this.__refresh || $.proxy(this._refresh, this),
        void (this._refreshInterval = setInterval(this.__refresh, this.options._refreshIntervalMs)))
    },
    _stopRefresh: function() {
        utils.log("stop refreshing"),
        clearInterval(this._refreshInterval),
        this._refreshInterval = null 
    },
    _stopShare: function() {
        smap.cmd.loading(!1),
        utils.log("stop sharing"),
        this._stopRefresh(),
        clearInterval(this._storeInterval),
        this._storeInterval = null ,
        this.map.off("locationfound", this.__onLocationFound, this),
        this.map.off("locationerror", this.__onLocationError, this),
        this._location = null ,
        this.uid = null ,
        this.uName = null 
    },
    uid: null ,
    _store: function() {
        return this._working || !this._location ? !1 : (this._working = !0,
        void $.ajax({
            url: this.options.useProxy ? smap.config.ws.proxy + encodeURIComponent(this.options.wfsSource) : this.options.wfsSource,
            type: "POST",
            context: this,
            data: this._getXml(this._location.latlng, this._location.accuracy, this.uName, this.uid),
            contentType: "text/xml",
            dataType: "text",
            error: function(t, e) {
                utils.log("SharePosition: Error storing coordinates because of: " + e)
            },
            success: function(t) {
                var e = $.xml2json(t)
                  , 
                n = e ? e.TransactionResponse || e["wfs:TransactionResponse"] : null ;
                if (n) {
                    var s = n ? n.TransactionSummary || n["wfs:TransactionSummary"] : null ;
                    if (s) {
                        var a = parseInt(s.totalInserted || s["wfs:totalInserted"])
                          , 
                        o = parseInt(s.totalUpdated || s["wfs:totalUpdated"]);
                        if (!this.uid && a > 0) {
                            var i = n.InsertResults || n["wfs:InsertResults"]
                              , 
                            r = i.Feature || i["wfs:Feature"]
                              , 
                            l = r.FeatureId || r["ogc:FeatureId"]
                              , 
                            h = l.fid || l.$.fid;
                            this.uid = parseInt(h.split(".")[1]),
                            localStorage.share_uid = this.uid
                        } else
                            0 === a && 0 === o && (this.uid = null ,
                            delete localStorage.share_uid)
                    }
                }
            },
            complete: function() {
                this._working = !1
            }
        }))
    },
    _refresh: function() {
        this.layer.options.params.filter = this._makeFilter(),
        this.layer._refresh({
            force: !0
        })
    },
    _getXml: function(t, e, n, s) {
        var a = ""
          , 
        o = this.options.wfsFeatureType.split(":")[1];
        return a = s ? '<wfs:Transaction\n  service="WFS"\n  version="1.1.0"\n  xmlns:grp="' + this.options.wfsUri + '"\n  xmlns:wfs="//www.opengis.net/wfs"\n  xmlns:ogc="//www.opengis.net/ogc"\n  xmlns:gml="//www.opengis.net/gml"\n  xmlns:xsi="//www.w3.org/2001/XMLSchema-instance"\n  xsi:schemaLocation="//www.opengis.net/wfs\n                      //schemas.opengis.net/wfs/1.1.0/WFS-transaction.xsd">\n  <wfs:Update typeName="grp:' + o + '">\n	 <wfs:Property><wfs:Name>text_username</wfs:Name><wfs:Value>' + n + "</wfs:Value></wfs:Property>	 <wfs:Property><wfs:Name>int_accuracy</wfs:Name><wfs:Value>" + e + '</wfs:Value></wfs:Property>    <wfs:Property>\n      <wfs:Name>the_geom</wfs:Name>\n      <wfs:Value>\n        <gml:Point srsDimension="2" srsName="urn:x-ogc:def:crs:EPSG:4326">\n          <gml:coordinates decimal="." cs="," ts=" ">' + t.lat + "," + t.lng + "</gml:coordinates>\n        </gml:Point>\n      </wfs:Value>\n    </wfs:Property>\n    <ogc:Filter>\n      <PropertyIsEqualTo>\n        <PropertyName>id</PropertyName>\n        <Literal>" + s + "</Literal>\n      </PropertyIsEqualTo>\n    </ogc:Filter>\n  </wfs:Update>\n</wfs:Transaction>" : '<wfs:Transaction\n  service="WFS"\n  version="1.1.0"\n  xmlns:grp="' + this.options.wfsUri + '"\n  xmlns:wfs="//www.opengis.net/wfs"\n  xmlns:gml="//www.opengis.net/gml"\n  xmlns:xsi="//www.w3.org/2001/XMLSchema-instance"\n  xsi:schemaLocation="//www.opengis.net/wfs\n                      //schemas.opengis.net/wfs/1.1.0/WFS-transaction.xsd\n                      ' + this.options.wfsSource + "/DescribeFeatureType?typename=" + this.options.wfsFeatureType + '">\n  <wfs:Insert>\n    <grp:' + o + '>\n      <grp:the_geom>\n        <gml:Point srsDimension="2" srsName="urn:x-ogc:def:crs:EPSG:4326">\n          <gml:coordinates decimal="." cs="," ts=" ">' + t.lat + "," + t.lng + "</gml:coordinates>\n        </gml:Point>\n      </grp:the_geom>\n      <grp:int_accuracy>" + e + "</grp:int_accuracy>\n      <grp:text_username>" + n + "</grp:text_username>\n    </grp:" + o + ">\n  </wfs:Insert>\n  </wfs:Transaction>"
    }
}),
L.control.sharePosition = function(t) {
    return new L.Control.SharePosition(t)
}
;
L.Control.ShareTweet = L.Control.extend({
    options: {
        position: "topright",
        wfsSource: "//localhost:8080/geoserver/wfs",
        wfsFeatureType: "local:tweets"
    },
    _lang: {
        sv: {
            btnAdd: "Lägg till",
            btnUnshare: "Sluta dela position",
            titleDialog: "Skriv nånting",
            btnCancel: "Avbryt",
            btnSubmit: "Skicka",
            loading: "Arbetar..."
        },
        en: {
            btnAdd: "Add tweet",
            btnUnshare: "Stop sharing position",
            titleDialog: "Write something",
            btnCancel: "Cancel",
            btnSubmit: "Submit",
            loading: "Working..."
        }
    },
    _setLang: function(t) {
        t = t || smap.config.langCode || navigator.language.split("-")[0] || "en",
        this._lang && (this.lang = this._lang ? this._lang[t] : null )
    },
    initialize: function(t) {
        L.setOptions(this, t),
        this._setLang(t.langCode)
    },
    onAdd: function(t) {
        this.map = t,
        this._container = L.DomUtil.create("div", "leaflet-control-sharetweet"),
        L.DomEvent.disableClickPropagation(this._container),
        this.$container = $(this._container),
        this._drawBtn(),
        this._addWfsLayer();
        var n = this;
        return this.map.on("zoomend moveend", function() {
            n.layer._refresh()
        }),
        this._container
    },
    onRemove: function() {},
    _notify: function(t, n) {
        switch (n) {
        case "success":
            n = "alert-success";
            break;
        case "error":
            n = "alert-danger"
        }
        var e = $('<div class="alert ' + n + ' alert-dismissable"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + t + "</div>");
        e.css({
            "margin-top": "20px"
        }),
        $(".modal-body").find(".alert").remove(),
        $(".modal-body .sharetweet-footer").before(e)
    },
    _addWfsLayer: function() {
        this.cluster = new L.MarkerClusterGroup,
        this.layer = smap.core.layerInst._createLayer({
            init: "L.GeoJSON.WFS",
            url: this.options.wfsSource,
            options: {
                layerId: "sharetweet-wfstlayer",
                displayName: "Tweets",
                featureType: this.options.wfsFeatureType,
                attribution: "Malmö stads WFS",
                inputCrs: "EPSG:4326",
                reverseAxis: !0,
                selectable: !0,
                popup: '<p class="lead">${text_text}</p><p>Skrivet den: <strong>${function(p) {var d = new Date(p.dtime_created);return d.toLocaleString();}}</strong></p>',
                uniqueAttr: null ,
                hoverColor: "#FF0",
                style: {
                    weight: 6,
                    color: "#F00",
                    dashArray: "",
                    fillOpacity: .5
                }
            }
        });
        var t = this;
        this.layer._map = this.map,
        this.layer.on("load", function(n) {
            n.layer.eachLayer(function(n) {
                t.cluster.addLayer(n)
            }),
            n.layer.clearLayers(),
            t.map.removeLayer(t.cluster),
            t.map.addLayer(t.cluster),
            smap.cmd.loading(!1)
        }),
        this.map.addLayer(this.cluster)
    },
    _onLocationFound: function(t) {
        smap.cmd.loading(!1);
        var n = 6;
        this.modal && (this.modal.find('form td[name="easting"]').empty().text(utils.round(t.latlng.lng, n)),
        this.modal.find('form td[name="northing"]').empty().text(utils.round(t.latlng.lat, n)),
        this.modal.find('form td[name="accuracy"]').empty().text(utils.round(t.accuracy, 1) + " m"),
        this.modal.find(".btn-primary").button("reset"))
    },
    _onLocationError: function() {
        var t = this;
        this._notify("Your position could not be determined", "error"),
        setTimeout(function() {
            t.deactivate()
        }, 3e3)
    },
    deactivate: function() {
        this.modal && this.modal.modal("hide")
    },
    shareTweet: function() {
        $("#sharetweet-btn").button(this.lang.btnUnshare),
        smap.cmd.loading(!0),
        this.modal = this._showDialog(),
        this.modal.find(".btn-primary").button("loading");
        var t = smap.cmd.getControl("Geolocate");
        t && t.deactivate(),
        this.map.on("locationfound", $.proxy(this._onLocationFound, this)),
        this.map.on("locationerror", $.proxy(this._onLocationError, this)),
        this.map.locate({
            watch: !0,
            setView: !0,
            enableHighAccuracy: !0
        }),
        smap.cmd.loading(!1)
    },
    unShareTweet: function() {
        $("#sharetweet-btn").button(this.lang.btnAdd),
        this.map.off("locationfound", $.proxy(this._onLocationFound, this)),
        this.map.off("locationerror", $.proxy(this._onLocationError, this))
    },
    _showDialog: function() {
        var t = $('<form id="sharetweet-form" role="form"><textarea class="form-control" rows="4" name="text" minlength="5" maxlength="140" required></textarea><table><tr><td>Easting:</td><td name="easting"></td></tr><tr><td>Northing:</td><td name="northing"></td></tr><tr style="font-weight:bold;"><td>Felmarginal:</td><td name="accuracy"></td></tr></table><div class="row sharetweet-footer"><button type="button" class="btn btn-default" data-dismiss="modal">' + this.lang.btnCancel + '</button><button type="submit" class="btn btn-primary" data-loading-text="' + this.lang.loading + '">' + this.lang.btnSubmit + "</button></div></form>")
          , 
        n = this;
        t.on("submit", function() {
            var t = $(this).serializeArray()
              , 
            e = {};
            return $.each(t, function(t, n) {
                e[n.name] = n.value
            }),
            e.easting = parseFloat($(this).find('[name="easting"]').text()),
            e.northing = parseFloat($(this).find('[name="northing"]').text()),
            n._save(L.latLng(e.northing, e.easting), e.text),
            !1
        }),
        t.find("tr").each(function() {
            var t = $(this).find("td:eq(1)");
            t.text(""),
            n._addSpin(t)
        });
        var e = utils.drawDialog(this.lang.titleDialog, t, null , {
            size: "sm"
        });
        return t.find(".btn-default").on("click", function() {
            return e.modal("hide"),
            !1
        }).find(".btn-primary").on("click", function() {
            return !1
        }),
        e.modal("show"),
        e.on("hidden.bs.modal", function() {
            n.map.stopLocate(),
            n.modal.empty().remove(),
            n.modal = null ,
            $("#sharetweet-btn").button(this.lang.btnAdd),
            $("#sharetweet-btn").removeClass("btn-primary"),
            delete n.modal
        }),
        e
    },
    _addSpin: function(t) {
        var n = {
            length: 5,
            width: 1,
            radius: 3
        }
          , 
        e = new Spinner(n).spin();
        $(t).append(e.el)
    },
    _drawBtn: function() {
        var t = this
          , 
        n = $('<button id="sharetweet-btn" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-map-marker"></span>&nbsp;&nbsp;<span>' + this.lang.btnAdd + "</span></button>");
        n.on("click", function() {
            $(this).hasClass("btn-primary") ? ($(this).removeClass("btn-primary"),
            t.unShareTweet()) : ($(this).addClass("btn-primary"),
            t.shareTweet())
        }),
        this.$container.append(n)
    },
    _createRequest: function(t, n) {
        var e = '<wfs:Transaction\n  service="WFS"\n  version="1.1.0"\n  xmlns:grp="//localhost/"\n  xmlns:wfs="//www.opengis.net/wfs"\n  xmlns:gml="//www.opengis.net/gml"\n  xmlns:xsi="//www.w3.org/2001/XMLSchema-instance"\n  xsi:schemaLocation="//www.opengis.net/wfs\n                      //schemas.opengis.net/wfs/1.1.0/WFS-transaction.xsd\n                      ' + this.options.wfsSource + "/DescribeFeatureType?typename=" + this.options.wfsFeatureType + '">\n  <wfs:Insert>\n    <grp:tweets>\n      <grp:text_text>' + n.text + '</grp:text_text>\n      <grp:the_geom>\n        <gml:Point srsDimension="2" srsName="urn:x-ogc:def:crs:EPSG:4326">\n          <gml:coordinates decimal="." cs="," ts=" ">' + t.lat + "," + t.lng + "</gml:coordinates>\n        </gml:Point>\n      </grp:the_geom>\n    </grp:tweets>\n  </wfs:Insert>\n</wfs:Transaction>";
        return e
    },
    _save: function(t, n) {
        if (this.submitting)
            return !1;
        this.map.stopLocate(),
        this.submitting = !0,
        smap.cmd.loading(!0),
        this.modal.find(".btn-primary").button("loading");
        var e = this._createRequest(t, {
            text: n
        });
        $.ajax({
            url: smap.config.ws.proxy + encodeURIComponent(this.options.wfsSource),
            type: "POST",
            context: this,
            data: e,
            contentType: "text/xml",
            dataType: "text",
            success: function(t) {
                smap.cmd.loading(!1);
                var n = $.xml2json(t);
                parseInt(n.TransactionSummary.totalInserted) > 0 && (this.deactivate(),
                this._reload())
            },
            error: function(t, n) {
                this._notify("Kunde inte spara. Fel: <strong>" + n + "</strong>", "error"),
                smap.cmd.loading(!1)
            },
            complete: function() {
                this.modal.find(".btn-primary").button("reset"),
                this.submitting = !1
            }
        })
    },
    _reload: function(t) {
        t = t || {},
        smap.cmd.loading(!0),
        this.layer._refresh()
    }
}),
L.control.shareTweet = function(t) {
    return new L.Control.ShareTweet(t)
}
;
L.Control.ToolHandler = L.Control.extend({
    options: {
        position: "bottomright",
        showPopoverTitle: !1,
        breakpoint: 991
    },
    _lang: {
        sv: {
            popoverTitle: "Verktyg"
        },
        en: {
            popoverTitle: "Tools"
        }
    },
    _setLang: function(n) {
        n = n || smap.config.langCode,
        this._lang && (this.lang = this._lang ? this._lang[n] : null )
    },
    initialize: function(n) {
        L.setOptions(this, n),
        this._setLang(n.langCode)
    },
    onAdd: function() {
        return this._container = L.DomUtil.create("div", "leaflet-control-toolhandler"),
        L.DomEvent.disableClickPropagation(this._container),
        this.$container = $(this._container),
        this.$container.css("display", "none"),
        utils.getBrowser().ie8 || (this._makeToolHandler(),
        smap.event.on("smap.core.pluginsadded", function() {
            $(".thandler-container .leaflet-control button").each(function() {
                $(this).tooltip({
                    placement: "bottom",
                    container: "#maindiv"
                })
            })
        })),
        this._onWinResize = $.proxy(this.onWinResize, this),
        $(window).on("resize", this._onWinResize),
        this.checkCollapsePoint(),
        this._container
    },
    onWinResize: function() {
        this.checkCollapsePoint()
    },
    checkCollapsePoint: function() {
        var n = $(window).width();
        n <= this.options.breakpoint ? $("#mapdiv").addClass("thandler-collapsed") : $("#mapdiv").removeClass("thandler-collapsed")
    },
    activate: function() {},
    _makeToolHandler: function() {
        function n(n) {
            var t = $(".thandler-popover").length && parseInt($(".thandler-popover").css("opacity") || 0) > 0
              , 
            o = $(".popover-content");
            i.data("bs.popover") && t && o.children().length && (utils.getBrowser().ie9 && a(),
            i.popover("hide")),
            smap.event.trigger("smap.toolhandler.hide", n),
            $(".thandler-container .leaflet-control button").each(function() {
                $(this).trigger("blur")
            }),
            $(".tooltip:visible").hide()
        }
        
        function t() {
            var n = $(".thandler-container").children(":has('button')");
            n.length && i.popover("show")
        }
        var o = this
          , 
        e = $(".leaflet-top.leaflet-right");
        this.$thCont = e,
        e.addClass("thandler-container");
        var i = $('<div class="thandler-btn popover-dismiss"><button type="button" class="btn btn-default thbtn"><span class="fa fa-th"></span></button></div>');
        $("#mapdiv").append(i),
        this._map.on("click dragstart", n),
        $(window).on("orientationchange", n);
        var a = function() {
            $(window).off("resize", n);
            var t = $(".popover-content");
            setTimeout(function() {
                t.children().each(function() {
                    $(".thandler-container").prepend(this)
                })
            }, 150)
        }
        ;
        i.on("click", function() {
            var e = $(this);
            if (e.data("bs.popover")) {
                var i = $(".thandler-popover").length && parseInt($(".thandler-popover").css("opacity") || 0) > 0;
                if (i)
                    return utils.getBrowser().ie9 && a(),
                    e.popover("hide"),
                    !1
            } else
                e.popover({
                    content: null ,
                    placement: "bottom",
                    title: o.lang.popoverTitle,
                    trigger: "manual"
                }),
                e.on("shown.bs.popover", function() {
                    var t = $(".popover")
                      , 
                    e = $(".popover-content");
                    o.options.showPopoverTitle || t.find("h3").remove(),
                    t.addClass("thandler-popover");
                    var i = $(".thandler-container").children(".leaflet-control:has('button')").detach();
                    e.empty(),
                    i.each(function() {
                        e.prepend(this)
                    }),
                    $(window).on("resize", n)
                }),
                e.on("hidden.bs.popover", a);
            return t(),
            !1
        }),
        i.on("tap", function() {
            return !1
        }),
        i.on("dblclick", function() {
            return !1
        })
    },
    onRemove: function() {
        $(window).off("resize", this._onWinResize)
    }
}),
L.control.toolhandler = function(n) {
    return new L.Control.ToolHandler(n)
}
;
L.Control.VspuHeaderLund = L.Control.extend({
    options: {
        position: "topright",
        btnID: "vspu-btn"
    },
    _lang: {
        sv: {
            caption: "Genvägar"
        },
        en: {
            caption: "Themes"
        }
    },
    _setLang: function(n) {
        n = n || smap.config.langCode,
        this._lang && (this.lang = this._lang ? this._lang[n] : null )
    },
    initialize: function(n) {
        L.setOptions(this, n),
        this._setLang(n.langCode)
    },
    onAdd: function(n) {
        this.map = n,
        this._container = L.DomUtil.create("div", "leaflet-control-VspuHeaderLund"),
        L.DomEvent.disableClickPropagation(this._container),
        this.$container = $(this._container),
        this._createMenu();
        var a = "";
        return this.options.btnID && (a = this.options.btnID),
        this.addButton(a, "Genvägar", "fa fa-plus-circle", function() {
            return !1
        }),
        this._container
    },
    addButton: function(n, a, t, e, s) {
        s = s || {};
        var o = $('<div class="btn-group"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">Genvägar <span class="caret"></span><span class="sr-only">Toggle Dropdown</span></button><ul class="dropdown-menu" role="menu"><li><a href="http://kartor.lund.se/vspu/?zoom=14&center=13.6306,55.65929&ol=Avrinningsområde,Kommungränser,VA_vattenskyddsområde,Dammdatabas&bl=binglayer">Björkaprojektet</a></li><li><a href="http://kartor.lund.se/vspu/?zoom=12&center=13.64777,55.71735&ol=Avrinningsområde,Vattendrag-huvud,Vattendrag-mellan,Vattendrag-sma,Kommungränser,Dammdatabas&bl=mapboxlund">Torpsbäcken</a></li><li><a href="http://kartor.lund.se/vspu/?zoom=10&center=13.3717,55.66209&ol=Avrinningsområde,VATTENFOREKOMSTER,Kommungränser,Plan-pågående,OP_nybyggnad,OP_omvandling,OP_linje,Simrishamnsbanan&bl=mapboxlund">Pågående planering</a></li><li><a href="http://kartor.lund.se/vspu/?zoom=12&center=13.03768,55.73929&ol=Avrinningsområde,Kommungränser,OP_nybyggnad,OP_omvandling,Havsnivåökning3m,Havsnivåökning1m,OP_linje&bl=mapboxlund">Översvämningsrisker</a></li></ul></div>');
        s.proxy,
        $("#btns").append(o),
        s.callback && s.callback(o)
    },
    _createMenu: function() {
        var n = $('<header id="smap-vspuHeaderLund-div" class="navbar navbar-static-top bs-docs-nav" role="banner"><div class="container"><div class="navbar-header">    <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".bs-navbar-collapse">      <span class="sr-only">Toggle navigation</span>      <span class="fa fa-bars"></span>    </button><a class="navbar-brand" href="localhost:8080/karta/dev.html?config=configVspu.js">Kävlingeåns vattenstrategiska planeringsunderlag</a>  </div>  <nav class="collapse navbar-collapse bs-navbar-collapse" role="navigation">    <ul id="btns" class="nav navbar-nav navbar-right">    </ul>  </nav></div></header>');
        $("#maindiv").prepend(n),
        $("body").addClass("mf-v4 no-footer")
    },
    onRemove: function() {}
}),
L.control.vspuHeaderLund = function(n) {
    return new L.Control.VspuHeaderLund(n)
}
;
L.Control.Zoombar = L.Control.extend({
    options: {
        position: "bottomright"
    },
    _lang: {
        sv: {
            exampleLabel: "Ett exempel"
        },
        en: {
            exampleLabel: "An example"
        }
    },
    _setLang: function(n) {
        n = n || smap.config.langCode,
        this._lang && (this.lang = this._lang ? this._lang[n] : null )
    },
    initialize: function(n) {
        L.setOptions(this, n),
        this._setLang(n.langCode)
    },
    onAdd: function(n) {
        return this.map = n,
        this._container = L.DomUtil.create("div", "leaflet-control-zoombar"),
        L.DomEvent.disableClickPropagation(this._container),
        this.$container = $(this._container),
        this.$container.addClass("btn-group-vertical"),
        this.$container.on("mousedown", function() {
            return !1
        }),
        this._createButtonZoomIn(),
        this._createButtonZoomUt(),
        this.__onZoomEnd = this.__onZoomEnd || $.proxy(this._onZoomEnd, this),
        this.map.on("zoomend", this.__onZoomEnd),
        this._container
    },
    _onZoomEnd: function() {
        this.map.getZoom() >= this.map.getMaxZoom() ? this.$container.find("#zoombar-plus").addClass("disabled") : this.map.getZoom() <= this.map.getMinZoom() ? this.$container.find("#zoombar-minus").addClass("disabled") : this.$container.find("button").removeClass("disabled")
    },
    _createButtonZoomIn: function() {
        var n = $('<button id="zoombar-plus" class="btn btn-default"><span class="fa fa-plus"></span></button>');
        this.$container.append(n);
        n.on("click touchstart dblclick", function() {
            return smap.map.zoomIn(),
            !1
        })
    },
    _createButtonZoomUt: function() {
        var n = $('<button id="zoombar-minus" class="btn btn-default"><span class="fa fa-minus"></span></button>');
        this.$container.append(n);
        n.on("click touchstart dblclick", function() {
            return smap.map.zoomOut(),
            !1
        })
    },
    onRemove: function() {}
}),
L.control.zoombar = function(n) {
    return new L.Control.Zoombar(n)
}
;
L.Control.Osmbuildings = L.Control.extend({
    options: {
        position: "bottomright"
    },
    _lang: {
        sv: {
            errorOsmbuildings: "Kunde inte visa 3D byggnader",
            notSupported: "Din webbläsare stödjer 3D byggnader"
        },
        en: {
            errorOsmbuildings: "Can´t visualize 3D buildings",
            notSupported: "Your browser does not support 3D buildings"
        }
    },
    _setLang: function(t) {
        t = t || smap.config.langCode || navigator.language.split("-")[0] || "en",
        this._lang && (this.lang = this._lang ? this._lang[t] : null )
    },
    initialize: function(t) {
        L.setOptions(this, t),
        this._setLang(t.langCode)
    },
    onAdd: function(t) {
        this.map = t,
        this._container = L.DomUtil.create("div", "leaflet-control-Osmbuildings"),
        L.DomEvent.disableClickPropagation(this._container),
        this.$container = $(this._container),
        this._drawButton();
        return this._container
    },
    onRemove: function() {},
    _drawButton: function() {
        var t = $('<button id="smap-glocate-btn" class="btn btn-default"><span class="fa fa-cube"></span></button>');
        this.$container.append(t),
        this.btn = t,
        t.on("click", $.proxy(function() {
            return this.active ? this.deactivate() : this.activate(),
            !1
        }, this))
    },
    activate: function() {
        return this.active ? !1 : (this.active = !0,
        this.btn.addClass("btn-primary"),
        void (osmb = new OSMBuildings(this.map).load()))
    },
    deactivate: function() {
        return this.active ? (this.active = !1,
        this.map.removeLayer(this.map._layers[osmb._leaflet_id]),
        void this.btn.removeClass("btn-primary")) : !1
    }
}),
L.control.osmbuildings = function(t) {
    return new L.Control.Osmbuildings(t)
}
;


/*Mohammad Add*/

L.Control.GetFeatureInfo = L.Control.extend({
    options: {
        addToMenu: !1,
        autoActivate: !1,
        position: "bottomright",
        buffer: 12,
        
        
        _lang: {
            sv: {
                titleInfo: "",
                bodyContent: ''
            
            
            }
        }
    },
    _lang: {
        sv: {
            btntitle: "Markhöjder"
        },
        en: {
            btntitle: "Markhöjder"
        }
    },
    _setLang: function(t) {
        t = t || smap.config.langCode || navigator.language.split("-")[0] || "en",
        this._lang && (this.lang = this._lang ? this._lang[t] : null )
    },
    initialize: function(t) {
        L.setOptions(this, t),
        this.options._lang && $.extend(!0, this._lang, this.options._lang),
        this._setLang(t.langCode)
    },
    onAdd: function(t) {
        return this.map = t,
        this._container = L.DomUtil.create("div", "leaflet-control-featureinfo"),
        L.DomEvent.disableClickPropagation(this._container),
        this.$container = $(this._container),
        this._drawBtn(),
        this.featureInfoPanel = {},
        this._container
    },
    onRemove: function() {},
    activate: function() {
        this.active = !0,
        this.btn.addClass("btn-primary");
        var selectControlWMS = smap.cmd.getControl("L.Control.SelectWMS");
        selectControlWMS.deactivate();
        var selectControlVector = smap.cmd.getControl("L.Control.SelectVector");
        selectControlVector.deactivate();
        if (this.featureInfoPanel.selectionPanelCreated) {
            this._updateSelectionPanel();
        } else {
            this._drawSelectionPanel()
        }
        this.map.on("click", this._onMapClick, this);
        $('.mapdiv')[0].style.cursor = "crosshair";
        /*this._showSplashMessage('Med detta verktyget klickar du kartan och får reda på höjdvärdet i RH2000. NNH-data med 2m upplösning. Klicka på punkten för att få mer information. Stäng det här verktyget innan du gör något annat.')*/
    
    
    
    },
    deactivate: function() {
        this.active = !1,
        this.btn.removeClass("btn-primary");
        var selectControlWMS = smap.cmd.getControl("L.Control.SelectWMS");
        selectControlWMS.activate();
        var selectControlVector = smap.cmd.getControl("L.Control.SelectVector");
        selectControlVector.activate();
        this.map.off("click", this._onMapClick, this);
        this._hideSelectionPanel();
        if (typeof this.heightLayer !== "undefined" && this.heightLayer !== null ) {
        /*this.heightLayer.clearLayers();*/
        
        }
        $('.mapdiv')[0].style.cursor = "";
    },
    _drawBtn: function() {
        var t = this;
        if (this.options.addToMenu)
            smap.cmd.addToolButton("", "fa fa-selection-info", function() {
                return t.activate(),
                !1
            }, null );
        else {
            var a = $('<button id="smap-getFeatureinfo-btn" title="' + t.lang.btntitle + '"  class="btn btn-default"><span class="fa fa-selection-info"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAUCAQAAAAua3X8AAAAAXNSR0IArs4c6QAAAAlwSFlzAAARKgAAESoB/3Si4QAAAAd0SU1FB+ACBQkGM3HV728AAAACYktHRAD/h4/MvwAAAdxJREFUGBkFwU9olnUcAPDP9/c877Ze5xzqQMfAdkjsD74oKhJ0UC8dMiX0Ktgh0tElPAR5CjzWqSjw5KVAIoMui4koSgaZf1CC8KAyVzidurV3ub3P8/z8fILrO+b6QggZbFy+eXF2kGWVLceDqZmbo40EWl7Y6ooF/f5xP38UJaPn1q6NeP76D50jl4ce1qu3fXh2ZqE17wVB3NIB3+dvLL977Vc4/GxhuKvRmJA6gFuq/MYkj4OWfo1AIwGsGFC6fXsk96bG83ZJVkoS/IH9n6+KiS9fu/M8F7PznshoUMJOl3K/ibtPt/w2tutCFNMWNUo9lDD9yWGHnNh84OpgZ2+ZJ9tq/6tRSDD2da+62pzK1e6VPFN51JcWH2SBLIGByrxpXSlu7LBu2AZkhSyBoYi96bvo/72Xt13ztG5amwgkJcSjr4rVX3Boqa3URE9SyGq1BN/6NN5MB/O+Ex+caT9OFj2RhUIhwTH8ebLr5+sDn9UjjREdoVFblgD+9swv7r8/HOnH+bgnBLIE8JbCUeOniZ+6MaeSlV6RJjHzDmMnX9V9G/59b3BNWympLAmm/vtrkMqcjZIVm6fO71pac0PI+eMoae8Z6mthVC3L1vd2Xpg1rrESAxMvAXiEtvkQFNikAAAAAElFTkSuQmCC"></img></span></button>');
            a.on("click", $.proxy(function() {
                return this.active ? this.deactivate() : this.activate(),
                !1
            }, this)),
            this.btn = a,
            this.$container.append(a)
        }
    },
    _drawSelectionPanel: function() {
        
        this.featureInfoPanel.maxWidth = 300,
        this.featureInfoPanel.maxHeight = 250;
        this.featureInfoPanel.minHeight = 150;
        if (window.featureInfoPanel_state) {
            if (window.featureInfoPanel_state == 0) {
                window.featureInfoPanel_state = 1
            } else if (window.featureInfoPanel_state == 1) {
                window.featureInfoPanel_state = 0
            }
        } else {
            window.featureInfoPanel_state = 0;
        }
        
        this.featureInfoPanel.selectionPanelCreated = !0;
        var innerWidth_custom = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
          , 
        innerHeight_custom = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        
        this.featureInfoPanel.getfeatureInfoPanel_div = document.createElement('div'),
        this.featureInfoPanel.getfeatureInfoPanel_div.id = 'getfeatureInfoPanel_div',
        this.featureInfoPanel.getfeatureInfoPanel_div.style.background = 'white',
        this.featureInfoPanel.getfeatureInfoPanel_div.style.position = 'fixed',
        this.featureInfoPanel.getfeatureInfoPanel_div.style.top = '0px',
        this.featureInfoPanel.getfeatureInfoPanel_div.style.zIndex = "2005",
        
        this.featureInfoPanel.getfeatureInfoPanel_div.style.width = innerWidth_custom * 70 / 100 + "px",
        this.featureInfoPanel.getfeatureInfoPanel_div.style.maxWidth = this.featureInfoPanel.maxWidth + "px",
        /*this.featureInfoPanel.getfeatureInfoPanel_div.style.height = innerHeight_custom*35/100+"px",*/
        /*this.featureInfoPanel.getfeatureInfoPanel_div.style.height = innerHeight_custom*13/100+"px",this.featureInfoPanel.getfeatureInfoPanel_div.style.maxHeight = this.featureInfoPanel.maxHeight+"px",*/
        this.featureInfoPanel.getfeatureInfoPanel_div.style.minHeight = this.featureInfoPanel.minHeight + "px",
        this.featureInfoPanel.getfeatureInfoPanel_div.style.display = "block",
        this.featureInfoPanel.getfeatureInfoPanel_div.style.background = "rgba(255,255,255,0)",
        this.featureInfoPanel.getfeatureInfoPanel_div.style.className = "modal-dialog";
        
        
        
        /*var clcLeft=(innerWidth_custom/2 - this.featureInfoPanel.maxWidth/2);this.featureInfoPanel.getfeatureInfoPanel_div.style.left = clcLeft+"px";*/
        /*if(clcLeft<30){this.featureInfoPanel.getfeatureInfoPanel_div.style.left = 30+"px";}*/
        var clcRight = (innerWidth_custom / 2 - this.featureInfoPanel.maxWidth / 2);
        this.featureInfoPanel.getfeatureInfoPanel_div.style.right = clcRight + "px";
        if (clcRight < 40) {
            this.featureInfoPanel.getfeatureInfoPanel_div.style.right = 40 + "px";
            clcRight = 40;
        }
        
        
        var docButton = document.createElement('button');
        docButton.id = "docSelectionpanelButtonID",
        /*docButton.title="Minimera",*/
        docButton.className = "minimize";
        docButton.onclick = function() {
            var catchDocImg = document.getElementById('selectionPanelDocImg');
            $('#getfeatureInfoPanel_div')[0].style.display = "none";
            $('#getfeatureInfoPanel_div_alt_id')[0].style.display = "block";
            window.featureInfoPanel_state = 1;
        }
        var docImg = document.createElement('span');
        docImg.id = "selectionPanelDocImg",
        docImg.className = "glyphicon glyphicon-minus",
        docButton.appendChild(docImg),
        this.featureInfoPanel.getfeatureInfoPanel_div.appendChild(docButton);
        
        var docButton2 = document.createElement('button');
        docButton2.id = "StopGetInfoWidget",
        /*docButton2.title="Stäng",*/
        docButton2.className = "close";
        
        var docImg2 = document.createElement('span');
        docImg2.id = "selectionPanelDocImg2",
        docImg2.className = "glyphicon glyphicon-remove",
        docButton2.appendChild(docImg2),
        this.featureInfoPanel.getfeatureInfoPanel_div.appendChild(docButton2);
        this.featureInfoPanel.getfeatureInfoPanel_body_div = document.createElement('div'),
        this.featureInfoPanel.getfeatureInfoPanel_body_div.id = "getfeatureInfoPanel_body_div",
        this.featureInfoPanel.getfeatureInfoPanel_body_div.className = "modal-body",
        this.featureInfoPanel.getfeatureInfoPanel_body_div.style.background = "white",
        this.featureInfoPanel.getfeatureInfoPanel_body_div.style.height = "100%",
        this.featureInfoPanel.getfeatureInfoPanel_body_div.style.overflow = "auto";
        
        /*var modal_content=$('<div><div class="row"><div class=".col-sm-12"><div class="btn-group" role="group" aria-label="..."><button id="deleteAllHeightPoints" type="button" class="btn btn-primary">Radera alla</button><button id="StopGetInfoWidget" type="button" class="btn btn-primary">Stäng</button></div></div></div>  <div style="margin-top: 0.2em;" class="row"><div class=".col-sm-8">            <table><tr><td>  <label><h4>Behåll gamla punkter</h4> </label></td> <td> <input checked type="checkbox" id="keepOldPoints_id" name="keepOldPoints" aria-label="..."></td></tr> <tr> <td colspan="2"> <h4>Höjddata RH2000:</h4> Med detta verktyget klickar du kartan och får reda på höjdvärdet i RH2000. NNH-data med 2m upplösning. Klicka på punkten för att få mer information.</td> </tr></table>                 </div>')[0];*/
        var modal_content = $('<div><h4 class="modal-header" style="position:absolute; top:-10px; left:0; border-bottom: solid 1px #ccc; width:100%; margin-bottom: 5px;">Markhöjder</h4><div class="row" style="padding-top:35px"><div class=".col-sm-12"><div class="btn-group" role="group" aria-label="..."><button id="deleteAllHeightPoints" type="button" class="btn btn-default">Radera alla</button></div></div></div>  <div style="margin-top: 0.2em;" class="row"><div class=".col-sm-8">            <table><tr><td>Behåll gamla punkter</td> <td> <input checked type="checkbox" id="keepOldPoints_id" name="keepOldPoints" aria-label="..."></td></tr><tr><td colspan="2"><button class="btn btn-default btn-sm he-tog">Mer info</button></td></tr> <tr style="display:none;" class="he-ogt"> <td colspan="2"> <b>Höjddata RH2000:</b> Med detta verktyget klickar du kartan och får reda på höjdvärdet i RH2000. NNH-data med 2m upplösning. Klicka på punkten för att få mer information.</td> </tr></table>                 </div>')[0];
        this.featureInfoPanel.getfeatureInfoPanel_body_div.appendChild(modal_content),
        this.featureInfoPanel.getfeatureInfoPanel_div.appendChild(this.featureInfoPanel.getfeatureInfoPanel_body_div),
        
        document.body.appendChild(this.featureInfoPanel.getfeatureInfoPanel_div);
        
        /*Add On hide;*/
        this.featureInfoPanel.getfeatureInfoPanel_div_alt = document.createElement('div'),
        this.featureInfoPanel.getfeatureInfoPanel_div_alt.id = "getfeatureInfoPanel_div_alt_id",
        
        this.featureInfoPanel.getfeatureInfoPanel_div_alt.style.background = '#fff',
        this.featureInfoPanel.getfeatureInfoPanel_div_alt.style.position = 'fixed',
        this.featureInfoPanel.getfeatureInfoPanel_div_alt.style.top = '0px',
        this.featureInfoPanel.getfeatureInfoPanel_div_alt.style.zIndex = "2005",
        
        this.featureInfoPanel.getfeatureInfoPanel_div_alt.style.width = "195px",
        this.featureInfoPanel.getfeatureInfoPanel_div_alt.style.height = "45px",
        this.featureInfoPanel.getfeatureInfoPanel_div_alt.style.display = "none",
        /*this.featureInfoPanel.getfeatureInfoPanel_div_alt.style.background="rgba(255,255,255,0)",*/
        
        
        
        clcRight = clcRight + 42.5;
        this.featureInfoPanel.getfeatureInfoPanel_div_alt.style.right = clcRight + "px";
        var modal_content = $('<div><h4 class="modal-header" style="position:absolute; top:-10px; left:0; width:100%; margin-bottom: 5px; border:0">Markhöjder</h4></div>')[0];
        this.featureInfoPanel.getfeatureInfoPanel_div_alt.appendChild(modal_content);
        /*if(clcRight<30){this.featureInfoPanel.getfeatureInfoPanel_div_alt.style.right = 30+"px";}*/
        
        var docButton_alt = document.createElement('button');
        docButton_alt.id = "docSelectionpanelAltButtonID",
        /*docButton_alt.title="Maximera",*/
        docButton_alt.className = "minimize",
        /*docButton_alt.style.right="0px",docButton_alt.style.top="0px",docButton_alt.style.position="absolute";          */
        docButton_alt.onclick = function() {
            window.featureInfoPanel_state = 0;
            var catchDocImg = document.getElementById('selectionPanelDocImg');
            $('#getfeatureInfoPanel_div')[0].style.display = "block";
            $('#getfeatureInfoPanel_div_alt_id')[0].style.display = "none";
        
        }
        var docImg_alt = document.createElement('span');
        docImg_alt.id = "selectionPanelDocImg",
        docImg_alt.className = "glyphicon glyphicon-plus",
        docButton_alt.appendChild(docImg_alt),
        this.featureInfoPanel.getfeatureInfoPanel_div_alt.appendChild(docButton_alt);
        
        var docButton_alt2 = document.createElement('button');
        docButton_alt2.id = "StopGetInfoWidget_alt",
        /*docButton_alt2.title="Stäng",*/
        docButton_alt2.className = "close";
        
        var docImg_alt2 = document.createElement('span');
        docImg_alt2.id = "selectionPanelDocImg_alt2",
        docImg_alt2.className = "glyphicon glyphicon-remove",
        docButton_alt2.appendChild(docImg_alt2),
        this.featureInfoPanel.getfeatureInfoPanel_div_alt.appendChild(docButton_alt2),
        
        document.body.appendChild(this.featureInfoPanel.getfeatureInfoPanel_div_alt);
        this.featureInfoPanel.selectionPanelVisible = true;
        
        
        /*$("#mapdiv").on("touchstart click", $.proxy(function() {
                if(this.active){this._toggleSelectionPanel();}
               
            }
            , this));*/
        
        smap.map.on('resize onorientationchange', $.proxy(function() {
            this._adjustResize_orientationChange()
        }, this));
        
        
        $("[name='keepOldPoints']").bootstrapSwitch();
        $("#deleteAllHeightPoints").on('click', function() {
            window.heightLayer.clearLayers()
        });
        
        $("#StopGetInfoWidget").on('click', function() {
            document.getElementById('smap-getFeatureinfo-btn').click()
        });
        $("#StopGetInfoWidget_alt").on('click', function() {
            document.getElementById('smap-getFeatureinfo-btn').click()
        });
        /*$('#docSelectionpanelButtonID').tooltip({}),$('#docSelectionpanelAltButtonID').tooltip({});*/
        $('.btn.btn-default.btn-sm.he-tog').on("touchstart click", $.proxy(function() {
            $('.btn.btn-default.btn-sm.he-tog')[0].style.display = "none";
            $('.he-ogt')[0].style.display = "block";
            this.featureInfoPanel.getfeatureInfoPanel_div.style.height = innerHeight_custom * 35 / 100 + "px"
        }, this))
    
    
    
    },
    _toggleSelectionPanel: function() {
        if ($('#lswitch-btn')[0].childNodes[0].className === "fa fa-2x fa-chevron-left") {
            $('#getfeatureInfoPanel_div_alt_id')[0].style.display = "none";
            $('#getfeatureInfoPanel_div')[0].style.display = "none";
        } else if ($('#lswitch-btn')[0].childNodes[0].className === "fa fa-bars fa-2x") {
            if (window.featureInfoPanel_state) {
                if (window.featureInfoPanel_state === 1) {
                    $('#getfeatureInfoPanel_div')[0].style.display = "none";
                    $('#getfeatureInfoPanel_div_alt_id')[0].style.display = "block";
                } else if (window.featureInfoPanel_state === 0) {
                    window.featureInfoPanel_state = 0
                }
            } else {
                $('#getfeatureInfoPanel_div')[0].style.display = "block";
                $('#getfeatureInfoPanel_div_alt_id')[0].style.display = "none";
            }
        } else if ($('#lswitch-btn')[0].childNodes[0].className === "fa fa-2x fa-bars") {
            if (window.featureInfoPanel_state) {
                if (window.featureInfoPanel_state === 1) {
                    $('#getfeatureInfoPanel_div')[0].style.display = "none";
                    $('#getfeatureInfoPanel_div_alt_id')[0].style.display = "block";
                } else if (window.featureInfoPanel_state === 0) {
                    window.featureInfoPanel_state = 0
                }
            } else {
                $('#getfeatureInfoPanel_div')[0].style.display = "block";
                $('#getfeatureInfoPanel_div_alt_id')[0].style.display = "none";
            }
        }
    
    },
    _showSelectionPanel: function() {
        if (this.featureInfoPanel.selectionPanelVisible) {
        
        } else {
            window.featureInfoPanel_state = 0,
            this.featureInfoPanel.getfeatureInfoPanel_div.style.display = "block",
            $('#getfeatureInfoPanel_div_alt_id')[0].style.display = "none",
            this.featureInfoPanel.selectionPanelVisible = true;
        }
    
    },
    _hideSelectionPanel: function() {
        window.featureInfoPanel_state = 1,
        this.featureInfoPanel.selectionPanelVisible = false,
        this.featureInfoPanel.getfeatureInfoPanel_div.style.display = "none",
        $('#getfeatureInfoPanel_div_alt_id')[0].style.display = "none";
    
    
    },
    _updateSelectionPanel: function() {
        this._showSelectionPanel();
        var innerHeight_custom = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        $('.btn.btn-default.btn-sm.he-tog')[0].style.display = "block";
        $('.he-ogt')[0].style.display = "none";
        this.featureInfoPanel.getfeatureInfoPanel_div.style.height = innerHeight_custom * 13 / 100 + "px";
    
    
    
    
    },
    _adjustResize_orientationChange: function() {
        
        var innerWidth_custom = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
          , 
        innerHeight_custom = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        
        var clcLeft = (innerWidth_custom / 2 - this.featureInfoPanel.maxWidth / 2);
        this.featureInfoPanel.getfeatureInfoPanel_div.style.left = clcLeft + "px";
        if (clcLeft < 30) {
            this.featureInfoPanel.getfeatureInfoPanel_div.style.left = 30 + "px";
        }
        
        this.featureInfoPanel.getfeatureInfoPanel_div_alt.style.left = clcLeft + "px";
        if (clcLeft < 30) {
            this.featureInfoPanel.getfeatureInfoPanel_div_alt.style.left = 30 + "px";
        }
    
    
    },
    _onMapClick: function(e) {
        
        
        this._updateSelectionPanel();
        /*var getHeightSymbol=this._createHeightSymbol('+250m');*/
        var getHeightValue = this._getFeatureInfo(e);
        
        if (typeof this.heightLayer === "undefined" || this.heightLayer === null ) {
            this.heightLayer = L.layerGroup(),
            window.heightLayer = this.heightLayer,
            this.heightLayer.id = "heightLayer",
            this.map.addLayer(this.heightLayer);
        }
        
        var keepOldPointsState = document.getElementById('keepOldPoints_id').checked;
        if (keepOldPointsState) {} else {
            window.heightLayer.clearLayers();
        }
        
        
        
        var mapLabel_pr = (function() {
            if (getHeightValue.mapLabel) {
                if (isNaN(getHeightValue.mapLabel)) {
                    
                    return getHeightValue.mapLabel;
                
                } else {
                    var local_label = eval(getHeightValue.mapLabel);
                    
                    if (local_label >= 0) {
                        return local_label = "+" + ((Math.round(local_label * 100)) / 100).toString()
                    
                    } else {
                        return local_label = ((Math.round(local_label * 100)) / 100).toString()
                    
                    }
                
                }
            
            
            }
            return "fel";
        
        })();
        
        
        var labelUnit = mapLabel_pr === "Ingen data" ? "" : "m";
        
        
        var markerIcon = L.divIcon({
            className: 'height-div-icon',
            html: '<p style="position:relative;bottom:3px;font-size:10.5pt;font-family:Arial;font-weight:normal;color:#000;text-shadow:0 0 5px #fff"><b>' + mapLabel_pr + '&nbsp;' + labelUnit + '</b></p>'
        });
        
        var markerOptions = {
            icon: markerIcon,
            clickable: true,
            externalGraphic: "http://" + window.location.host + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1) + "img/legend/empty.png",
            label: mapLabel_pr + " " + labelUnit,
            fontColor: "#000000",
            fontSize: 10.5,
            fontFamily: "Arial",
            fontWeight: "bold",
            labelAlign: "lb",
            labelXOffset: -4,
            labelYOffset: -4
        }
        var createRandomNumber = Math.random().toString().split('.')[1];
        var heightMarker = L.marker([e.latlng.lat, e.latlng.lng], markerOptions);
        heightMarker.id = "heightMarkerId_" + createRandomNumber;
        var heightPopupOptions = {
            keepInView: false
        }
        
        
        var heightPopup = L.popup(heightPopupOptions);
        var popupContent = "<div><div><b>Koordinatsystem:</b> </br> WGS 84 decimal (lat, lon)</div>" + "<div><b>Latitud: </b>" + (Math.round(e.latlng.lat * 10000)) / 10000 + "</div>" + "<div><b>Longitud: </b>" + (Math.round(e.latlng.lng * 10000)) / 10000 + "</div>" + "<div><b>Höjd </b>: " + mapLabel_pr + " " + labelUnit + "</div></div>";
        var parentHeightDiv = document.createElement('div');
        parentHeightDiv.appendChild($(popupContent)[0]);
        
        var deleteSingleMarker_div = document.createElement('div');
        deleteSingleMarker_button = document.createElement('button'),
        deleteSingleMarker_button.id = "smap-height-popupbtn_" + createRandomNumber,
        deleteSingleMarker_button.className = "btn btn-default btn-sm",
        deleteSingleMarker_button.value = "Ta bort",
        deleteSingleMarker_button[getTextContent(deleteSingleMarker_button)] = "Ta bort",
        deleteSingleMarker_button.onclick = function() {
            
            var currentMarker = null ;
            var catchMarkerId = "heightMarkerId_" + this.id.split('_')[1];
            var allMarkerLayers = window.heightLayer._layers;
            if (allMarkerLayers) {
                for (lay in allMarkerLayers) {
                    if (allMarkerLayers[lay].id === catchMarkerId) {
                        currentMarker = allMarkerLayers[lay];
                    
                    }
                
                }
            
            }
            window.heightLayer.removeLayer(currentMarker);
        }
        deleteSingleMarker_div.appendChild(deleteSingleMarker_button),
        parentHeightDiv.childNodes[0].appendChild(deleteSingleMarker_div),
        heightPopup.setContent(parentHeightDiv),
        heightMarker.bindPopup(heightPopup),
        heightMarker.addTo(this.heightLayer);
        window.featureInfoPanel_state === 0 ? document.getElementById('docSelectionpanelButtonID').click() : "";
    
    
    
    
    },
    _createHeightSymbol: function(txt) {
        var hgCanvas = document.createElement("canvas");
        hgCanvas.id = "heightData";
        hgCanvas.width = "55";
        hgCanvas.height = "25";
        var ctx = hgCanvas.getContext("2d");
        ctx.font = "15px serif";
        ctx.fillText(txt, 0, 15);
        return hgCanvas.toDataURL();
    },
    
    _getFeatureInfo: function(e) {
        var featureInfo = {};
        var params = "";
        
        if (this.options.selectOptions) {
            for (v in this.options.selectOptions) {
                if (v !== "URL") {
                    params = params + v + "=" + this.options.selectOptions[v] + "&"
                }
            }
            
            if (this.options.selectOptions.URL) {
                if (this.options.selectOptions.URL.indexOf('?') >= 0) {
                    var splitParams = this.options.selectOptions.URL.split('?')
                      , 
                    par_URL = splitParams[0]
                      , 
                    otherParam = splitParams[1];
                    
                    params = par_URL + "?" + params + otherParam;
                } else {
                    params = this.options.selectOptions.URL + "?" + params;
                }
            }
            
            var s = this.map.latLngToContainerPoint(e.latlng);
            var clk_buf = this.options.buffer;
            
            var left_pixel = new OpenLayers.Pixel(s.x - clk_buf,s.y + clk_buf)
              , 
            right_pixel = new OpenLayers.Pixel(s.x + clk_buf,s.y - clk_buf);
            var left_point = L.point(left_pixel.x, left_pixel.y)
              , 
            right_point = L.point(right_pixel.x, right_pixel.y);
            var lng_lat_left = this.map.containerPointToLatLng(left_point)
              , 
            lng_lat_right = this.map.containerPointToLatLng(right_point);
            
            var i = L.latLngBounds(lng_lat_left, lng_lat_right);
            var n = i.toBBoxString();
            
            
            
            if (this.options.selectOptions.SRS && "EPSG:4326" !== this.options.selectOptions.SRS) {
                var a = i.getSouthWest()
                  , 
                r = i.getNorthEast();
                a = utils.projectLatLng(a, "EPSG:4326", this.options.selectOptions.SRS, !1, !1),
                r = utils.projectLatLng(r, "EPSG:4326", this.options.selectOptions.SRS, !1, !1),
                i = L.latLngBounds(a, r),
                n = i.toBBoxString()
            }
            
            
            params = params + "&BBOX=" + n + "&X=" + utils.round(s.x) + "&Y=" + utils.round(s.y) + "&WIDTH=" + utils.round(this.map.getSize().x) + "&HEIGHT=" + utils.round(this.map.getSize().y) + "&exceptions=application%2Fvnd.ogc.se_xml";
            
            
            var xhr = new this._xhr_handler();
            
            xhr.open("GET", params, false);
            xhr.send(null );
            if (xhr.readyState == 4 && xhr.status == 200) {
                var responseInfoText = xhr.responseText;
            
            }
            
            if (this.options.selectOptions.INFO_FORMAT == "text/html") {
                var res_html = document.createElement('html');
                jQuery(res_html).html(responseInfoText),
                //res_html.innerHTML=responseInfoText,
                mapLabel = this.options.mapLbelColumn,
                catchAll_th = res_html.getElementsByTagName('th'),
                catchAll_td = res_html.getElementsByTagName('td'),
                mapLabel_index = (function() {
                    for (var i = 0; i < catchAll_th.length; i++) {
                        if (catchAll_th[i][getTextContent(catchAll_th[i])] === mapLabel) {
                            return i
                        }
                    }
                })(),
                mapLabelValue = mapLabel_index ? catchAll_td[mapLabel_index][getTextContent(catchAll_td[mapLabel_index])] : "Ingen data";
                featureInfo.mapLabel = mapLabelValue;
                featureInfo.fullResponse = res_html;
            
            }
        
        
        }
        
        return featureInfo;
    
    },
    
    _showSplashMessage: function(msg) {
        
        var innerWidth_custom = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
          , 
        innerHeight_custom = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        var geDiv = document.createElement('div')
          , 
        width = 300
          , 
        height = 300;
        geDiv.id = "generalSplashID",
        geDiv.style.width = width + "px",
        geDiv.style.height = height + "px",
        geDiv.style.left = (innerWidth_custom / 2 - width / 2) + "px",
        geDiv.style.top = (innerHeight_custom / 2 - height / 2) + "px",
        geDiv.style.background = "rgba(0,0,0,0.8)",
        geDiv.style.zIndex = "4000",
        geDiv.style.position = "fixed",
        geDiv.style.border = "5px solid white",
        geDiv.style.borderRadius = "15px";
        
        var closeSpan_div = document.createElement('div');
        closeSpan_div.id = "closeSpan_div_id",
        closeSpan_div.style.position = "relative";
        
        var closeSpan = document.createElement('span');
        closeSpan.style.color = "white",
        closeSpan[getTextContent(closeSpan)] = " X ",
        closeSpan.style.position = "relative",
        closeSpan.style.borderRadius = "20px",
        closeSpan.style.background = "rgba(0,0,0,1)",
        closeSpan.style.fontSize = "25px",
        closeSpan.style.top = "10px",
        closeSpan.style.left = (width / 2 - 10) + "px";
        closeSpan.onclick = function() {
            var getSplDiv = document.getElementById("generalSplashID");
            if (getSplDiv) {
                document.body.removeChild(getSplDiv);
            }
        }
        ;
        closeSpan_div.appendChild(closeSpan),
        geDiv.appendChild(closeSpan_div);
        
        var msgDiv = document.createElement('div');
        msgDiv.style.marginTop = "20px",
        msgDiv.style.marginLeft = "10px",
        msgDiv.style.color = "white",
        msgDiv[getTextContent(msgDiv)] = msg + " Meddelandet kommer att stängas i 10 sekunder.",
        geDiv.appendChild(msgDiv),
        document.body.appendChild(geDiv);
        
        window.setTimeout(function() {
            var getSplDiv = document.getElementById("generalSplashID");
            if (getSplDiv) {
                document.body.removeChild(getSplDiv);
            }
        }, 10000)
    
    
    
    
    },
    _xhr_handler: function(method, url) {
        try {
            return new XMLHttpRequest();
        } catch (e) {}
        try {
            return new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {}
        try {
            return new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {}
        alert("XMLHttpRequest not supported");
        return null ;
    }

}),

/*HU Add*/

L.Control.DrawMarker = L.Control.extend({
    options: {
        addToMenu: !1,
        autoActivate: !1,
        position: "bottomright",
        buffer: 12,
        
        
        _lang: {
            sv: {
                titleInfo: "",
                bodyContent: ''
            
            
            }
        }
    },
    _lang: {
        sv: {
            btntitle: "Placera markör"
        },
        en: {
            btntitle: "Place marker"
        }
    },
    _setLang: function(t) {
        t = t || smap.config.langCode || navigator.language.split("-")[0] || "en",
        this._lang && (this.lang = this._lang ? this._lang[t] : null )
    },
    initialize: function(t) {
        L.setOptions(this, t),
        this.options._lang && $.extend(!0, this._lang, this.options._lang),
        this._setLang(t.langCode)
    },
    onAdd: function(t) {
        return this.map = t,
        this._container = L.DomUtil.create("div", "leaflet-control-drawmarker"),
        L.DomEvent.disableClickPropagation(this._container),
        this.$container = $(this._container),
        this._drawBtn(),
        this.featureInfoPanel = {},
        this._container
    },
    onRemove: function() {},
    activate: function() {
        $("#drawMarker").click();
        $("#smap-drawMarker-btn").removeClass("btn-default");
        $("#smap-drawMarker-btn").addClass("btn-primary");
    },
    deactivate: function() {},
    _drawBtn: function() {
        var t = this;
        if (this.options.addToMenu)
            smap.cmd.addToolButton("", "fa fa-map-marker", function() {
                return t.activate(),
                !1
            }, null );
        else {
            var a = $('<button id="smap-drawMarker-btn" title="' + t.lang.btntitle + '"  class="btn btn-default"><span class="fa fa-map-marker"><img class=""></img></span></button>');
            a.on("click", $.proxy(function() {
                return this.active ? this.deactivate() : this.activate(),
                !1
            }, this)),
            this.btn = a,
            this.$container.append(a)
        }
    },

}),
L.control.getFeatureInfo = function(t) {
    return new L.Control.GetFeatureInfo(t)
}
;

L.Control.ShowHideSearch = L.Control.extend({
    
    options: {
        addToMenu: !1,
        autoActivate: !1,
        position: "bottomright",
        _lang: {
            sv: {
                titleInfo: "",
                bodyContent: ''
            }
        }
    },
    _lang: {
        sv: {
            btntitle: "Visa/dölj sök"
        },
        en: {
            btntitle: "Show/hide search"
        }
    },
    _setLang: function(t) {
        t = t || smap.config.langCode || navigator.language.split("-")[0] || "en",
        this._lang && (this.lang = this._lang ? this._lang[t] : null )
    },
    initialize: function(t) {
        L.setOptions(this, t),
        this.options._lang && $.extend(!0, this._lang, this.options._lang),
        this._setLang(t.langCode)
    },
    onAdd: function(t) {
        return this.map = t,
        this._container = L.DomUtil.create("div", "leaflet-control-showhidesearch"),
        L.DomEvent.disableClickPropagation(this._container),
        this.$container = $(this._container),
        this._drawBtn(),
        this._hideSearchPanelOnload(),
        
        this._container
    },
    onRemove: function() {},
    activate: function() {
        this.active = !0,
        this.btn.addClass("btn-primary");
        var catchSearch = document.getElementById('smap-search-div');
        if (catchSearch) {
            catchSearch.style.display = "table";
            $('#searchInputDetact').focus();
            if ($('.popover.fade.bottom.in.thandler-popover')) {
                if ($('.popover.fade.bottom.in.thandler-popover').length > 0) {
                    $('.thandler-btn.popover-dismiss').click();
                  
                    $('.tooltip.fade.bottom.in')[0]?$('.tooltip.fade.bottom.in')[0].style.display = "none":"";
					
                }
            }
        }
    },
    deactivate: function() {
        this.active = !1,
        this.btn.removeClass("btn-primary");
        var catchSearch = document.getElementById('smap-search-div');
        if (catchSearch) {
            catchSearch.style.display = "none";
        }
    },
    _drawBtn: function() {
        var t = this;
        
        if (this.options.addToMenu)
            smap.cmd.addToolButton("", "glyphicon glyphicon-search", function() {
                return t.activate(),
                !1
            }, null );
        else {
            var a = $('<button id="smap-showhidesearch-btn" title="' + t.lang.btntitle + '"  class="btn btn-default"><span class="glyphicon glyphicon-search"></span></button>');
            
            a.on("click", $.proxy(function() {
                return this.active ? this.deactivate() : this.activate(),
                !1
            }, this)),
            
            
            
            this.btn = a,
            this.$container.append(a)
        }
    
    },
    _hideSearchPanelOnload: function() {
        var catchSearch = document.getElementById('smap-search-div');
        if (catchSearch) {
            catchSearch.style.display = "none";
        
        } else {
            window.setTimeout(function() {
                var catchSearch = document.getElementById('smap-search-div');
                if (catchSearch) {
                    catchSearch.style.display = "none";
                }
            
            }, 2000);
        
        }
    
    }
}),
L.Control.showHideSearch = function(t) {
    return new L.Control.ShowHideSearch(t)
}
;
L.Control.ShowHidePlainLegend = L.Control.extend({
    
    options: {
        addToMenu: !1,
        autoActivate: !1,
        position: "bottomright",
        _lang: {
            sv: {
                titleInfo: "",
                bodyContent: ''
            }
        }
    },
    _lang: {
        sv: {
            btntitle: "Visa/dölj teckenförklaring"
        },
        en: {
            btntitle: "Show/hide legend"
        }
    },
    _setLang: function(t) {
        t = t || smap.config.langCode || navigator.language.split("-")[0] || "en",
        this._lang && (this.lang = this._lang ? this._lang[t] : null )
    },
    initialize: function(t) {
        L.setOptions(this, t),
        this.options._lang && $.extend(!0, this._lang, this.options._lang),
        this._setLang(t.langCode)
    },
    onAdd: function(t) {
        return this.map = t,
        this._container = L.DomUtil.create("div", "leaflet-control-showhideplainlegend"),
        L.DomEvent.disableClickPropagation(this._container),
        this.$container = $(this._container),
        this._drawBtn(),        
        this._container
    },
    onRemove: function() {},
    activate: function() {
        this.active = !0,
        this.btn.addClass("btn-primary");		
		if(typeof L.Control.ShowHidePlainLegend.prototype._model === "undefined" || L.Control.ShowHidePlainLegend.prototype._model === null){
			this.createPlainLegend();
		}else{
			L.Control.ShowHidePlainLegend.prototype._model.modal("show");
		}

    },
    deactivate: function() {
        this.active = !1,
        this.btn.removeClass("btn-primary");

    },
    _drawBtn: function() {
        var t = this;
        
        if (this.options.addToMenu)
            smap.cmd.addToolButton("", "glyphicon glyphicon-barcode", function() {
                return t.activate(),
                !1
            }, null );
        else {
            var a = $('<button id="smap-showhideplainlegend-btn" title="' + t.lang.btntitle + '"  class="btn btn-default"><span class="glyphicon glyphicon-barcode"></span></button>');
            
            a.on("click", $.proxy(function() {
                return this.active ? this.deactivate() : this.activate(),
                !1
            }, this)),                                   
            this.btn = a,
            this.$container.append(a)
        }
    
    },

	createPlainLegend: function(){		
		var e = '<button type="button" class="btn btn-default" data-dismiss="modal">Stäng</button>';
		var bodyCondent = "";bodyCondent = bodyCondent + '<div id="plainlegend_content_div_id" class="row">  </div>';
		var innerWidth_custom = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		L.Control.ShowHidePlainLegend.prototype._model = utils.drawDialog(this.options.displayName, bodyCondent, e, {"size":"lg"} );L.Control.ShowHidePlainLegend.prototype._model.attr("id", "plainlegend_dialog_id");L.Control.ShowHidePlainLegend.prototype._model.modal("show");L.Control.ShowHidePlainLegend.prototype.options = this.options;		
		L.Control.ShowHidePlainLegend.prototype._model.on('shown.bs.modal', function() {			
			smap.cmd.showAllMapLayerLegendTogether();			
			var mainLegendDiv = document.getElementById('plainlegend_content_div_id');			
			if(smap.cmd.allActiveLayersLegend.length > 0){
				
			var loadLegendMixed = function(){											
			var content_url = '';
			for(var i = 0; i< smap.cmd.allActiveLayersLegend.length; i++){if(i === smap.cmd.allActiveLayersLegend.length - 1){content_url = content_url + '"' +smap.cmd.allActiveLayersLegend[i]+ '"';	}else{content_url = content_url + '"' +smap.cmd.allActiveLayersLegend[i]+ '",';	}} 			
			var content = '{"legends": ['+content_url+']}';var recv_png = "";var plainLegend_xhr= new smap.cmd._xhr_handler();plainLegend_xhr.open("POST", L.Control.ShowHidePlainLegend.prototype.options.serviceURL, false);plainLegend_xhr.send(content);if (plainLegend_xhr.readyState == 4 && plainLegend_xhr.status == 200) {recv_png = plainLegend_xhr.responseText;}			  
			  if (typeof recv_png.match('data:image/png;base64') !== "undefined" && recv_png.match('data:image/png;base64') !== null ) {
				if (recv_png.match('data:image/png;base64').indexOf('data:image/png;base64') >= 0) {var legendContainerDiv = $('<div id = "legendContainerDiv_id"><div class="col-xs-12 col-sm-12"><img style="max-width:85%;" class="" src="'+recv_png+'" ></img></div></div>');  							  
			  }else{
				 var content_alt = "";
				 for(var i = 0; i< smap.cmd.allActiveLayersLegendWithDisplayName.length; i++){content_alt =  content_alt + '<span><b>'+smap.cmd.allActiveLayersLegendWithDisplayName[i].split('legend_saperator')[0]+':</b></span>' + '<img style ="max-widtg:85%" src ='+smap.cmd.allActiveLayersLegendWithDisplayName[i].split('legend_saperator')[1]+'>';}
				 var legendContainerDiv = $('<div id = "legendContainerDiv_id"><div class="col-xs-12 col-sm-12">'+content_alt+'</div></div>'); 				  
			  }			  
			  }else{
				 var content_alt = "";
				 for(var i = 0; i< smap.cmd.allActiveLayersLegendWithDisplayName.length; i++){content_alt =  content_alt + '<span><b>'+smap.cmd.allActiveLayersLegendWithDisplayName[i].split('legend_saperator')[0]+':</b></span>' + '<img style ="max-widtg:85%" src ='+smap.cmd.allActiveLayersLegendWithDisplayName[i].split('legend_saperator')[1]+'>';}
				 var legendContainerDiv = $('<div id = "legendContainerDiv_id"><div class="col-xs-12 col-sm-12">'+content_alt+'</div></div>'); 			  
			  }			  												
			return legendContainerDiv;
			}					
		  if(typeof L.Control.ShowHidePlainLegend.prototype.options.frClient !== "undefined" && L.Control.ShowHidePlainLegend.prototype.options.frClient !== null){
				if(L.Control.ShowHidePlainLegend.prototype.options.frClient){
				 var content_alt = "";
				 for(var i = 0; i< smap.cmd.allActiveLayersLegendWithDisplayName.length; i++){content_alt =  content_alt + '<span><b>'+smap.cmd.allActiveLayersLegendWithDisplayName[i].split('legend_saperator')[0]+':</b></span>' + '<img style ="max-widtg:85%" src ='+smap.cmd.allActiveLayersLegendWithDisplayName[i].split('legend_saperator')[1]+'>';}
				 var legendContainerDiv = $('<div id = "legendContainerDiv_id"><div class="col-xs-12 col-sm-12">'+content_alt+'</div></div>'); 
			}else{var legendContainerDiv= loadLegendMixed();}}else{var legendContainerDiv = loadLegendMixed();}
			
			}else{
			var legendContainerDiv = $('<div id = "legendContainerDiv_id"><div class="col-xs-12 col-sm-12"><span>Ingen kartlager har vält i kartan</span></div></div>');	
			}
            mainLegendDiv.appendChild(legendContainerDiv[0]);                               				
		});
		
		L.Control.ShowHidePlainLegend.prototype._model.on('hidden.bs.modal', function() {var mainLegendDiv = document.getElementById('plainlegend_content_div_id');var legendContainerDiv = document.getElementById('legendContainerDiv_id');mainLegendDiv.removeChild(legendContainerDiv);document.getElementById('smap-showhideplainlegend-btn').click();});
	}
	

}),
L.Control.showHidePlainLegend = function(t) {
    return new L.Control.ShowHidePlainLegend(t)
}
;

/*Mohammad Add*/
/*Mohammad Add*/
window.loadedPopup_image_Height = 0;
window.loadedPopup_image_Width = 0;
window.getTextContent = function(e) {
    var t = "innerText" in e ? "innerText" : "textContent";
    return t
}
window.adj_lswitch_btn = function() {
    if (document.getElementById('lswitch-panel_unselectable')) {
        $('#lswitch-btn')[0].style.left = document.getElementById('lswitch-panel_unselectable').getBoundingClientRect().right + "px";
    }
}
;

/*Vakant*/
smap.event.on("smap.core.applyparams", function() {
    smap.cmd.advSearch(smap.map)
});
smap.event.on("smap.core.applyparams", function() {
    smap.cmd.mergeLayers()
});
smap.event.on("smap.core.applyparams", function() {var clientWidth = window.innerWidth || document.documentElement.clientWidth  || document.body.clientWidth;if (clientWidth ){if (clientWidth < 375 || window!=window.top){if($('.lswitch-btnhide.btn.btn-default')){if($('.lswitch-btnhide.btn.btn-default').length>0){$('.lswitch-btnhide.btn.btn-default')[0].click();}}}}});

/*Vakant*/


smap.event.on("smap.core.applyparams", function() {
    var hideModulesStatus = {};
    hideModulesStatus.hideAllModules = window.getQueryParameters('hideallmodules'),hideModulesStatus.hideSearchModule = window.getQueryParameters('hidesearchmodule'),hideModulesStatus.hideOpacityModule = window.getQueryParameters('hideopacitymodule'),hideModulesStatus.hideMeasureModule = window.getQueryParameters('hidemeasuremodule'),hideModulesStatus.hideShareModule = window.getQueryParameters('hidesharemodule'),hideModulesStatus.hideHeightModule = window.getQueryParameters('hideheightmodule'),hideModulesStatus.hidePrintModule = window.getQueryParameters('hideprintmodule'),hideModulesStatus.hideAboutMapModule = window.getQueryParameters('hideaboutmapmodule'),hideModulesStatus.hideLocateModule = window.getQueryParameters('hideLocateModule'),hideModulesStatus.hideLegendModule = window.getQueryParameters('hideLegendModule');
    var hideSingleModule = function(hideModulesStatus) {if (hideModulesStatus.hideSearchModule.length > 0) {if (hideModulesStatus.hideSearchModule === "true") {if( document.getElementById('smap-showhidesearch-btn')){$('#smap-showhidesearch-btn')[0].style.display = "none";}}}
        if (hideModulesStatus.hideOpacityModule.length > 0) {if (hideModulesStatus.hideOpacityModule === "true") {if( document.getElementById('smap-opacity-btn')){$('#smap-opacity-btn')[0].style.display = "none";}}}
        if (hideModulesStatus.hideMeasureModule.length > 0) {if (hideModulesStatus.hideMeasureModule === "true") {if($('.leaflet-control-measuredraw.leaflet-control')[0]){$('.leaflet-control-measuredraw.leaflet-control')[0].style.display = "none";}}}
        if (hideModulesStatus.hideShareModule.length > 0) {if (hideModulesStatus.hideShareModule === "true") {if( document.getElementById('smap-sharelink-btn')){$('#smap-sharelink-btn')[0].style.display = "none";}}}
        if (hideModulesStatus.hideHeightModule.length > 0) {if (hideModulesStatus.hideHeightModule === "true") {if( document.getElementById('smap-getFeatureinfo-btn')){$('#smap-getFeatureinfo-btn')[0].style.display = "none";}}}
        if (hideModulesStatus.hidePrintModule.length > 0) {if (hideModulesStatus.hidePrintModule === "true") {if( document.getElementById('smap-print-btn')){$('#smap-print-btn')[0].style.display = "none";}}}
        if (hideModulesStatus.hideAboutMapModule.length > 0) {if (hideModulesStatus.hideAboutMapModule === "true") {if( document.getElementById('smap-info-btn')){$('#smap-info-btn')[0].style.display = "none";}}}
        if (hideModulesStatus.hideLocateModule.length > 0) {if (hideModulesStatus.hideLocateModule === "true") {if( document.getElementById('smap-glocate-btn')){$('#smap-glocate-btn')[0].style.display = "none";}}}
		if (hideModulesStatus.hideLegendModule.length > 0){if (hideModulesStatus.hideLegendModule === "true") {if (document.getElementById('smap-showhideplainlegend-btn')) {$('#smap-showhideplainlegend-btn')[0].style.display = "none";}}}
		}
        if (hideModulesStatus.hideAllModules.length > 0) {if (hideModulesStatus.hideAllModules === "true") {for (key in hideModulesStatus) {if (key === "hideLocateModule") {if (hideModulesStatus[key].length > 0) {if (hideModulesStatus[key] === "true") {} else {hideModulesStatus[key] = "false";}} else {hideModulesStatus[key] = "false";}}if (hideModulesStatus[key] !== "false") {hideModulesStatus[key] = "true";}}hideSingleModule(hideModulesStatus);var signalForHidePopover = "true";for (key in hideModulesStatus) {if (key === "hideLocateModule") {} else {if (hideModulesStatus[key] === "false") {signalForHidePopover = "false";} else {}}}if (signalForHidePopover === "true") {if ($('.thandler-btn.popover-dismiss')) {if ($('.thandler-btn.popover-dismiss').length > 0) {$('.thandler-btn.popover-dismiss')[0].style.display = "none";}}}} else {hideSingleModule(hideModulesStatus);}} else {hideSingleModule(hideModulesStatus);}var innerWidth_custom = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, innerHeight_custom = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;if (innerWidth_custom < 257 || innerHeight_custom < 361) {if ($('#kristianstad_logo_id')) {if ($('#kristianstad_logo_id').length > 0) {$('#kristianstad_logo_id')[0].style.display = "none";}}}
});

