export default class ToGcj {
  constructor() {
    this.PI = 3.14159265358979324
  }

  // GCJ-02 to WGS-84
  gcj_decrypt(array) {
    const temp = array.map((item) => {
      if (this.outOfChina(item.gcjLat, item.gcjLon)) return { 'lat': item.gcjLat, 'lon': item.gcjLon };
      var d = this.delta(item.gcjLat, item.gcjLon);
      return { 'lat': item.gcjLat - d.lat, 'lon': item.gcjLon - d.lon };
    })
    return temp
  }

  // GCJ-02 to WGS-84 exactly
  gcj_decrypt_exact(array) {
    const templocationArray = array.map((item) => {
      var initDelta = 0.01;
      var threshold = 0.000000001;
      var dLat = initDelta, dLon = initDelta;
      var mLat = item.gcjLat - dLat, mLon = item.gcjLon - dLon;
      var pLat = item.gcjLat + dLat, pLon = item.gcjLon + dLon;
      var wgsLat, wgsLon, i = 0;
      while (1) {
        wgsLat = (mLat + pLat) / 2;
        wgsLon = (mLon + pLon) / 2;
        var tmp = this.gcj_encrypt(wgsLat, wgsLon)
        dLat = tmp.lat - item.gcjLat;
        dLon = tmp.lon - item.gcjLon;
        if ((Math.abs(dLat) < threshold) && (Math.abs(dLon) < threshold))
          break;
  
        if (dLat > 0) pLat = wgsLat; else mLat = wgsLat;
        if (dLon > 0) pLon = wgsLon; else mLon = wgsLon;
  
        if (++i > 10000) break;
      }
      return { 'lat': wgsLat, 'lon': wgsLon };
    })
    return templocationArray
  }

  // WGS-84 to GCJ-02
  gcj_encrypt(wgsLat, wgsLon) {
    if (this.outOfChina(wgsLat, wgsLon))
    return {'lat': wgsLat, 'lon': wgsLon};
    var d = this.delta(wgsLat, wgsLon);
    return {'lat' : wgsLat + d.lat,'lon' : wgsLon + d.lon};
  }

  // two point's distance
  distance(latA, lonA, latB, lonB) {
    var earthR = 6371000.;
    var x = Math.cos(latA * this.PI / 180.) * Math.cos(latB * this.PI / 180.) * Math.cos((lonA - lonB) * this.PI / 180);
    var y = Math.sin(latA * this.PI / 180.) * Math.sin(latB * this.PI / 180.);
    var s = x + y;
    if (s > 1) s = 1;
    if (s < -1) s = -1;
    var alpha = Math.acos(s);
    var distance = alpha * earthR;
    return distance;
  }

  outOfChina(lat, lon) {
    if (lon < 72.004 || lon > 137.8347)
      return true;
    if (lat < 0.8293 || lat > 55.8271)
      return true;
    return false;
  }

  delta(lat, lon) {
    // Krasovsky 1940
    //
    // a = 6378245.0, 1/f = 298.3
    // b = a * (1 - f)
    // ee = (a^2 - b^2) / a^2;
    var a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
    var ee = 0.00669342162296594323; //  ee: 椭球的偏心率。
    var dLat = this.transformLat(lon - 105.0, lat - 35.0);
    var dLon = this.transformLon(lon - 105.0, lat - 35.0);
    var radLat = lat / 180.0 * this.PI;
    var magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    var sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * this.PI);
    dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * this.PI);
    return { 'lat': dLat, 'lon': dLon };
  }

  transformLat(x, y) {
    var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin(y / 3.0 * this.PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(y / 12.0 * this.PI) + 320 * Math.sin(y * this.PI / 30.0)) * 2.0 / 3.0;
    return ret;
  }

  transformLon(x, y) {
    var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin(x / 3.0 * this.PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(x / 12.0 * this.PI) + 300.0 * Math.sin(x / 30.0 * this.PI)) * 2.0 / 3.0;
    return ret;
  }
}