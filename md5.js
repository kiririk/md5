function md5(text) {
    var a = 0x67452301,
        b = 0xefcdab89,
        c = 0x98badcfe,
        d = 0x10325476;

    var left_rotate = (number, amount) => (number << amount) | (number >>> (32 - amount)),
        sup_func = (sub_func_result, a, b, x, s, t) => left_rotate((a + sub_func_result) + (x + t), s) + b,
        f = (a, b, c, d, x, s, t) => sup_func((b & c) | ((~b) & d), a, b, x, s, t),
        g = (a, b, c, d, x, s, t) => sup_func((b & d) | (c & (~d)), a, b, x, s, t),
        h = (a, b, c, d, x, s, t) => sup_func(b ^ c ^ d, a, b, x, s, t),
        i = (a, b, c, d, x, s, t) => sup_func(c ^ (b | (~d)), a, b, x, s, t);

    function createMsgArr(text) {
        var str2rstrUTF8 = input => unescape(encodeURIComponent(input));
        text = str2rstrUTF8(text);
        var amount_16_block = parseInt(text.length/56) + 1,
            result_block = new Array(amount_16_block * 16).fill('');
        for (var i = 0; i < text.length; i++)
            result_block[parseInt(i/4)] += text.charCodeAt(i).toString(16);
        result_block[parseInt(i/4)] += '80';
        result_block[result_block.length - 2] = text.length * 8;
        //длина в битах (байт = буква) -> байт * 8 ^
        result_block = result_block.map(el => typeof el == 'string' ? el.match(/.{1,2}/ig) : el)
                                   .map(el => el == null ? 0 : el)
                                   .map(el => typeof el == 'object' ? parseInt(el.reverse().join(''),16) : el);
        return result_block;
    }

    function rhex(num) {
      var str = "";
      for(var j = 0; j <= 3; j++)
        str += ((num >> (j * 8 + 4)) & 0x0F).toString(16) +
               ((num >> (j * 8)) & 0x0F).toString(16);
      return str;
    }

    function mainMD5(text) {
        var x = createMsgArr(text), aa, bb, cc, dd;
        var tCalc = x => Math.pow(2, 32) * Math.abs(Math.sin(x)) | 0;
        for(var j = 0; j < x.length; j += 16)
        {
            aa = a;
            bb = b;
            cc = c;
            dd = d;
            //1
            a = f(a, b, c, d, x[j+0], 7 , tCalc(1));
            d = f(d, a, b, c, x[j+1], 12, tCalc(2));
            c = f(c, d, a, b, x[j+2], 17, tCalc(3));
            b = f(b, c, d, a, x[j+3], 22, tCalc(4));
            a = f(a, b, c, d, x[j+4], 7 , tCalc(5));
            d = f(d, a, b, c, x[j+5], 12, tCalc(6));
            c = f(c, d, a, b, x[j+6], 17, tCalc(7));
            b = f(b, c, d, a, x[j+7], 22, tCalc(8));
            a = f(a, b, c, d, x[j+8], 7 , tCalc(9));
            d = f(d, a, b, c, x[j+9], 12, tCalc(10));
            c = f(c, d, a, b, x[j+10], 17, tCalc(11));
            b = f(b, c, d, a, x[j+11], 22, tCalc(12));
            a = f(a, b, c, d, x[j+12], 7 , tCalc(13));
            d = f(d, a, b, c, x[j+13], 12, tCalc(14));
            c = f(c, d, a, b, x[j+14], 17, tCalc(15));
            b = f(b, c, d, a, x[j+15], 22, tCalc(16));
            //2
            a = g(a, b, c, d, x[j+1], 5 , tCalc(17));
            d = g(d, a, b, c, x[j+6], 9 , tCalc(18));
            c = g(c, d, a, b, x[j+11], 14, tCalc(19));
            b = g(b, c, d, a, x[j+0], 20, tCalc(20));
            a = g(a, b, c, d, x[j+5], 5 , tCalc(21));
            d = g(d, a, b, c, x[j+10], 9 , tCalc(22));
            c = g(c, d, a, b, x[j+15], 14, tCalc(23));
            b = g(b, c, d, a, x[j+4], 20, tCalc(24));
            a = g(a, b, c, d, x[j+9], 5 , tCalc(25));
            d = g(d, a, b, c, x[j+14], 9 , tCalc(26));
            c = g(c, d, a, b, x[j+3], 14, tCalc(27));
            b = g(b, c, d, a, x[j+8], 20, tCalc(28));
            a = g(a, b, c, d, x[j+13], 5 , tCalc(29));
            d = g(d, a, b, c, x[j+2], 9 , tCalc(30));
            c = g(c, d, a, b, x[j+7], 14, tCalc(31));
            b = g(b, c, d, a, x[j+12], 20, tCalc(32));
            //3
            a = h(a, b, c, d, x[j+5], 4 , tCalc(33));
            d = h(d, a, b, c, x[j+8], 11, tCalc(34));
            c = h(c, d, a, b, x[j+11], 16, tCalc(35));
            b = h(b, c, d, a, x[j+14], 23, tCalc(36));
            a = h(a, b, c, d, x[j+1], 4 , tCalc(37));
            d = h(d, a, b, c, x[j+4], 11, tCalc(38));
            c = h(c, d, a, b, x[j+7], 16, tCalc(39));
            b = h(b, c, d, a, x[j+10], 23, tCalc(40));
            a = h(a, b, c, d, x[j+13], 4 , tCalc(41));
            d = h(d, a, b, c, x[j+0], 11, tCalc(42));
            c = h(c, d, a, b, x[j+3], 16, tCalc(43));
            b = h(b, c, d, a, x[j+6], 23, tCalc(44));
            a = h(a, b, c, d, x[j+9], 4 , tCalc(45));
            d = h(d, a, b, c, x[j+12], 11, tCalc(46));
            c = h(c, d, a, b, x[j+15], 16, tCalc(47));
            b = h(b, c, d, a, x[j+2], 23, tCalc(48));
            //4
            a = i(a, b, c, d, x[j+0], 6 , tCalc(49));
            d = i(d, a, b, c, x[j+7], 10, tCalc(50));
            c = i(c, d, a, b, x[j+14], 15, tCalc(51));
            b = i(b, c, d, a, x[j+5], 21, tCalc(52));
            a = i(a, b, c, d, x[j+12], 6 , tCalc(53));
            d = i(d, a, b, c, x[j+3], 10, tCalc(54));
            c = i(c, d, a, b, x[j+10], 15, tCalc(55));
            b = i(b, c, d, a, x[j+1], 21, tCalc(56));
            a = i(a, b, c, d, x[j+8], 6 , tCalc(57));
            d = i(d, a, b, c, x[j+15], 10, tCalc(58));
            c = i(c, d, a, b, x[j+6], 15, tCalc(59));
            b = i(b, c, d, a, x[j+13], 21, tCalc(60));
            a = i(a, b, c, d, x[j+4], 6 , tCalc(61));
            d = i(d, a, b, c, x[j+11], 10, tCalc(62));
            c = i(c, d, a, b, x[j+2], 15, tCalc(63));
            b = i(b, c, d, a, x[j+9], 21, tCalc(64));

            a = a + aa;
            b = b + bb;
            c = c + cc;
            d = d + dd;
        }
        return (rhex(a) + rhex(b) + rhex(c) + rhex(d)).toUpperCase();
    }
    return mainMD5(text);
}

console.log(md5('md5'));
console.log(md5(''));
console.log(md5('привет мир!'));
