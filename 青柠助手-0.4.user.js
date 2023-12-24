// ==UserScript==
// @name         青柠助手
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  答题脚本，仅供学习交流使用，请在下载后24小时内删除，否则后果自负！
// @author       Join-Mai
// @match        *://course.nczy.edu.cn/*
// @grant        none
// @require      https://cdn.bootcdn.net/ajax/libs/jquery/3.6.4/jquery.min.js
// @require      https://cdn.bootcdn.net/ajax/libs/crypto-js/4.1.1/crypto-js.min.js
// ==/UserScript==

!function (a, b) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = b : "function" == typeof define && define.amd ? define([], function () {
        return b(a)
    }) : a.Qmsg = b(a)
}(this, function (a) {
    "use strict";

    function h() {
        var b, a = c;
        for (b = 0; b < arguments.length; ++b) a += "-" + arguments[b];
        return a
    }

    function i(a) {
        var g, i, k, l, m, o, p, q, r, s, b = this;
        b.settings = Object.assign({}, e, a || {}), b.id = n.instanceCount, g = b.settings.timeout, g = g && parseInt(g >= 0) && parseInt(g) <= Math.NEGATIVE_INFINITY ? parseInt(g) : e.timeout, b.timeout = g, b.settings.timeout = g, b.timer = null, i = document.createElement("div"), k = f[b.settings.type || "info"], l = h("content-" + b.settings.type || "info"), l += b.settings.showClose ? " " + h("content-with-close") : "", m = b.settings.content || "", o = f["close"], p = b.settings.showClose ? '<i class="qmsg-icon qmsg-icon-close">' + o + "</i>" : "", q = document.createElement("span"), b.settings.html ? q.innerHTML = m : q.innerText = m, i.innerHTML = '<div class="qmsg-content">            <div class="' + l + '">                <i class="qmsg-icon">' + k + "</i>" + q.outerHTML + p + "</div>		</div>", i.classList.add(h("item")), i.style.textAlign = b.settings.position, r = document.querySelector("." + c), r || (r = document.createElement("div"), r.classList.add(c), r.classList.add(h("wrapper")), r.classList.add(h("is-initialized")), document.body.appendChild(r)), r.appendChild(i), b.$wrapper = r, b.$elem = i, j(b, "opening"), b.settings.showClose && i.querySelector(".qmsg-icon-close").addEventListener("click", function () {
            b.close()
        }.bind(i)), i.addEventListener("animationend", function (a) {
            var b = a.target, c = a.animationName;
            c === d["closing"] && (clearInterval(this.timer), this.destroy()), b.style.animationName = ""
        }.bind(b)), b.settings.autoClose && (s = 10, b.timer = setInterval(function () {
            this.timeout -= s, this.timeout <= 0 && (clearInterval(this.timer), this.close())
        }.bind(b), s), b.$elem.addEventListener("mouseover", function () {
            clearInterval(this.timer)
        }.bind(b)), b.$elem.addEventListener("mouseout", function () {
            "closing" !== this.state && (this.timer = setInterval(function () {
                this.timeout -= s, this.timeout <= 0 && (clearInterval(this.timer), this.close())
            }.bind(b), s))
        }.bind(b)))
    }

    function j(a, b) {
        b && d[b] && (a.state = b, a.$elem.style.animationName = d[b])
    }

    function k(a) {
        var b = h("count"), c = a.$elem.querySelector('[class^="qmsg-content-"]'), d = c.querySelector("." + b);
        d || (d = document.createElement("span"), d.classList.add(b), c.appendChild(d)), d.innerHTML = a.count, d.style.animationName = "", d.style.animationName = "MessageShake", a.timeout = a.settings.timeout || e.timeout
    }

    function l(a, b) {
        var c = Object.assign({}, e);
        return 0 === arguments.length ? c : a instanceof Object ? Object.assign(c, a) : (c.content = a.toString(), b instanceof Object ? Object.assign(c, b) : c)
    }

    function m(a) {
        var b, c, d, e, f, g, h, j, l, m;
        a = a || {}, b = JSON.stringify(a), c = -1;
        for (e in this.oMsgs) if (f = this.oMsgs[e], f.config === b) {
            c = e, d = f.inst;
            break
        }
        if (0 > c) {
            if (this.instanceCount++, g = {}, g.id = this.instanceCount, g.config = b, d = new i(a), d.id = this.instanceCount, d.count = "", g.inst = d, this.oMsgs[this.instanceCount] = g, h = this.oMsgs.length, j = this.maxNums, h > j) for (l = 0, m = this.oMsgs, l; h - j > l; l++) m[l] && m[l].inst.settings.autoClose && m[l].inst.close()
        } else d.count = d.count ? d.count >= 99 ? d.count : d.count + 1 : 2, k(d);
        return d.$elem.setAttribute("data-count", d.count), d
    }

    var b, c, d, e, f, g, n;
    return "function" != typeof Object.assign && (Object.assign = function (a) {
        var b, c, d;
        if (null == a) throw new TypeError("Cannot convert undefined or null to object");
        for (a = Object(a), b = 1; b < arguments.length; b++) if (c = arguments[b], null != c) for (d in c) Object.prototype.hasOwnProperty.call(c, d) && (a[d] = c[d]);
        return a
    }), "classList" in document.documentElement || Object.defineProperty(HTMLElement.prototype, "classList", {
        get: function () {
            function b(b) {
                return function (c) {
                    var d = a.className.split(/\s+/g), e = d.indexOf(c);
                    b(d, e, c), a.className = d.join(" ")
                }
            }

            var a = this;
            return {
                add: b(function (a, b, c) {
                    ~b || a.push(c)
                }), remove: b(function (a, b) {
                    ~b && a.splice(b, 1)
                }), toggle: b(function (a, b, c) {
                    ~b ? a.splice(b, 1) : a.push(c)
                }), contains: function (b) {
                    return !!~a.className.split(/\s+/g).indexOf(b)
                }, item: function (b) {
                    return a.className.split(/\s+/g)[b] || null
                }
            }
        }
    }), b = "qmsg", c = a && a.QMSG_GLOBALS && a.QMSG_GLOBALS.NAMESPACE || b, d = {
        opening: "MessageMoveIn",
        done: "",
        closing: "MessageMoveOut"
    }, e = Object.assign({
        position: "center",
        type: "info",
        showClose: !1,
        timeout: 2500,
        animation: !0,
        autoClose: !0,
        content: "",
        onClose: null,
        maxNums: 5,
        html: !1
    }, a && a.QMSG_GLOBALS && a.QMSG_GLOBALS.DEFAULTS), f = {
        info: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M512 64q190.016 4.992 316.512 131.488T960 512q-4.992 190.016-131.488 316.512T512 960q-190.016-4.992-316.512-131.488T64 512q4.992-190.016 131.488-316.512T512 64zm67.008 275.008q26.016 0 43.008-15.488t16.992-41.504-16.992-41.504-42.496-15.488-42.496 15.488-16.992 41.504 16.992 41.504 42.016 15.488zm12 360q0-6.016.992-16T592 664l-52.992 60.992q-8 8.992-16.512 14.016T508 742.016q-8.992-4-8-14.016l88-276.992q4.992-28-8.992-48t-44.992-24q-35.008.992-76.512 29.504t-72.512 72.512v15.008q-.992 10.016 0 19.008l52.992-60.992q8-8.992 16.512-14.016T468 437.024q10.016 4.992 7.008 16l-87.008 276q-7.008 24.992 7.008 44.512T444 800.032q50.016-.992 84-28.992t63.008-72z" fill="#909399"/></svg>',
        warning: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M512 64C264.64 64 64 264.64 64 512c0 247.424 200.64 448 448 448 247.488 0 448-200.576 448-448 0-247.36-200.512-448-448-448zm0 704c-26.432 0-48-21.504-48-48s21.568-48 48-48c26.624 0 48 21.504 48 48s-21.376 48-48 48zm48-240c0 26.56-21.376 48-48 48-26.432 0-48-21.44-48-48V304c0-26.56 21.568-48 48-48 26.624 0 48 21.44 48 48v224z" fill="#E6A23C"/></svg>',
        error: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M512 64C264.58 64 64 264.58 64 512s200.58 448 448 448 448-200.57 448-448S759.42 64 512 64zm158.39 561.14a32 32 0 1 1-45.25 45.26L512 557.26 398.86 670.4a32 32 0 0 1-45.25-45.26L466.75 512 353.61 398.86a32 32 0 0 1 45.25-45.25L512 466.74l113.14-113.13a32 32 0 0 1 45.25 45.25L557.25 512z" fill="#F56C6C"/></svg>',
        success: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M512 64q190.016 4.992 316.512 131.488T960 512q-4.992 190.016-131.488 316.512T512 960q-190.016-4.992-316.512-131.488T64 512q4.992-190.016 131.488-316.512T512 64zm-56 536l-99.008-99.008q-12-11.008-27.488-11.008t-27.008 11.488-11.488 26.496 11.008 27.008l127.008 127.008q11.008 11.008 27.008 11.008t27.008-11.008l263.008-263.008q15.008-15.008 9.504-36.512t-27.008-27.008-36.512 9.504z" fill="#67C23A"/></svg>',
        loading: '<svg class="animate-turn" width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" fill-opacity=".01" d="M0 0h48v48H0z"/><path d="M4 24c0 11.046 8.954 20 20 20s20-8.954 20-20S35.046 4 24 4" stroke="#409eff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M36 24c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12" stroke="#409eff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        close: '<svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M14 14L34 34" stroke="#909399" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 34L34 14" stroke="#909399" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    }, g = function () {
        var a = document.createElement("div").style;
        return void 0 !== a.animationName || void 0 !== a.WebkitAnimationName || void 0 !== a.MozAnimationName || void 0 !== a.msAnimationName || void 0 !== a.OAnimationName
    }(), i.prototype.destroy = function () {
        this.$elem.parentNode && this.$elem.parentNode.removeChild(this.$elem), clearInterval(this.timer), n.remove(this.id)
    }, i.prototype.close = function () {
        j(this, "closing"), g ? n.remove(this.id) : this.destroy();
        var a = this.settings.onClose;
        a && a instanceof Function && a.call(this)
    }, n = {
        version: "0.0.1", instanceCount: 0, oMsgs: [], maxNums: e.maxNums || 5, config: function (a) {
            e = a && a instanceof Object ? Object.assign(e, a) : e, this.maxNums = e.maxNums && e.maxNums > 0 ? parseInt(e.maxNums) : 3
        }, info: function (a, b) {
            var c = l(a, b);
            return c.type = "info", m.call(this, c)
        }, warning: function (a, b) {
            var c = l(a, b);
            return c.type = "warning", m.call(this, c)
        }, success: function (a, b) {
            var c = l(a, b);
            return c.type = "success", m.call(this, c)
        }, error: function (a, b) {
            var c = l(a, b);
            return c.type = "error", m.call(this, c)
        }, loading: function (a, b) {
            var c = l(a, b);
            return c.type = "loading", c.autoClose = !1, m.call(this, c)
        }, remove: function (a) {
            this.oMsgs[a] && delete this.oMsgs[a]
        }, closeAll: function () {
            for (var a in this.oMsgs) this.oMsgs[a] && this.oMsgs[a].inst.close()
        }
    }
});

(function () {
    'use strict';

    const searchList = ["<span style='color: #47ceab;'>多选题：</span>恋爱婚烟,家庭是人类同一序列社会生活的三个阶段，恋爱行为是对社会负有相应道德责任的行为，下列选项中，符合恋爱中基本道德要求的有()。\n<span style='color: #FF0000;'>A.追求高尚的情趣和健康的交往方式</span>\nB.注重过程，不以婚姻为目的\n<span style='color: #FF0000;'>C.尊重对方的情感和人格</span>\n<span style='color: #FF0000;'>D.彼此真实真诚，自愿为对方承担责任</span>\n", "<span style='color: #47ceab;'>多选题：</span>2020年我国颁布的民法典具有鲜明道德导向。如第7条“民事主体从事民事活动，应当遵循诚信原则，秉持诚实，恪守承诺。”第8条“民事主体从事民事活动，不得违反法律，不得违背公序良俗。”第184条“因自愿实施紧急救助行为造成受助人损害的，救助人不承担民事责任。”法律对道德的导向主要表现为（）。\n<span style='color: #FF0000;'>A.法律助推社会公德水平提升</span>\nB.法律决定道德传承的效果\n<span style='color: #FF0000;'>C.法律助推个人品德养成</span>\n<span style='color: #FF0000;'>D.法律为弘扬美德提供保障</span>\n", "<span style='color: #47ceab;'>多选题：</span>坚定的核心价值观自信，是中国特色社会主义道路自信、理论自信、制度自信和文化自信的价值内核。我们之所以有坚定的核心价值观自信，是因为社会主义核心价值观具有（）。\n<span style='color: #FF0000;'>A.坚实的现实基础</span>\n<span style='color: #FF0000;'>B.强大的道义力量</span>\n<span style='color: #FF0000;'>C.丰厚的历史底蕴</span>\nD.深沉的普世价值\n", "<span style='color: #47ceab;'>多选题：</span>社会主义核心价值观是（）。\nA.整个上层建筑的核心\n<span style='color: #FF0000;'>B.凝结着全体人民共同的价值追求</span>\n<span style='color: #FF0000;'>C.当代中国精神的集中体现</span>\n<span style='color: #FF0000;'>D.体现了社会主义意识形态的本质要求</span>\n", "<span style='color: #47ceab;'>多选题：</span>社会主义道德是崭新类型的道德。与以往社会的道德形态相比，社会主义道德具有显著的先进性特征。社会主义道德的先进性主要体现在（）。\n<span style='color: #FF0000;'>A.它是对人类优秀道德资源的批判继承与创新发展</span>\n<span style='color: #FF0000;'>B.它克服了以往阶级社会道德片面性和局限性</span>\n<span style='color: #FF0000;'>C.它是社会主义经济基础的反映</span>\nD.它是调节社会一切行为规范的准则\n", "<span style='color: #47ceab;'>多选题：</span>马克思主义科学地揭示了道德的起源和本质，下列关于道德起源和本质的说法中，正确的有（）。\nA.道德是人先天具有的某种良知和善良意志\n<span style='color: #FF0000;'>B.道德产生于人类的历史发展和人们的社会实践中</span>\n<span style='color: #FF0000;'>C.道德是由社会经济基础决定的，并为社会经济基础服务</span>\n<span style='color: #FF0000;'>D.道德属于上层建筑的范畴，是一种特殊的社会意识形态</span>\n", "<span style='color: #47ceab;'>多选题：</span>在道德的功能系统中，最基本的功能是（）。\n<span style='color: #FF0000;'>A.规范功能</span>\n<span style='color: #FF0000;'>B.调节功能</span>\nC.导向功能\n<span style='color: #FF0000;'>D.认识功能</span>\n", "<span style='color: #47ceab;'>多选题：</span>人类道德的发展是一个曲折上升的历史过程，道德发展的规律为（）。\n<span style='color: #FF0000;'>A.道德发展的总趋势是向上的.前进的，是沿着曲折的道路向前发展的</span>\nB.法律义务是义务人自主实施的行为\nC.法律义务必须依法设定\nD.法律义务源于现实需要\n<span style='color: #FF0000;'>E.人类道德发展的历史过程与社会生产方式的发展进程大体一致</span>\nF.人类道德的发展在一定时期可能有某种停滞或倒退现象\nG.人类道德发展的历史过程与社会生产方式的发展进程不一致\nH.法律义务是一成不变的\n", "<span style='color: #47ceab;'>多选题：</span>公共生活中个人权利与他人权利发生冲突在所难免，比如学生宿舍里有人看书、有人休息、有人要听音乐……对解决权利冲突要有正确的认识，虽然每个人都有行使个人权利的自由，但也要尊重他人的权利。这是因为（）。\n<span style='color: #FF0000;'>A.尊重他人权利是公民权利意识的重要内容</span>\n<span style='color: #FF0000;'>B.不尊重他人权利，就有可能丧失自己的权利</span>\n<span style='color: #FF0000;'>C.权利实现的内在动力是人们彼此之间对各自权利的相互尊重</span>\n<span style='color: #FF0000;'>D.尊重他人权利既是一项法律义务，也是一项道德义务</span>\n", "<span style='color: #47ceab;'>多选题：</span>我国民法通、合同法、物权法中，都有要求民事主体在进行民事活动时应当尊重社会公德，不得损害公共利益和经济秩序的内容，已经具有“公序良俗”的含义。2017年10月1日起施行的民法总则明确规定“民事主体从事民事活动，不得违反法律，不得违背公序良俗”，从民法基本原则的高度确立了禁止违反公序良俗的原则。这一规定体现了（）。\n<span style='color: #FF0000;'>A.依法治国和以德治国的有机统一</span>\n<span style='color: #FF0000;'>B.对传统民法上的公序良俗原则的继承和发展</span>\n<span style='color: #FF0000;'>C.法律为道德建设提供制度保障</span>\n<span style='color: #FF0000;'>D.道德为法律提供价值基础</span>\n", "<span style='color: #47ceab;'>多选题：</span>我们党和国家把马克思主义作为根本指导思想，原因在于（）。\n<span style='color: #FF0000;'>A.这是近代以来中国历史发展的必然结果</span>\n<span style='color: #FF0000;'>B.这是中国人民长期探索的历史选择</span>\nC.马克思主义为中国革命和建设提供了现实的发展模式\n<span style='color: #FF0000;'>D.这是由马克思主义严密的科学体系、鲜明的阶级立场和巨大的实践指导作用决定的</span>\n", "<span style='color: #47ceab;'>多选题：</span>20世纪80年代末90年代初，东欧剧变.苏联解体，世界社会主义运动遭受重大挫折，西方某些别有用心的人预言，社会主义将在20世纪末进入历史博物馆。然而，中国特色社会主义的成功实践，使社会主义运动展现了光明的前景。由此可见，（）。\n<span style='color: #FF0000;'>A.理想的实现是一个过程</span>\n<span style='color: #FF0000;'>B.理想的实现是具有长期性.艰巨性和曲折性的</span>\n<span style='color: #FF0000;'>C.坚定的信念是实现理想的重要条件</span>\n<span style='color: #FF0000;'>D.任何一种社会政治理想都不会轻而易举地实现</span>\n", "<span style='color: #47ceab;'>多选题：</span>以下与“在艰苦中锻炼是成才的必要条件”意义相一致的格言警句有（）。\n<span style='color: #FF0000;'>A.“千淘万漉虽辛苦，吹尽狂沙始到金”</span>\nB.“人才是第一资源，人人都可成才，人才就在群众中”\n<span style='color: #FF0000;'>C.“不经历风雨怎能见彩虹”</span>\n<span style='color: #FF0000;'>D.“梅花香自苦寒来”</span>\n", "<span style='color: #47ceab;'>多选题：</span>孙中山先生曾激励广大青年：“要立志做大事，不要立志做大官。”周恩来中学时期就立下了“为中华崛起而读书”的志向；李四光.钱学森.邓稼先等老一辈知识分子，青年时期就立志用自己的聪明才智报效祖国。这些鲜活的实例给我们的教益有（）。\n<span style='color: #FF0000;'>A.社会理想是个人理想的凝聚和升华，归根到底要靠全体社会成员的共同努力来实现</span>\n<span style='color: #FF0000;'>B.个人理想只有同国家的前途.民族的命运相结合，才是有意义的</span>\n<span style='color: #FF0000;'>C.个人的向往和追求要同社会的需要和人民的利益相一致</span>\n<span style='color: #FF0000;'>D.要在实现社会理想的过程中实现个人理想</span>\n", "<span style='color: #47ceab;'>多选题：</span>1955年，钱学森冲破重重阻力，回到魂牵梦绕的祖国。当有人问他为什么回国时，他说：“我为什么要走回归祖国这条道路？我认为道理很简单——鸦片战争近百年来，国人强国梦不息，抗争不断。革命先烈为兴邦，为了炎黄子孙的强国梦，献出了宝贵的生命，血沃中华热土。我个人作为炎黄子孙的一员，只能追随先烈的足迹，在千万般艰险中，探索追求，不顾及其他，再看看共和国的缔造者和建设者们，在百废待兴的贫瘠土地上，顶住国内的贫穷，国外的封锁，经过多少个风风雨雨的春秋，让一个社会主义新中国屹立于世界东方。想到这些，还有什么个人利益不能丢弃呢？”钱学森发自肺腑的言语，对我们在新时期弘扬爱国主义精神的启示是（）。\n<span style='color: #FF0000;'>A.爱国主义是爱国情感、爱国思想和爱国行为的高度统一</span>\n<span style='color: #FF0000;'>B.爱国主义与爱社会主义具有深刻的内在一致性</span>\n<span style='color: #FF0000;'>C.个人的理想要与国家的命运、民族命运相结合</span>\n<span style='color: #FF0000;'>D.科学没有国界，但科学家有祖国</span>\n", "<span style='color: #47ceab;'>多选题：</span>中国人民在长期奋斗中培育、继承、发展起来的伟大民族精神，为中国发展和人类文明进步提供了强大的精神动力。勤劳勇敢的中国人民在长期奋斗中培育、继承、发展起来的以爱国主义为核心的伟大民族精神的主要内容有（）。\n<span style='color: #FF0000;'>A.伟大奋斗精神</span>\n<span style='color: #FF0000;'>B.伟大梦想精神</span>\n<span style='color: #FF0000;'>C.伟大团结精神</span>\n<span style='color: #FF0000;'>D.伟大创造精神</span>\n", "<span style='color: #47ceab;'>多选题：</span>以下属于中华民族精神内涵的组成部分的有（）。\n<span style='color: #FF0000;'>A.抗洪精神</span>\n<span style='color: #FF0000;'>B.长征精神</span>\n<span style='color: #FF0000;'>C.北京奥运精神</span>\n<span style='color: #FF0000;'>D.井冈山精神</span>\n", "<span style='color: #47ceab;'>多选题：</span>2013年国庆周，继去年此时央视推出《你幸福吗？》采访后，中央电视台策划节目《爱国让你想起了什么？》，走遍全国各地，采访各个阶层的人民，提出的问题都与爱国有关，包括“你对别人说过爱国吗？”“哪一种爱国方式打动过你？”“说到爱国，你会想起哪一首歌？哪一个人？”“你对爱国是怎么理解的？”等等。尽管回答不尽相同，但确实引起了人们对爱国主义内涵及相关内容的更大关注。爱国主义的基本内涵是（）。\n<span style='color: #FF0000;'>A.爱祖国的灿烂文化.爱自己的国家</span>\nB.爱社会主义\n<span style='color: #FF0000;'>C.爱祖国的大好河山</span>\n<span style='color: #FF0000;'>D.爱自己的骨肉同胞</span>\n", "<span style='color: #47ceab;'>多选题：</span>以下名言属于爱国主义优良传统的有（）。\n<span style='color: #FF0000;'>A.“位卑未敢忘忧国”</span>\n<span style='color: #FF0000;'>B.“苟利国家生死以，岂因祸福避趋之”</span>\n<span style='color: #FF0000;'>C.“先天下之忧而忧，后天下之乐而乐”</span>\n<span style='color: #FF0000;'>D.“报国之心，死而后已”</span>\n", "<span style='color: #47ceab;'>多选题：</span>习近平法治思想是全面依法治国的根本遵循和行动指南。2020年11月，习近平在中央全面依法治国工作会议上，用“十一个坚持”对全面依法治国进行了系统阐释、部署，从全面依法治国的政治方向、战略地位、工作布局、主要任务、重大关系、重要保障等方面提出了一系列新理念新观点新论断。其中关于全面依法治国政治方向的是（）。\nA.坚持统筹推进国内法治和涉外法治\n<span style='color: #FF0000;'>B.坚持以人民为中心</span>\n<span style='color: #FF0000;'>C.坚持中国特色社会主义法治道路</span>\n<span style='color: #FF0000;'>D.坚持党对全面依法治国的领导</span>\n", "<span style='color: #47ceab;'>多选题：</span>“法律是显露的道德，道德是隐藏的法律”，这句话包含的道德和法律二者之间的关系是（）。\nA.二者的调节领域.调节目标.调节方式是一致的\n<span style='color: #FF0000;'>B.道德和法律在维护社会秩序有序化的过程中是相辅相成的</span>\n<span style='color: #FF0000;'>C.道德的要求和法律的要求是统一的</span>\n<span style='color: #FF0000;'>D.法律的规定之中蕴含道德的要求，道德的要求中也包含了法律的规定</span>\n", "<span style='color: #47ceab;'>多选题：</span>人生的自我价值和社会价值既相互区别，又密切联系，共同构成了人生价值的矛盾统一体。下列有关人生的自我价值和社会价值的说法中，正确的有（）。\n<span style='color: #FF0000;'>A.社会价值的创造过程与自我价值的实现过程是统一的</span>\nB.实现自我价值是因，创造社会价值是果，不实现自我价值，就无从创造社会价值\nC.一个人社会价值的大小取决于其自我价值实现的程度\n<span style='color: #FF0000;'>D.人生的社会价值是实现人生的自我价值的基础</span>\n", "<span style='color: #47ceab;'>多选题：</span>拜金主义人生观的主要表现有（）。\n<span style='color: #FF0000;'>A.将金钱神秘化.神圣化，视金钱为圣物</span>\nB.主张人生的唯一目的和全部内容就在于满足感官的需求与快乐\n<span style='color: #FF0000;'>C.把追逐和获取金钱作为人生的目的和生活的全部意义</span>\n<span style='color: #FF0000;'>D.将金钱作为衡量人生价值的唯一标准</span>\n", "<span style='color: #47ceab;'>多选题：</span>比较客观、公正、准确地评价社会成员人生价值的大小，除了要掌握科学的标准外，还需要掌握恰当的评价方法，坚持（）。\n<span style='color: #FF0000;'>A.物质贡献与精神贡献相统一</span>\n<span style='color: #FF0000;'>B.完善自身与贡献社会相统一</span>\n<span style='color: #FF0000;'>C.能力有大小与贡献须尽力相统一</span>\nD.主观与客观相统一\n", "<span style='color: #47ceab;'>多选题：</span>俄国著名作家尼古拉·车尔尼雪夫斯基曾说：“人的活动如果没有理想的鼓舞，就会变得空虚而渺小。”这句名言说明了理想的作用在于（）。\n<span style='color: #FF0000;'>A.能够为人生提供前进的动力</span>\n<span style='color: #FF0000;'>B.能够指引人生的奋斗目标</span>\nC.它是源于人们主观意志的一种判断\n<span style='color: #FF0000;'>D.能够提升人们的精神境界</span>\n", "<span style='color: #47ceab;'>单选题：</span>集体主义的最高层次是（）。\nA.热爱祖国、诚实劳动\nB.顾全大局、遵纪守法\n<span style='color: #FF0000;'>C.无私奉献、一心为公</span>\nD.先公后私、先人后己\n", "<span style='color: #47ceab;'>单选题：</span>党的二十大报告指出，我们要坚持走中国特色社会主义法治道路、建设中国特色社会主义法治体系、建设社会主义法治国家，围绕保障和促进社会公平正义坚持依法治国、依法执政、依法行政共同推进，坚持法治国家、法治政府、法治社会一体建设，全面推进科学立法、严格执法、公正司法、全民守法，全面推进国家各个方面工作法治化，坚持全面依法治国首先要（）。\n<span style='color: #FF0000;'>A.坚持依宪治国</span>\nB.坚持依法执政\nC.坚持依法行政\nD.坚持公正司法\n", "<span style='color: #47ceab;'>单选题：</span>习近平总书记在《关于〈中共中央关于全面推进依法治国若干重大问题的决定〉的说明》中引用英国哲学家培根的一段话：“一次不公正的审判，其恶果甚至超过十次犯罪。因为犯罪虽是无视法律——好比污染了水流，而不公正的审判则毁坏法律——好比污染了水源。”这说明公正司法的重要性，公正司法是（）。\n<span style='color: #FF0000;'>A.维护社会公平正义的最后一道防线</span>\nB.社会公正的唯一标准\nC.社会公正的最终目标\nD.维护社会公平正义的决定因素\n", "<span style='color: #47ceab;'>单选题：</span>“法律不但由国家制定或认可，而且由国家保证实施”，这句话说明了法律具有（）。\nA.反映统治阶级意志的特质\nB.上层建筑的特点\n<span style='color: #FF0000;'>C.国家强制性</span>\nD.阶级性\n", "<span style='color: #47ceab;'>单选题：</span>国家司法机关及其工作人员按照法律规定的职权和程序运用法律规范处理具体案件的活动，称为（）。\nA.法律制裁\nB.法律执行\nC.法律遵守\n<span style='color: #FF0000;'>D.法律适用</span>\n", "<span style='color: #47ceab;'>单选题：</span>中华民族历来有一种为了国家、民族的整体利益而不惜牺牲自己的奉献精神，有一种对于国家、民族的使命感、责任感和忧患意识。下列古训中体现了这种精神和意识的是（）。\nA.欲当大任，须是笃实\n<span style='color: #FF0000;'>B.苟利社稷，不顾其身</span>\nC.己所不欲，勿施于人\nD.民生在勤，勤则不匮\n", "<span style='color: #47ceab;'>单选题：</span>文化软实力建设的重点是（）。\n<span style='color: #FF0000;'>A.核心价值观</span>\nB.科技\nC.教育文化\nD.思想道德\n", "<span style='color: #47ceab;'>单选题：</span>社会主义核心价值观把涉及国家、社会、公民的价值要求融为一体，体现了社会主义本质要求，继承了中华优秀传统文化，吸收了世界文明有益成果，体现了时代精神，是对我们（）。\n<span style='color: #FF0000;'>A.要建设什么样的国家、建设什么样的社会、培育什么样的公民等重大问题的深刻解答</span>\nB.要实现什么样的发展、怎样发展的重大问题的深刻解答\nC.要建设什么样的现代化、怎样实现现代化的重大问题的深刻解答\nD.要建设什么样的社会主义、怎样建设社会主义的重大问题的深刻解答\n", "<span style='color: #47ceab;'>单选题：</span>社会主义核心价值观的基本内容中，既是国家层面价值目标，也在社会主义核心价值观中居于最高层次，对其他层次的价值理念具有统领作用的是（）。\nA.爱国.敬业.诚信.友善\nB.自由.平等.公正.法治\nC.爱国.守法.明礼.诚信\n<span style='color: #FF0000;'>D.富强.民主.文明.和谐</span>\n", "<span style='color: #47ceab;'>单选题：</span>公民道德建设对提高人民思想觉悟、道德水平、文明素养，提高全社会文明程度，具有至关重要的作用。适应新时代新要求，党中央根据变化了的形势和公民道德建设的新需要，于2019年颁布了《新时代公民道德建设实施纲要》，明确强调新时代公民道德建设的着力点是（）。\nA.传承孝老爱亲、扶危济困、见义勇为等中华美德\nB.弘扬民族精神和时代精神\n<span style='color: #FF0000;'>C.推进社会公德、职业道德、家庭美德、个人品德建设</span>\nD.推动理想信念教育常态化制度化\n", "<span style='color: #47ceab;'>单选题：</span>社会主义道德建设的核心是（）。\nA.集体主义\n<span style='color: #FF0000;'>B.为人民服务</span>\nC.爱国主义\nD.社会主义荣辱观\n", "<span style='color: #47ceab;'>单选题：</span>道德具有多方面的功能。其中，通过评价等方式来指导和纠正人们的行为和实际活动，协调人们之间的关系，称为道德的（）。\nA.沟通功能\nB.教育功能\n<span style='color: #FF0000;'>C.调节功能</span>\nD.认识功能\n", "<span style='color: #47ceab;'>单选题：</span>马克思主义科学地揭示了道德的本质，认为道德是（）。\n<span style='color: #FF0000;'>A.由社会经济基础决定的特殊的社会意识形态</span>\nB.动物的合群感和社会本能的简单延续\nC.人先天具有的某种良知和善良意志\nD.由国家强制力保障实施的社会规范\n", "<span style='color: #47ceab;'>单选题：</span>道德起源的第一个历史前提是（）。\n<span style='color: #FF0000;'>A.劳动</span>\nB.人类的出现\nC.传统习俗\nD.人与人之间关系的形成\n", "<span style='color: #47ceab;'>单选题：</span>中国革命道德是指中国共产党人、人民军队、一切先进分子和人民群众在中国新民主主义革命和社会主义革命、建设与改革中所形成的优良道德。革命道德的灵魂是（）。\n<span style='color: #FF0000;'>A.坚持社会主义、共产主义理想和信念的不屈不挠的精神</span>\nB.树立社会新风，建立新型人际关系\nC.始终把革命利益放在首位\nD.全心全意为人民服务\n", "<span style='color: #47ceab;'>单选题：</span>人生目的是人在人生实践中关于自身行为的根本指向和人生追求，它所认识和回答的根本问题是（）。\n<span style='color: #FF0000;'>A.人为什么活着</span>\nB.怎样选择人生道路\nC.怎样对待人生境遇\nD.人如何对待生活\n", "<span style='color: #47ceab;'>单选题：</span>马克思说：“人只有为同时代人的完美、为他们的幸福而工作，自己才能达到完美。如果一个人只为自己劳动，他也许能够成为著名的学者、伟大的哲人、卓越的诗人，然而他永远不能成为完美的、真正伟大的人物。”这表明（）。\nA.个人价值的实现取决于他人的认可\nB.人生社会价值可以代替自我价值\nC.实现自我价值是创造社会价值的原因\n<span style='color: #FF0000;'>D.人生价值是自我价值和社会价值的统一</span>\n", "<span style='color: #47ceab;'>单选题：</span>人的本质在其现实性上，是（）。\n<span style='color: #FF0000;'>A.一切社会关系的总和</span>\nB.一切自然关系的总和\nC.单个人所固有的抽象物\nD.一切经济关系的总和\n", "<span style='color: #47ceab;'>单选题：</span>评价人生价值的根本尺度是（）。\nA.是否自食其力\nB.劳动以及通过劳动对社会和他人作出的贡献\nC.劳动和贡献的尺度\n<span style='color: #FF0000;'>D.人的实践活动是否符合社会发展的客观规律，是否促进了历史的进步</span>\n", "<span style='color: #47ceab;'>单选题：</span>人生态度属于人生观的范畴，是指（）。\nA.人生实践活动的总目标\nB.人的实践对于社会、他人和自身所具有的意义\n<span style='color: #FF0000;'>C.人们通过生活实践所形成的对人生问题的一种稳定的心理倾向和精神状态</span>\nD.人们在实践中形成的对人生目的和意义的根本看法和态度\n", "<span style='color: #47ceab;'>单选题：</span>中华传统美德是中华优秀文化的重要组成部分，其内容博大精深、源远流长。从《诗经》中的“夙夜在公”到《尚书》中的“以公灭私”，从西汉贾谊《治安策》中的“国而忘家，公而忘私”到宋代范仲淹《岳阳楼记》中的“先天下之忧而忧，后天下之乐而乐”，再到清代林则徐的“苟利国家生死以，岂因祸福避趋之”，贯穿其中的传统美德是（）。\nA.推崇“仁爱”原则，注重以和为贵\nB.强调知行合一，注重躬行实践\nC.提倡人伦价值，重视道德义务\n<span style='color: #FF0000;'>D.重视整体利益，强调责任奉献</span>\n", "<span style='color: #47ceab;'>单选题：</span>理想作为一种精神现象，是人类社会实践的产物。理想源于现实，又超越现实，在现实中有多种类型。从层次上划分，理想有（）。\nA.生活理想和职业理想\nB.个人理想和社会理想\n<span style='color: #FF0000;'>C.崇高理想和一般理想</span>\nD.道德理想和政治理想\n", "<span style='color: #47ceab;'>单选题：</span>“行百里者半九十，此言末路之难也。”这句话体现了（）。\nA.立志当高远\nB.理想的实现是一个过程\nC.立志做大事\n<span style='color: #FF0000;'>D.理想的实现越到最后就越困难，要实现理想，必须有战胜种种艰难险阻的信心和坚韧不拔的毅力</span>\n", "<span style='color: #47ceab;'>单选题：</span>我们要大力弘扬的时代精神是当代中国人民精神风貌的集中体现，是激发社会创造活力的强大力量。时代精神的内涵十分丰富，其核心是（）。\nA.国际主义\n<span style='color: #FF0000;'>B.改革创新</span>\nC.集体主义\nD.开拓进取\n", "<span style='color: #47ceab;'>单选题：</span>调节个人与祖国之间关系的道德要求、政治原则和法律规范是（）。\n<span style='color: #FF0000;'>A.爱国主义</span>\nB.锤炼个人品德\nC.正确的人生观\nD.社会主义核心价值体系\n", "<span style='color: #47ceab;'>单选题：</span>马克思说：“在选择职业时，我们应该遵循的主要指针是人类的幸福和我们自身的完美。”在这里，马克思所说的以“我们自身的完美”为主要指针，就是追求我们自身的人格高尚、才智发展、生活幸福，这是()。\n<span style='color: #FF0000;'>A.人生的自我价值</span>\nB.人生的现实境遇\nC.人生的存在状态\nD.人生的社会价值\n", "<span style='color: #47ceab;'>单选题：</span>习近平在欧美同学会成立100周年庆祝大会上的讲话中说：“希望广大留学人员继承和发扬留学报国的光荣传统，做爱国主义的坚守者和传播者，秉持‘先天下之忧而忧，后天下之乐而乐’的人生理想，始终把国家富强、民族振兴、人民幸福作为努力志向，自觉使个人成功的果实结在爱国主义这棵常青树上。”个人成功的果实之所以应该结在爱国主义这棵常青树上，是因为爱国主义是()。\nA.个人成功的根本保障\nB.个人成功的决定性因素\n<span style='color: #FF0000;'>C.个人实现人生价值的力量源泉</span>\nD.个人实现人生价值的直接条件\n", "<span style='color: #47ceab;'>单选题：</span>社会主义道德的核心是()。\nA.爱国主义\nB.共产主义\nC.集体主义\n<span style='color: #FF0000;'>D.为人民服务</span>\n", "<span style='color: #47ceab;'>单选题：</span>社会主义核心价值观的根本特性是()。\n<span style='color: #FF0000;'>A.人民性</span>\nB.普适性\nC.真实性\nD.先进性\n", "<span style='color: #47ceab;'>单选题：</span>“学如弓弩,才如箭镞,识以领之,方能中鹄。”这句话告诉我们要()。\nA.有理想\nB.有担当\n<span style='color: #FF0000;'>C.有本领</span>\nD.有责任\n", "<span style='color: #47ceab;'>单选题：</span>()是指道德通过评价等方式,指导和纠正人们的行为和实践活动,协调社会关系和人际关系的功效与能力。\nA.道德的规范功能\nB.道德的导向功能\n<span style='color: #FF0000;'>C.道德的调节功能</span>\nD.道德的认识功能\n", "<span style='color: #47ceab;'>单选题：</span>“人生的扣子从一开始就要扣好。”习总书记朴素又生动的比喻,蕴涵着丰富的人生哲理,深刻揭示了()\n<span style='color: #FF0000;'>A.青年处在价值观形成和确立的关键时刻,价值观教育要抓早抓实的重要性</span>\nB.核心价值观的养成绝非一日之功,要坚持由易到难由近及远\nC.青年人要善于明辨是非,扎扎实实干事踏踏实实做人\nD.加强青少年道德修养,必须要注重道德实践\n", "<span style='color: #47ceab;'>单选题：</span>人在现实生活中不可避免地会遇到各种各样的问题，引发对人生的思考，这种思考最后集中到“人为什么活着”“人应该怎样活着”等根本问题。对这些根本问题的回答，体现了一个人的()。\nA.世界观\nB.道德观\nC.价值观\n<span style='color: #FF0000;'>D.人生观</span>\n", "<span style='color: #47ceab;'>单选题：</span>迄今我国现行宪法历经()次修订。\nA.4\nB.2\n<span style='color: #FF0000;'>C.5</span>\nD.3\n", "<span style='color: #47ceab;'>单选题：</span>人是社会的人，每一个人都存在和活动于具体的、基于特定历史的现实社会当中。个人与社会是对立统一的关系，两者相互依存、相互制约、相互促进。个人与社会的关系最根本的是()。\n<span style='color: #FF0000;'>A.个人利益与社会利益</span>\nB.个人存在与社会存在\nC.个人价值与社会价值\nD.个人理想与社会理想\n", "<span style='color: #47ceab;'>单选题：</span>“哲学家们只是用不同的方式解释世界，而问题在于改变世界”。这鲜明地表明了马克思主义的基本特征是()。\nA.以认识世界为己任\nB.科学性\nC.具有持久的生命力\n<span style='color: #FF0000;'>D.重视实践.以改造世界为己任</span>\n", "<span style='color: #47ceab;'>单选题：</span>()创造了人和人类社会,是人类道德起源的第一个历史前提。\n<span style='color: #FF0000;'>A.劳动</span>\nB.自然\nC.合作\nD.宗教\n", "<span style='color: #47ceab;'>单选题：</span>信念是认知.情感和意志的有机统一体，是人们在一定的认识基础上确立的对某种思想或事物坚定不移并身体力行的心理态度和精神状态。信念是人们追求理想目标的强大动力，决定事业的成败。信念有不同的层次和类型，其中()。\n<span style='color: #FF0000;'>A.高层次的信念决定低层次的信念</span>\nB.低层次的信念代表了一个人的基本信仰\nC.各种信念没有科学与非科学之分\nD.相同社会环境中生活的人们的信念始终一致\n", "<span style='color: #47ceab;'>单选题：</span>经济全球化是当今时代发展的重要趋势，在这一趋势下，人们对如何处理爱国主义与参与经济全球化的关系，形成了许多不同的观点，下列观点中正确的是()。\nA.爱国主义已经过时\nB.民族国家的界限已经不太明显\nC.不要过分强调自己的主权和利益\n<span style='color: #FF0000;'>D.仍需把国家的主权和安全放在第一位</span>\n", "<span style='color: #47ceab;'>单选题：</span>民族精神和时代精神是社会主义核心价值体系的精髓。民族精神的核心是()。\nA.集体主义\nB.团结统一\n<span style='color: #FF0000;'>C.爱国主义</span>\nD.为人民服务\n", "<span style='color: #47ceab;'>单选题：</span>社会主义核心价值观把涉及国家.社会.公民的价值要求融为一体，体现了社会主义本质要求，继承了中华优秀传统文化，吸收了世界文明有益成果，体现了时代精神，是对我们()。\n<span style='color: #FF0000;'>A.要建设什么样的国家.建设什么样的社会.培育什么样的公民等重大问题的深刻解答</span>\nB.要建设什么样的社会主义.怎样建设社会主义的重大问题的深刻解答\nC.要建设什么样的现代化.怎样实现现代化的重大问题的深刻解答\nD.要实现什么样的发展.怎样发展的重大问题的深刻解答\n", "<span style='color: #47ceab;'>单选题：</span>中华传统美德是中华优秀文化的重要组成部分，其内容博大精深.源远流长。从《诗经》中的“夙夜在公”到《尚书》中的“以公灭私”，从西汉贾谊《治安策》中的“国而忘家，公而忘私”到宋代范仲淹《岳阳楼记》中的“先天下之忧而忧，后天下之乐而乐”，再到清代林则徐的“苟利国家生死以，岂因祸福避趋之”，贯穿其中的传统美德是()。\nA.强调知行合一，注重躬行实践\nB.提倡人伦价值，重视道德义务\nC.推崇“仁爱”原则，注重以和为贵\n<span style='color: #FF0000;'>D.重视整体利益，强调责任奉献</span>\n", "<span style='color: #47ceab;'>单选题：</span>发扬自强不息、敢为人先、百折不挠、坚忍不拔的精神，始终保持蓬勃朝气.昂扬锐气，充分发挥生命的创造力，体现的人生态度是()。\nA.人生应乐观\n<span style='color: #FF0000;'>B.人生要进取</span>\nC.人生须认真\nD.人生当务实\n", "<span style='color: #47ceab;'>单选题：</span>个人理想要符合社会理想,下列选项中,表达准确的有()\n<span style='color: #FF0000;'>A.当两者有冲突时,个人理想要服从于全社会的共同理想</span>\nB.改革创新\nC.个人理想的总和就是社会理想,各人追求个人理想就可以实现社会理想\nD.开拓进取\nE.个人理想是无关紧要的\nF.个人理想与社会理想是完全一致的\nG.集体主义\nH.国际主义\n", "<span style='color: #47ceab;'>单选题：</span>马克思主义科学地揭示了道德的本质，认为道德是()。\n<span style='color: #FF0000;'>A.由社会经济基础决定的特殊的社会意识形态</span>\nB.人先天具有的某种良知和善良意志\nC.动物的合群感和社会本能的简单延续\nD.由国家强制力保障实施的社会规范\n", "<span style='color: #47ceab;'>单选题：</span>()构成了习近平法治思想的主要内容。\nA.八个明确\nB.四个全面\nC.十四个坚持\n<span style='color: #FF0000;'>D.十一个坚持</span>\n", "<span style='color: #47ceab;'>多选题：</span>政治权利是公民参与国家政治活动的权利和自由的统称。具体包括()。\n<span style='color: #FF0000;'>A.表达权</span>\n<span style='color: #FF0000;'>B.民主管理权</span>\n<span style='color: #FF0000;'>C.监督权</span>\n<span style='color: #FF0000;'>D.选举权</span>\n", "<span style='color: #47ceab;'>多选题：</span>人类社会发展的历史表明，对一个民族、一个国家来说，最持久、最深层次的力量是全社会共同认可的核心价值观。面对世界范围思想文化交流交融交锋形势下价值观较量的新态势，面对改革开放和发展社会主义市场经济条件下思想意识多元多样多变的新特点，积极培育和践行社会主义核心价值观，有利于()。\n<span style='color: #FF0000;'>A.集聚实现中华民族伟大复兴中国梦的强大正能量</span>\n<span style='color: #FF0000;'>B.巩固马克思主义在意识形态领域的指导地位</span>\n<span style='color: #FF0000;'>C.巩固全党全国人民团结奋斗的共同思想基础</span>\n<span style='color: #FF0000;'>D.促进人的全面发展和引领社会全面进步</span>\n", "<span style='color: #47ceab;'>多选题：</span>社会公共生活的主要特征有()。\n<span style='color: #FF0000;'>A.交往对象的复杂性</span>\n<span style='color: #FF0000;'>B.活动方式的多样性</span>\n<span style='color: #FF0000;'>C.活动内容的开放性</span>\n<span style='color: #FF0000;'>D.活动范围的广泛性</span>\n", "<span style='color: #47ceab;'>多选题：</span>习近平法治思想是经过长期发展而形成的内涵丰富、论述深刻、逻辑严密、系统完备的法治理论体系,它()。\n<span style='color: #FF0000;'>A.回答了新时代为什么实行全面依法治国.怎样实行全面依法治国等一系列重大问题</span>\n<span style='color: #FF0000;'>B.是马克思主义法治理论中国化最新成果</span>\n<span style='color: #FF0000;'>C.是顺应实现中华民族伟大复兴时代要求应运而生的重大理论创新成果</span>\n<span style='color: #FF0000;'>D.是习近平新时代中国特色社会主义思想的重要组成部分</span>\n", "<span style='color: #47ceab;'>多选题：</span>关于法律权利下列说法正确的是（）\n<span style='color: #FF0000;'>A.法律权利必须依法行使，不能不择手段地行使法律权利</span>\n<span style='color: #FF0000;'>B.法律权利的内容、分配和实现方式因社会制度和国家法律的不同而存在差异</span>\n<span style='color: #FF0000;'>C.法律权利的内容、种类和实现程度受社会物质生活条件的制约</span>\n<span style='color: #FF0000;'>D.法律权利不仅由法律规定或认可，而且受法律维护或保障，具有不可侵犯性</span>\n", "<span style='color: #47ceab;'>多选题：</span>中国特色社会主义制度是当代中国发展进步的根本制度保障,是具有()的先进制度。\n<span style='color: #FF0000;'>A.强大自我完善能力</span>\nB.充满生机活力\n<span style='color: #FF0000;'>C.鲜明中国特色</span>\n<span style='color: #FF0000;'>D.明显制度优势</span>\n", "<span style='color: #47ceab;'>多选题：</span>全面依法治国的基本要求包括()。\n<span style='color: #FF0000;'>A.公正司法</span>\n<span style='color: #FF0000;'>B.科学立法</span>\n<span style='color: #FF0000;'>C.严格执法</span>\n<span style='color: #FF0000;'>D.全民守法</span>\n", "<span style='color: #47ceab;'>多选题：</span>1955年，钱学森冲破重重阻力，回到魂牵梦绕的祖国。当有人问他为什么回国时，他说：“我为什么要走回归祖国这条道路？我认为道理很简单——鸦片战争近百年来，国人强国梦不息，抗争不断。革命先烈为兴邦，为了炎黄子孙的强国梦，献出了宝贵的生命，血沃中华热土。我个人作为炎黄子孙的一员，只能追随先烈的足迹，在千万般艰险中，探索追求，不顾及其他，再看看共和国的缔造者和建设者们，在百废待兴的贫瘠土地上，顶住国内的贫穷，国外的封锁，经过多少个风风雨雨的春秋，让一个社会主义新中国屹立于世界东方。想到这些，还有什么个人利益不能丢弃呢？”钱学森发自肺腑的言语，对我们在新时期弘扬爱国主义精神的启示是()。\n<span style='color: #FF0000;'>A.爱国主义与爱社会主义具有深刻的内在一致性</span>\n<span style='color: #FF0000;'>B.个人的理想要与国家的命运.民族命运相结合</span>\n<span style='color: #FF0000;'>C.爱国主义是爱国情感.爱国思想和爱国行为的高度统一</span>\n<span style='color: #FF0000;'>D.科学没有国界，但科学家有祖国</span>\n", "<span style='color: #47ceab;'>多选题：</span>社会主义核心价值观以其()而居于人类社会的价值制高点。\n<span style='color: #FF0000;'>A.先进性</span>\nB.纯洁性\n<span style='color: #FF0000;'>C.真实性</span>\n<span style='color: #FF0000;'>D.人民性</span>\n", "<span style='color: #47ceab;'>多选题：</span>大学生需要对新时代有深入的了解和真切的感悟,这个新时代具体是()。\n<span style='color: #FF0000;'>A.是全体中华儿女勠力同心、奋力实现中华民族伟大复兴中国梦的时代</span>\n<span style='color: #FF0000;'>B.是我国日益走近世界舞台中央、不断为人类做出更大贡献的时代</span>\n<span style='color: #FF0000;'>C.是承前启后、继往开来、在新的历史条件下继续夺取中国特色社会主义伟大胜利的时代</span>\n<span style='color: #FF0000;'>D.是决胜全面建成小康社会、进而全面建设社会主义现代化强国的时代</span>\n<span style='color: #FF0000;'>E.是全国各族人民团结奋斗、不断创造美好生活、逐步实现全体人民共同富裕的时代</span>\n", "<span style='color: #47ceab;'>多选题：</span>个人主义人生观、拜金主义人生观和享乐主义人生观的共同特征有()。\n<span style='color: #FF0000;'>A.它们对人的需要的理解是片面的</span>\nB.都是资产阶级人生观的核心\n<span style='color: #FF0000;'>C.它们都没有正确把握个人与社会的辩证关系</span>\n<span style='color: #FF0000;'>D.忽视或否认社会性是人的存在和活动的本质属性</span>\n", "<span style='color: #47ceab;'>多选题：</span>关于法治思维下列说法正确的是（）\n<span style='color: #FF0000;'>A.是一种规范性思维</span>\n<span style='color: #FF0000;'>B.是一种正当性思维</span>\n<span style='color: #FF0000;'>C.是一种符合规律、尊重事实的科学思维</span>\n<span style='color: #FF0000;'>D.是一种可靠的逻辑思维</span>\n", "<span style='color: #47ceab;'>多选题：</span>新时期的爱国主义是历史上最高类型的爱国主义。与以往的爱国主义相比，它必然带有一些自己的时代特征，表现为()。\n<span style='color: #FF0000;'>A.爱国主义与弘扬民族精神的统一</span>\nB.爱国主义与拥护中国共产党领导的统一\n<span style='color: #FF0000;'>C.爱国主义与弘扬时代精神的统一</span>\n<span style='color: #FF0000;'>D.爱国主义与爱社会主义的统一</span>\n", "<span style='color: #47ceab;'>多选题：</span>恋爱.婚姻.家庭是人类同一序列社会生活的三个阶段，恋爱行为是对社会负有相应道德责任的行为，下列选项中，符合恋爱中基本道德要求的有()。A.尊重对方的情感和人格\nA.追求高尚的情趣和健康的交往方式\n<span style='color: #FF0000;'>B.彼此真实真诚，自愿为对方承担责任</span>\n<span style='color: #FF0000;'>C.注重过程，不以婚姻为目的</span>\n", "<span style='color: #47ceab;'>多选题：</span>“禾苗离土即死，国家无土难存”这句话表明()。\nA.爱自己的骨肉同胞，最主要的是培养对人民群众的深厚感情\n<span style='color: #FF0000;'>B.祖国的大好河山是主权.财富.民族发展和进步的基本载体</span>\n<span style='color: #FF0000;'>C.爱国首先要热爱祖国的大好河山</span>\n<span style='color: #FF0000;'>D.“保我国土”“爱我家乡”是每个公民的责任和义务</span>\n", "<span style='color: #47ceab;'>多选题：</span>法律是否具有权威，取决于（）等基本要素。\n<span style='color: #FF0000;'>A.法律被社会成员尊崇或信仰的程度</span>\n<span style='color: #FF0000;'>B.法律在国家和社会治理体系中的地位和作用</span>\n<span style='color: #FF0000;'>C.法律在实践中的实施程度</span>\n<span style='color: #FF0000;'>D.法律本身的科学程度</span>\n", "<span style='color: #47ceab;'>多选题：</span>人生目的是人生观的核心，其重要作用有()。\n<span style='color: #FF0000;'>A.决定人生态度</span>\nB.决定世界观\n<span style='color: #FF0000;'>C.决定人生道路</span>\n<span style='color: #FF0000;'>D.决定人生价值选择</span>\n", "<span style='color: #47ceab;'>多选题：</span>“一种价值观要真正发挥作用,必须融入社会生活,让人们在实践中感知它.领悟它。”大学生要切实做到(),使社会主义核心价值观成为一言一行的基本遵循。\n<span style='color: #FF0000;'>A.笃实</span>\n<span style='color: #FF0000;'>B.勤学</span>\n<span style='color: #FF0000;'>C.明辨</span>\n<span style='color: #FF0000;'>D.修德</span>\n", "<span style='color: #47ceab;'>多选题：</span>大学生应当树立的正确创业观包括()。\n<span style='color: #FF0000;'>A.要有积极创业的思想准备</span>\n<span style='color: #FF0000;'>B.要提高创业的能力</span>\nC.要有雄厚的学历背景\n<span style='color: #FF0000;'>D.要有敢于创业的勇气</span>\n", "<span style='color: #47ceab;'>多选题：</span>拜金主义人生观的主要表现有()。\n<span style='color: #FF0000;'>A.把追逐和获取金钱作为人生的目的和生活的全部意义</span>\n<span style='color: #FF0000;'>B.将金钱神秘化.神圣化，视金钱为圣物</span>\nC.主张人生的唯一目的和全部内容就在于满足感官的需求与快乐\n<span style='color: #FF0000;'>D.将金钱作为衡量人生价值的唯一标准</span>\n", "<span style='color: #47ceab;'>多选题：</span>历史和现实都告诉我们,只有()。\nA.社会主义才能发展中国\n<span style='color: #FF0000;'>B.中国特色社会主义才能发展中国</span>\n<span style='color: #FF0000;'>C.社会主义才能救中国</span>\nD.中国特色社会主义才能救中国\n", "<span style='color: #47ceab;'>多选题：</span>20世纪80年代末90年代初，东欧剧变、苏联解体，世界社会主义运动遭受重大挫折，西方某些别有用心的人预言，社会主义将在20世纪末进入历史博物馆。然而，中国特色社会主义的成功实践，使社会主义运动展现了光明的前景。由此可见，()。\n<span style='color: #FF0000;'>A.任何一种社会政治理想都不会轻而易举地实现</span>\n<span style='color: #FF0000;'>B.理想的实现是具有长期性.艰巨性和曲折性的</span>\n<span style='color: #FF0000;'>C.理想的实现是一个过程</span>\n<span style='color: #FF0000;'>D.坚定的信念是实现理想的重要条件</span>\n", "<span style='color: #47ceab;'>多选题：</span>我国宪法的基本原则()。\n<span style='color: #FF0000;'>A.党的领导原则</span>\n<span style='color: #FF0000;'>B.民主集中制原则</span>\n<span style='color: #FF0000;'>C.人民当家作主原则</span>\n<span style='color: #FF0000;'>D.尊重和保障人权原则</span>\n<span style='color: #FF0000;'>E.社会主义法治原则</span>\n", "<span style='color: #47ceab;'>多选题：</span>俄国著名作家尼古拉·车尔尼雪夫斯基曾说：“人的活动如果没有理想的鼓舞，就会变得空虚而渺小。”这句名言说明了理想的作用在于()。\n<span style='color: #FF0000;'>A.能够提升人们的精神境界</span>\nB.它是源于人们主观意志的一种判断\n<span style='color: #FF0000;'>C.能够为人生提供前进的动力</span>\n<span style='color: #FF0000;'>D.能够指引人生的奋斗目标</span>\n", "<span style='color: #47ceab;'>多选题：</span>道德调节所赖以发挥作用的力量是()。\n<span style='color: #FF0000;'>A.人们的内心信念</span>\n<span style='color: #FF0000;'>B.社会舆论</span>\nC.社会实践\n<span style='color: #FF0000;'>D.传统习惯</span>\n", "<span style='color: #47ceab;'>多选题：</span>中国人民在长期奋斗中培育、继承、发展起来的伟大民族精神，为中国发展和人类文明进步提供了强大的精神动力。勤劳勇敢的中国人民在长期奋斗中培育、继承、发展起来的以爱国主义为核心的伟大民族精神的主要内容有()。\n<span style='color: #FF0000;'>A.伟大梦想精神</span>\n<span style='color: #FF0000;'>B.伟大奋斗精神</span>\n<span style='color: #FF0000;'>C.伟大团结精神</span>\n<span style='color: #FF0000;'>D.伟大创造精神</span>\n", "<span style='color: #47ceab;'>多选题：</span>作为调节人们思想行为、协调人际关系、维护社会秩序的两种重要手段的思想道德与法律，二者的不同点主要体现在()。\n<span style='color: #FF0000;'>A.调节领域</span>\n<span style='color: #FF0000;'>B.调节目标</span>\n<span style='color: #FF0000;'>C.调节方式</span>\nD.理论基础\n", "<span style='color: #47ceab;'>多选题：</span>中国共产党自诞生之日起,就把()作为自己的初心和使命,并团结带领全国各族人民不懈奋斗,战胜各种艰难险阻,不断取得革命、建设、改革的伟大胜利。\n<span style='color: #FF0000;'>A.为中国人民谋幸福</span>\n<span style='color: #FF0000;'>B.为中华民族谋复兴</span>\nC.全心全意为人民服务\nD.实现中华民族伟大复兴的中国梦\n", "<span style='color: #47ceab;'>多选题：</span>马克思主义科学地揭示了道德的起源和本质，下列关于道德起源和本质的说法中，正确的有()。\n<span style='color: #FF0000;'>A.道德属于上层建筑的范畴，是一种特殊的社会意识形态</span>\nB.道德是人先天具有的某种良知和善良意志\n<span style='color: #FF0000;'>C.道德是由社会经济基础决定的，并为社会经济基础服务</span>\n<span style='color: #FF0000;'>D.道德产生于人类的历史发展和人们的社会实践中</span>\n", "<span style='color: #47ceab;'>单选题：</span>（）是我们党执政的最深厚的基础和最大底气。\nA.发展\nB.共同富裕\n<span style='color: #FF0000;'>C.人民</span>\nD.制度\n", "<span style='color: #47ceab;'>单选题：</span>2020年11月，习近平在中央全面依法治国工作会议上的重要讲话中，用（）对全面依法治国进行系统阐释、部署。\nA.十个新突破\nB.十一个创新\n<span style='color: #FF0000;'>C.十一个坚持</span>\nD.十个治国理念\n", "<span style='color: #47ceab;'>单选题：</span>美国兰德公司曾跟踪500家世界大公司，发现它们有一个共同的特点，即始终坚持四种价值观：人的价值高于物的价值，共同价值高于个人价值，社会价值高于利润价值，用户价值高于生产价值。这四种价值观都属于正确的价值观。判断一种价值观是否正确的标准，是看它是否：（）\nA.反映了社会存在\nB.能促进经济的发展\n<span style='color: #FF0000;'>C.符合事物发展规律和人类根本利益</span>\nD.反映了事物发展的客观联系\n", "<span style='color: #47ceab;'>单选题：</span>大学生要学会对自己负责，对亲人负责，对周围的人和更多的人负责，进而对民族、国家、社会负责，做一个有价值、负责任的人。这里说的是（）\nA.人生当务实\nB.人生应乐观\nC.人生要进取\n<span style='color: #FF0000;'>D.人生须认真</span>\n", "<span style='color: #47ceab;'>单选题：</span>人生价值是自我价值和社会价值的统一。人生的社会价值主要表现为()\nA.社会对个人的尊重和满足\nB.个人的社会存在\n<span style='color: #FF0000;'>C.个人通过劳动和创造，对社会所作的贡献</span>\nD.个人对自己生命存在的肯定\n", "<span style='color: #47ceab;'>单选题：</span>党的十八大以来，在奋进新时代的伟大实践中，习近平为核心的党中央团结带领全国各族人民，实现了第一个百年奋斗目标，在中华大地上（），历史性地解决了绝对贫困问题。\nA.全面建成现代化国家\nB.全面完成脱贫攻坚\nC.全面实现共同富裕\n<span style='color: #FF0000;'>D.全面建成小康社会</span>\n", "<span style='color: #47ceab;'>单选题：</span>国家安全的基础是（）\n<span style='color: #FF0000;'>A.经济安全</span>\nB.政治安全\nC.国防安全\nD.科技安全\n", "<span style='color: #47ceab;'>单选题：</span>一位哲学家说，青春是一种时限货币。当一个人尽情享受这种货币带来的欢乐时，就意味着青春逝去之时，他就沦为了乞丐。这句话蕴涵的哲理是（）\nA.享乐主义人生价值观把个人欢乐建立在别人的痛苦之上\nB.享乐主义人生观是社会存在的反映\nC.及时享乐是享乐主义人生价值观的本质\n<span style='color: #FF0000;'>D.享乐主义人生价值观把追求享受当成人生最大乐趣，对人们具有极大危害</span>\n", "<span style='color: #47ceab;'>单选题：</span>有人说：“圣人是肯做工夫的庸人，庸人是不肯做工夫的圣人。”这句话表达的做人做事要（）\nA.修德\n<span style='color: #FF0000;'>B.笃实</span>\nC.爱国\nD.诚信\n", "<span style='color: #47ceab;'>单选题：</span>历史上许多先进分子没有从社会上得到很好的尊重和满足，可他们最大限度地实现了自己的人生价值。这说明，人生价值的本质是()\nA.个人的社会性需要的满足\nB.社会对个人的尊重和满足\n<span style='color: #FF0000;'>C.个人对社会的责任和贡献</span>\nD.个人在社会关系中的存在\n", "<span style='color: #47ceab;'>单选题：</span>中华民族的民族精神和时代精神构成了（）\nA.民族素质\n<span style='color: #FF0000;'>B.中国精神</span>\nC.爱国主义\nD.共同理想\n", "<span style='color: #47ceab;'>单选题：</span>《礼记•中庸》中提到：“道也者，不可须臾离也，可离非道也。是故君子戒慎乎其所不睹，恐惧乎其所不闻。莫见乎隐，莫显乎微。”这里的核心思想指的是道德修养方法的（）\nA.省察克治\nB.积善成德\nC.学思并重\n<span style='color: #FF0000;'>D.慎独自律</span>\n", "<span style='color: #47ceab;'>单选题：</span>（）是人类社会进步的标尺，是社会主义制度的本质要求。\nA.敬业\nB.友善\n<span style='color: #FF0000;'>C.公正</span>\nD.爱国\n", "<span style='color: #47ceab;'>单选题：</span>有的人身处逆境而百折不挠，有的人在顺境中却长吁短叹，有的人笑对人生，有的人看破红尘,，这些都是()的表现。\nA.人生理想\nB.人生目的\nC.人生信念\n<span style='color: #FF0000;'>D.人生态度</span>\n", "<span style='color: #47ceab;'>单选题：</span>俗话说：“三百六十行，行行出状元”。上述俗话主要说明（）\n<span style='color: #FF0000;'>A.人生的价值终究要通过自己所从事的事业展现出来</span>\nB.要正确对待学习和工作中的成功和失败\nC.要正确处理个人活动和社会发展的关系\nD.人的创造力的形成和培养需要一定的社会条件\n", "<span style='color: #47ceab;'>单选题：</span>家庭是社会的基本细胞，是人生的第一所学校。不论时代发生多大变化，生活格局发生多大变化，都要重视家庭建设，注重家庭、家教、家风。家庭教育涉及很多方面，其中最重要的是（）\nA.情商培育\nB.心理健康\nC.智力开发\n<span style='color: #FF0000;'>D.品德教育</span>\n", "<span style='color: #47ceab;'>单选题：</span>关于恋爱中的道德规范，下列说法有失偏颇的是（）\n<span style='color: #FF0000;'>A.财务点滴独立</span>\nB.文明相亲相爱\nC.自觉承担责任\nD.尊重人格平等\n", "<span style='color: #47ceab;'>单选题：</span>（）是最高层次的信念，具有最大的统摄力。\nA.意志\n<span style='color: #FF0000;'>B.信仰</span>\nC.志向\nD.理想\n", "<span style='color: #47ceab;'>单选题：</span>时代精神是在新的历史条件下形成和发展的，是体现民族特质、顺应时代潮流的思想观念、行为方式、价值取向、精神风貌和社会风尚的总和。时代精神的核心在于（）\nA.与时俱进\n<span style='color: #FF0000;'>B.改革创新</span>\nC.实事求是\nD.艰苦奋斗\n", "<span style='color: #47ceab;'>单选题：</span>实施创新驱动发展战略，最根本的是（）\n<span style='color: #FF0000;'>A.要增强自主创新能力</span>\nB.要打通从科技到产业、经济各个通道\nC.要解放和激发科技作为第一生产力的巨大潜力\nD.要破除体制机制障碍\n", "<span style='color: #47ceab;'>单选题：</span>人类在脱离动物状态而转变为人的过程中，()发挥了决定性作用。\nA.工具\n<span style='color: #FF0000;'>B.劳动</span>\nC.实践\nD.文字\n", "<span style='color: #47ceab;'>单选题：</span>法律和道德是维护社会秩序的两种基本手段，下列关于二者关系的说法中，正确的是（）\nA.法律的调节更具有广泛性，能够渗透到道德不能调节的领域\nB.法律是道德形成的基础，能够为道德规范的制定提供依据\nC.凡是道德所反对和谴责的行为，必定是法律所制裁的行为\n<span style='color: #FF0000;'>D.凡是法律所禁止和制裁的行为，通常也是道德所反对和谴责的行为</span>\n", "<span style='color: #47ceab;'>单选题：</span>马克思主义体现了（）的统一。\n<span style='color: #FF0000;'>A.科学性和革命性</span>\nB.理论性与战斗性\nC.逻辑性与革命性\nD.阶级性与实践性\n", "<span style='color: #47ceab;'>单选题：</span>走中国特色社会主义法治道路，是由我国社会主义（）所决定的。\nA.社会制度\n<span style='color: #FF0000;'>B.国家性质</span>\nC.人民主体地位\nD.经济制度\n", "<span style='color: #47ceab;'>单选题：</span>中华法系形成于（）\nA.汉朝\nB.唐朝\nC.新中国\n<span style='color: #FF0000;'>D.秦朝</span>\n", "<span style='color: #47ceab;'>单选题：</span>在现实生活中，社会公德、职业道德和家庭美德的状况，最终都是以每个社会成员的道德品质为基础。个人品德是通过社会道德教育和个人自觉的道德修养所形成的（）心理状态和行为习惯。\nA.一定的\n<span style='color: #FF0000;'>B.稳定的</span>\nC.一般的\nD.特殊的\n", "<span style='color: #47ceab;'>单选题：</span>21世纪，科技问题将越来越突出。核心问题是科学技术进步应服务于全人类、服务于世界和平、发展与进步的崇高事业，而不能危害人类自身。这就要求广大科技工作者（）\n<span style='color: #FF0000;'>A.要树立和坚持符合人类根本利益的价值观</span>\nB.要从实际出发，实事求是\nC.要坚持理论与实践的有机统一\nD.要注意培养科学思维方法\n", "<span style='color: #47ceab;'>单选题：</span>我国宪法是根本法，是（）的集中体现。\nA.中华民族团结\nB.中国政治体制\n<span style='color: #FF0000;'>C.党和人民意志</span>\nD.国家根本制度\n", "<span style='color: #47ceab;'>单选题：</span>（）是衡量一个人精神境界高下的重要标尺。\n<span style='color: #FF0000;'>A.理想信念</span>\nB.政治信仰\nC.修养品性\nD.道德品质\n", "<span style='color: #47ceab;'>单选题：</span>（）是当今国际竞争新优势的集中体现。\n<span style='color: #FF0000;'>A.创新能力</span>\nB.社会变革\nC.民族复兴\nD.经济发展\n", "<span style='color: #47ceab;'>多选题：</span>大学生要深刻认识提高职业道德素质的重要性，注重（）方面的修养和锻炼\n<span style='color: #FF0000;'>A.学习职业道德规范</span>\n<span style='color: #FF0000;'>B.提高职业道德意识</span>\nC.注重社会公德\n<span style='color: #FF0000;'>D.提高践行职业道德的能力</span>\n", "<span style='color: #47ceab;'>多选题：</span>“思想道德与法治”课程是针对大学生成长过程中面临的思想道德与法治问题，开展马克思主义的（）教育。\n<span style='color: #FF0000;'>A.法治观</span>\n<span style='color: #FF0000;'>B.道德观</span>\n<span style='color: #FF0000;'>C.价值观</span>\n<span style='color: #FF0000;'>D.人生观</span>\n", "<span style='color: #47ceab;'>多选题：</span>司法机关是指（）\n<span style='color: #FF0000;'>A.检察机关</span>\nB.公安局\nC.人民政府\n<span style='color: #FF0000;'>D.审判机关</span>\n", "<span style='color: #47ceab;'>多选题：</span>集体主义可分为以下哪几个层次的道德要求？()\n<span style='color: #FF0000;'>A.顾全大局、遵纪守法、热爱祖国、诚实劳动</span>\n<span style='color: #FF0000;'>B.无私奉献、一心为公</span>\n<span style='color: #FF0000;'>C.先公后私、先人后已</span>\nD.办事公道、热情服务\n", "<span style='color: #47ceab;'>多选题：</span>家庭是社会的基本细胞，是人生的第一所学校。每个人在弘扬家庭都应注意（）\n<span style='color: #FF0000;'>A.认识家庭美德的重要性</span>\n<span style='color: #FF0000;'>B.遵守婚姻家庭法律规范</span>\nC.促进社会和谐\n<span style='color: #FF0000;'>D.营造良好家风</span>\n", "<span style='color: #47ceab;'>多选题：</span>实践证明，马克思主义只要（），就能焕发出强大的生命力、创造力和感召力。\nA.与未来发展相契合\n<span style='color: #FF0000;'>B.与本国国情相结合</span>\n<span style='color: #FF0000;'>C.与人民群众共命运</span>\n<span style='color: #FF0000;'>D.与时代发展同进步</span>\n", "<span style='color: #47ceab;'>多选题：</span>我国公民的政治权利主要包括（）\n<span style='color: #FF0000;'>A.监督权</span>\n<span style='color: #FF0000;'>B.表达权</span>\n<span style='color: #FF0000;'>C.选举权</span>\n<span style='color: #FF0000;'>D.民主管理权</span>\n", "<span style='color: #47ceab;'>多选题：</span>幸福是一个总体性范畴，它意味着人总体上生活得美好，（）等都是幸福的重要因素。\n<span style='color: #FF0000;'>A.行为正当</span>\n<span style='color: #FF0000;'>B.职业成功</span>\n<span style='color: #FF0000;'>C.人格完善</span>\n<span style='color: #FF0000;'>D.家庭和睦</span>\n", "<span style='color: #47ceab;'>多选题：</span>端正人生态度需要（）\n<span style='color: #FF0000;'>A.人生应乐观</span>\n<span style='color: #FF0000;'>B.人生要进取</span>\n<span style='color: #FF0000;'>C.人生当务实</span>\n<span style='color: #FF0000;'>D.人生需认真</span>\n", "<span style='color: #47ceab;'>多选题：</span>在伦敦海格特公墓的马克思墓碑上，镌刻着马克思的一句名言：“哲学家们只是用不同的方式解释世界，而问题在于改变世界。”这鲜明地表明了（）。\nA.哲学家的基本特点\n<span style='color: #FF0000;'>B.以改造世界为己任的基本特征</span>\nC.马克思主义对哲学家的基本要求\n<span style='color: #FF0000;'>D.马克思主义重视实践</span>\n", "<span style='color: #47ceab;'>多选题：</span>“苟利国家生死以，岂因祸福避趋之”民族英雄林则徐的这句诗体现的人生价值观是（）\n<span style='color: #FF0000;'>A.对社会的贡献大小决定了人生价值的高低</span>\nB.个人对社会的贡献以社会对个人的尊重为基础\nC.有价值的人生不应考虑个人利益\n<span style='color: #FF0000;'>D.人生的价值在于对社会的贡献</span>\n", "<span style='color: #47ceab;'>多选题：</span>人生目的的作用有（）\n<span style='color: #FF0000;'>A.决定人生价值标准</span>\n<span style='color: #FF0000;'>B.决定人生道路</span>\nC.决定世界观\n<span style='color: #FF0000;'>D.决定人生态度</span>\n", "<span style='color: #47ceab;'>多选题：</span>中国传统文化强调道德修养和道德教化，“三不朽”指的是（）\n<span style='color: #FF0000;'>A.立德</span>\n<span style='color: #FF0000;'>B.立言</span>\n<span style='color: #FF0000;'>C.立功</span>\nD.立书\n", "<span style='color: #47ceab;'>多选题：</span>社会主义核心价值体系主要包括马克思主义指导思想、（）\n<span style='color: #FF0000;'>A.中国特色社会主义共同理想</span>\n<span style='color: #FF0000;'>B.以改革创新为核心的时代精神</span>\n<span style='color: #FF0000;'>C.社会主义荣辱观</span>\n<span style='color: #FF0000;'>D.以爱国主义为核心的民族精神</span>\n", "<span style='color: #47ceab;'>多选题：</span>大学生在网络生活中加强社会公德自律的基本要求是（）\n<span style='color: #FF0000;'>A.养成网络自律精神</span>\n<span style='color: #FF0000;'>B.健康进行网络交往</span>\n<span style='color: #FF0000;'>C.正确使用网络工具</span>\n<span style='color: #FF0000;'>D.自觉避免沉迷网络</span>\n", "<span style='color: #47ceab;'>多选题：</span>在社会主义法治中，坚持人民主体地位，必须坚持法治建设（），以保障人民根本权益为出发点和落脚点，保证人民依法享有广泛的权利和自由、承担应尽的义务，维护社会公平正义，促进共同富裕，为保证人民当家作主提供坚实的法治基础。\n<span style='color: #FF0000;'>A.造福人民</span>\n<span style='color: #FF0000;'>B.依靠人民</span>\n<span style='color: #FF0000;'>C.保护人民</span>\n<span style='color: #FF0000;'>D.为了人民</span>\n", "<span style='color: #47ceab;'>多选题：</span>走中国特色社会主义法治道路，必须坚持（）\n<span style='color: #FF0000;'>A.依法治国和以德治国相结合</span>\n<span style='color: #FF0000;'>B.人民主体地位、法律面前人人平等</span>\n<span style='color: #FF0000;'>C.从中国实际出发</span>\n<span style='color: #FF0000;'>D.中国共产党的领导</span>\n", "<span style='color: #47ceab;'>多选题：</span>在人与人之间关系的层面上，社会公德主要体现为()\n<span style='color: #FF0000;'>A.尊重他人</span>\nB.维护公共秩序\n<span style='color: #FF0000;'>C.举止文明</span>\nD.爱护其他公物\n", "<span style='color: #47ceab;'>多选题：</span>创新是推动人类社会发展的第一动力。增强改革创新的能力本领应该做到（）\nA.勇于尝试大胆想象\n<span style='color: #FF0000;'>B.夯实创新基础</span>\n<span style='color: #FF0000;'>C.投身改革创新实践</span>\n<span style='color: #FF0000;'>D.培养创新思维</span>\n", "<span style='color: #47ceab;'>多选题：</span>社会主义核心价值观是社会主义核心价值体系的精神内核，它体现了社会主义核心价值体系的（）。\n<span style='color: #FF0000;'>A.根本性质</span>\n<span style='color: #FF0000;'>B.基本特征</span>\nC.基本要求\nD.本质属性\n", "<span style='color: #47ceab;'>单选题：</span>关于宪法宣誓，下列说法准确的是（）\nA.党的机关工作人员就职时应当按照法律规定公开进行宪法宣誓。\n<span style='color: #FF0000;'>B.国家工作人员就职时应当按照法律规定公开进行宪法宣誓。</span>\nC.党和国家工作人员就职时应当按照法律规定公开进行宪法宣誓。\nD.所有机关工作人员就职时应当按照法律规定公开进行宪法宣誓。\n", "<span style='color: #47ceab;'>单选题：</span>（）是现实运动和长远目标相统一的过程。\nA.中国特色社会主义\n<span style='color: #FF0000;'>B.共产主义</span>\nC.社会主义\nD.马克思主义\n", "<span style='color: #47ceab;'>单选题：</span>孙中山先生说过：“‘统一’是中国全体国民的希望。能够统一，全国人民便享福；不能统一，便要受害。”我们坚持（）的基本方针，坚持一个中国原则和“九二共识”，推动两岸关系和平发展。\n<span style='color: #FF0000;'>A.和平统一、一国两制</span>\nB.不放弃使用武力\nC.和平团结，民族复兴\nD.兄弟齐心，其利断金\n", "<span style='color: #47ceab;'>单选题：</span>（）是当代中国最鲜明的特色。\nA.民族复兴\nB.爱国主义\nC.共产主义\n<span style='color: #FF0000;'>D.改革开放</span>\n", "<span style='color: #47ceab;'>单选题：</span>关于集体主义，下列说法正确的是（）\n<span style='color: #FF0000;'>A.集体主义强调国家利益、社会整体利益和个人利益的辩证统一</span>\nB.集体主义就是团体主义或本位主义\nC.集体主义重视和保障个人利益\nD.集体主义强调国家利益、社会整体利益与个人利益同等重要\n", "<span style='color: #47ceab;'>单选题：</span>人生观人人都有。在现实生活中，由于人们的立场和观点不同，对人活着的意义的理解不同，存在着各种不同的人生观。其中，我们倡导的科学的人生观是()\nA.自私自利的人生观\nB.合理利己主义的人生观\n<span style='color: #FF0000;'>C.服务人民、奉献社会的人生观</span>\nD.及时享乐的人生观\n", "<span style='color: #47ceab;'>单选题：</span>认识和处理人生问题的重要着眼点和出发点是（）\nA.个人与集体的关系问题\nB.个人与群众的关系问题\nC.个人与国家的关系问题\n<span style='color: #FF0000;'>D.个人与社会的关系问题</span>\n", "<span style='color: #47ceab;'>单选题：</span>蔡元培曾经说过：“若无德，则虽体魄智力发达，适足助其为恶。”道德之于个人、之于社会，都具有基础性意义，做人做事第一位的是（）\nA.自强自立\nB.志存高远\nC.明辨是非\n<span style='color: #FF0000;'>D.崇德修身</span>\n", "<span style='color: #47ceab;'>单选题：</span>（）是民族生生不息的丰厚滋养。\n<span style='color: #FF0000;'>A.历史文化</span>\nB.政治进步\nC.人类文明\nD.社会发展\n", "<span style='color: #47ceab;'>单选题：</span>（）以无可辩驳的事实生动展示着社会主义核心价值观的生机活力。\nA.中国特色社会主义政治建设\nB.中国特色社会主义文化建设\nC.中国特色社会主义经济建设\n<span style='color: #FF0000;'>D.中国特色社会主义建设</span>\n", "<span style='color: #47ceab;'>单选题：</span>（）是文化软实力的灵魂、文化软实力建设的重点\nA.中华优秀传统文化\n<span style='color: #FF0000;'>B.核心价值观</span>\nC.文化承载力\nD.民族精神\n", "<span style='color: #47ceab;'>单选题：</span>“一方水土养一方人”，“禾苗离土即死，国家无土难存”，因此，作为中华儿女要（）\nA.爱自己的骨肉同胞\n<span style='color: #FF0000;'>B.爱祖国的大好河山</span>\nC.爱自己的国家\nD.爱祖国的灿烂文化\n", "<span style='color: #47ceab;'>单选题：</span>（）是生产资料私有制的产物，是资产阶级人生观的核心\nA.功利主义\nB.实用主义\nC.拜金主义\n<span style='color: #FF0000;'>D.个人主义</span>\n", "<span style='color: #47ceab;'>单选题：</span>关于择业与创业观，下列说法错误的是（）\n<span style='color: #FF0000;'>A.职业活动是人们谋生的手段，从理想的角度谈不上崇高与否</span>\nB.择业和创业既要考虑个人的兴趣和意愿，也要充分考虑社会的需要\nC.任何一名劳动者，只要兢兢业业、精益求精，就一定能够造就闪光的人生\nD.大学生树立正确的择业观和创业观，要培养敢于创业的勇气和能力\n", "<span style='color: #47ceab;'>单选题：</span>法律是成文的道德，道德是内心的法律。这句话是要强调（）\nA.法律和道德两种规范调节的领域相同\nB.法律和道德两种规范的实施载体相同\n<span style='color: #FF0000;'>C.法律和道德都具有规范社会行为，维护社会秩序的作用</span>\nD.法律和道德两种规范的实现方式相同\n", "<span style='color: #47ceab;'>单选题：</span>（）是科学理论、创新思维的源泉，是检验真理的试金石，也是青年，锻炼成长的有效途径\nA.思辨\nB.大胆假设、小心求证\n<span style='color: #FF0000;'>C.社会实践</span>\nD.改革创新\n", "<span style='color: #47ceab;'>单选题：</span>集体主义道德要求是有层次的，其中对公民最基本的道德要求是（）\nA.先公后私、先人后己\nB.无私奉献、一心为公\n<span style='color: #FF0000;'>C.顾全大局、遵纪守法、热爱祖国、诚实劳动</span>\nD.助人为乐、文明礼貌、爱岗敬业、奉献社会\n", "<span style='color: #47ceab;'>单选题：</span>关于权力制约，下列表述不准确的是（）\nA.有权必有责，是指国家机关在获得权力的同时必须承担相应的职责和责任\nB.权力由法定，即法无授权不可为，是指国家机关的职权必须来自法律明确的授予\n<span style='color: #FF0000;'>C.用权受监督，是指国家权力的运行和行使接受法律监督部门的监督</span>\nD.违法受追究，是指国家工作人员违法行使权力必须受到法律的追究和制裁\n", "<span style='color: #47ceab;'>单选题：</span>没有崇高的（），就会导致精神上的“软骨病”\nA.精神追求\nB.精神境界\n<span style='color: #FF0000;'>C.理想信念</span>\nD.信仰\n", "<span style='color: #47ceab;'>单选题：</span>当代大学生要正确认识世界和中国的发展大势，说的是与（）同向\nA.祖国\n<span style='color: #FF0000;'>B.历史</span>\nC.人民\nD.中华民族\n", "<span style='color: #47ceab;'>单选题：</span>人们对人生目的和人生意义的根本看法和态度是（）\nA.世界观\nB.自然观\n<span style='color: #FF0000;'>C.人生观</span>\nD.历史观\n", "<span style='color: #47ceab;'>单选题：</span>“要用实际行动捍卫法律尊严，保障法律实施。参与社会活动，实施个人行为，都要以法律为依据，不得违反法律规范。”是（）的基本要求。\nA.维护法律\nB.信仰法律\n<span style='color: #FF0000;'>C.遵守法律</span>\nD.服从法律\n", "<span style='color: #47ceab;'>单选题：</span>社会发展的根本目标是()\nA.物质财富的极大丰富\nB.人与自然的和谐\nC.社会成员素质的不断提高\n<span style='color: #FF0000;'>D.推动和实现人的全面发展</span>\n", "<span style='color: #47ceab;'>单选题：</span>国家安全的根本是（）\nA.经济安全\nB.人民安全\nC.军事安全\n<span style='color: #FF0000;'>D.政治安全</span>\n", "<span style='color: #47ceab;'>单选题：</span>（）是坚持和发展中国特色社会主义的本质要求和重要保障，是国家治理的一场深刻变革。\nA.全面从严治党\n<span style='color: #FF0000;'>B.全面依法治国</span>\nC.全面制定方针政策\nD.全面深化改革\n", "<span style='color: #47ceab;'>单选题：</span>公共生活是相对于私人生活而言的，具有鲜明的（），对社会的影响更为直接和广泛。\nA.封闭性和隐秘性\nB.公共性和社会性\n<span style='color: #FF0000;'>C.开放性和透明性</span>\nD.群体性和丰富性\n", "<span style='color: #47ceab;'>单选题：</span>（）是引发自私自利、权钱交易、行贿受贿、贪赃枉法等丑恶现象的重要思想根源\n<span style='color: #FF0000;'>A.拜金主义</span>\nB.个人主义\nC.享乐主义\nD.实用主义\n", "<span style='color: #47ceab;'>单选题：</span>个人理想的实现，必须以（）的实现为前提和基础。\nA.共产主义理想\nB.共同理想\n<span style='color: #FF0000;'>C.社会理想</span>\nD.社会主义理想\n", "<span style='color: #47ceab;'>单选题：</span>（）是人们在一定的认识基础上确立的对某种思想或事物坚信不疑并身体力行的精神状态。\n<span style='color: #FF0000;'>A.信念</span>\nB.信仰\nC.理想\nD.意志\n", "<span style='color: #47ceab;'>单选题：</span>个人对社会的责任与贡献属于（）\nA.人生价值的全部\n<span style='color: #FF0000;'>B.社会价值</span>\nC.人生价值的必要条件\nD.自我价值\n", "<span style='color: #47ceab;'>多选题：</span>社会生活基本上可以分为()\n<span style='color: #FF0000;'>A.公共生活</span>\n<span style='color: #FF0000;'>B.职业生活</span>\nC.网络虚拟世界生活\n<span style='color: #FF0000;'>D.婚姻家庭生活</span>\n", "<span style='color: #47ceab;'>多选题：</span>墨子说“志不强者智不达”，诸葛亮说“志当存高远”。这里的“志”具有双重含义：（）\nA.对真理的不断探索\nB.对社会的不懈追求\n<span style='color: #FF0000;'>C.对未来目标的向往</span>\n<span style='color: #FF0000;'>D.实现奋斗目标的顽强意志</span>\n", "<span style='color: #47ceab;'>多选题：</span>时代精神与民族精神的关系表现在（）\n<span style='color: #FF0000;'>A.两者紧密关联</span>\n<span style='color: #FF0000;'>B.都是中华民族赖以生存和发展的精神支撑</span>\nC.民族精神是时代精神的时代性体现\n<span style='color: #FF0000;'>D.都是中国精神的重要组成部分</span>\n", "<span style='color: #47ceab;'>多选题：</span>以下顺逆观，正确的是（）\n<span style='color: #FF0000;'>A.在逆境中激流勇进</span>\nB.在顺境中滋生骄娇二气\n<span style='color: #FF0000;'>C.在逆境中化压力为动力</span>\nD.在顺境中自满自足\n", "<span style='color: #47ceab;'>多选题：</span>维护公共秩序的基本手段是()\n<span style='color: #FF0000;'>A.舆论</span>\n<span style='color: #FF0000;'>B.法律</span>\n<span style='color: #FF0000;'>C.道德</span>\n<span style='color: #FF0000;'>D.政策</span>\n", "<span style='color: #47ceab;'>多选题：</span>国家创制法律规范的方式主要有（）\nA.由社会大众约定俗成规范规则\n<span style='color: #FF0000;'>B.国家机关赋予先前的判例法律效力</span>\n<span style='color: #FF0000;'>C.国家机关在法定的职权范围内依照法定程序，制定、修改、废止规范性法律文件</span>\n<span style='color: #FF0000;'>D.国家机关赋予某些既定社会规范法律效力</span>\n", "<span style='color: #47ceab;'>多选题：</span>坚定的核心价值观自信，是中国特色社会主义（）的价值内核。\n<span style='color: #FF0000;'>A.理论自信</span>\n<span style='color: #FF0000;'>B.道路自信</span>\n<span style='color: #FF0000;'>C.文化自信</span>\n<span style='color: #FF0000;'>D.制度自信</span>\n", "<span style='color: #47ceab;'>多选题：</span>马克思主义提出生产力高度发展和生产资料公有制的基础上，建立真正实现人人平等的公平正义的社会，是迄今为止人类（）的价值追求。\nA.最真实\nB.最突出\n<span style='color: #FF0000;'>C.最先进</span>\n<span style='color: #FF0000;'>D.最广泛</span>\n", "<span style='color: #47ceab;'>多选题：</span>家庭是指在（）基础上产生的亲属之间所构成的社会生活单位。\n<span style='color: #FF0000;'>A.收养关系</span>\nB.经济关系\n<span style='color: #FF0000;'>C.血缘关系</span>\n<span style='color: #FF0000;'>D.婚姻关系</span>\n", "<span style='color: #47ceab;'>多选题：</span>与人民同在,体现在（）\n<span style='color: #FF0000;'>A.走与人民群众相结合的道路</span>\n<span style='color: #FF0000;'>B.做中国最广大人民根本利益的维护者</span>\n<span style='color: #FF0000;'>C.向人民群众学习</span>\n<span style='color: #FF0000;'>D.从人民群众中汲取营养</span>\n", "<span style='color: #47ceab;'>多选题：</span>（）的人生，才是有意义的人生\n<span style='color: #FF0000;'>A.有梦想</span>\n<span style='color: #FF0000;'>B.有奋斗</span>\n<span style='color: #FF0000;'>C.有奉献</span>\n<span style='color: #FF0000;'>D.有信念</span>\n", "<span style='color: #47ceab;'>多选题：</span>下列表述中能充分体现我国宪法至上地位的是（）\n<span style='color: #FF0000;'>A.我国宪法是国家各项制度和法律法规的总依据</span>\n<span style='color: #FF0000;'>B.我国宪法规定了国家的根本制度</span>\nC.我国宪法和其他法律具有同等地位\n<span style='color: #FF0000;'>D.我国宪法是国家的根本大法，是党和人民意志的集中体现</span>\n", "<span style='color: #47ceab;'>多选题：</span>下列哪些选项内容代表了拜金主义的人生观（）\nA.人人为我，我为人人\nB.今朝有酒今朝醉\n<span style='color: #FF0000;'>C.人为财死，鸟为食亡</span>\n<span style='color: #FF0000;'>D.金钱是万能的</span>\n", "<span style='color: #47ceab;'>多选题：</span>为什么要走中国特色社会主义法治道路？下列回答正确的是（）\n<span style='color: #FF0000;'>A.是由我国社会主义国家性质所决定的</span>\nB.是实现共产主义的要求\n<span style='color: #FF0000;'>C.是立足我国基本国情的必然选择</span>\n<span style='color: #FF0000;'>D.是历史的必然结论</span>\n", "<span style='color: #47ceab;'>多选题：</span>中国共产党自诞生之日起，就把（）作为自己的初心和使命，并团结带领全国各族人民不懈奋斗，战胜各种艰难险阻，不断取得革命、建设、改革的伟大胜利。\nA.全心全意为人民服务\nB.实现中华民族伟大复兴的中国梦\n<span style='color: #FF0000;'>C.为中国人民谋幸福</span>\n<span style='color: #FF0000;'>D.为中华民族谋复兴</span>\n", "<span style='color: #47ceab;'>多选题：</span>树立正确的得失观，不要（　）\n<span style='color: #FF0000;'>A.拘泥于个人利益的得失</span>\n<span style='color: #FF0000;'>B.满足于一时的得</span>\n<span style='color: #FF0000;'>C.惧怕一时的失</span>\nD.以积极进取的态度对待得失\n", "<span style='color: #47ceab;'>多选题：</span>法律义务具有以下哪些特点？（）\n<span style='color: #FF0000;'>A.法律义务是历史的</span>\n<span style='color: #FF0000;'>B.法律义务必须依法设定</span>\n<span style='color: #FF0000;'>C.法律义务源于现实需要</span>\n<span style='color: #FF0000;'>D.法律义务可能发生变化</span>\n", "<span style='color: #47ceab;'>多选题：</span>大学生应当树立的正确创业观包括()\nA.要有雄厚的学历背景\n<span style='color: #FF0000;'>B.要有积极创业的思想准备</span>\n<span style='color: #FF0000;'>C.要有敢于创业的勇气</span>\n<span style='color: #FF0000;'>D.要提高创业的能力</span>\n", "<span style='color: #47ceab;'>多选题：</span>男女双方培养爱情的过程或在爱情基础上进行的相互交往活动，就是人们日常所说的恋爱。恋爱是（）\n<span style='color: #FF0000;'>A.文明相亲相爱</span>\n<span style='color: #FF0000;'>B.自觉承担责任</span>\nC.爱情至上原则\n<span style='color: #FF0000;'>D.尊重人格平等</span>\n", "<span style='color: #47ceab;'>多选题：</span>民族精神是指一个民族在长期共同生活和社会实践中形成的，为本民族大多数成员所认同的（）的总和\n<span style='color: #FF0000;'>A.精神气质</span>\n<span style='color: #FF0000;'>B.道德规范</span>\n<span style='color: #FF0000;'>C.价值取向</span>\n<span style='color: #FF0000;'>D.思维方式</span>\n", "<span style='color: #47ceab;'>单选题：</span>加强思想修养.提高精神境界，必须牢牢把握理想信念这个（）。\n<span style='color: #FF0000;'>A.核心</span>\nB.关键​\nC.本质\nD.基础\n", "<span style='color: #47ceab;'>单选题：</span>党的十九大，提出了“培养担当（）大任的时代新人”的战略要求。\nA.社会和谐\nB.国富民强\nC.国家富强\n<span style='color: #FF0000;'>D.民族复兴</span>\n", "<span style='color: #47ceab;'>单选题：</span>社会主义核心价值观之所以彰显出强大的生命力.吸引力和感召力，正因其深深地扎根于（）的生动实践之中。\n<span style='color: #FF0000;'>A.中国特色社会主义建设</span>\nB.中国特色社会主义文化建设\nC.中国特色社会主义经济建设\nD.中国特色社会主义政治建设\n", "<span style='color: #47ceab;'>单选题：</span>中国革命道德萌芽于（），经过长期发展逐渐形成并不断发扬光大。\n<span style='color: #FF0000;'>A.五四运动前后</span>\nB.抗日战争后​\nC.中国共产党成立以后\nD.土地革命战争前后\n", "<span style='color: #47ceab;'>单选题：</span>个人理想与社会理想的关系实质上是（）关系在理想层面的反映。\n<span style='color: #FF0000;'>A.个人与社会</span>\nB.公民与国家\nC.公民与社会\nD.个人与集体\n", "<span style='color: #47ceab;'>单选题：</span>（）具有与时俱进的理论品格和持久生命力。\nA.中国特色社会主义\nB.共产主义\n<span style='color: #FF0000;'>C.马克思主义</span>\nD.社会主义\n", "<span style='color: #47ceab;'>单选题：</span>爱因斯坦说：“一个人对社会的价值，首先取决于他的感情.思想和行动对增进人类利益有多大作用，而不应看他取得什么。”就是说，衡量一个人社会价值的标准应该是()\nA.社会对个人的尊重和满足\nB.个人的行为动机\n<span style='color: #FF0000;'>C.个人对社会的责任和贡献</span>\nD.个人的社会存在\n", "<span style='color: #47ceab;'>单选题：</span>关于法律面前人人平等，下列说法不准确的是（）。\nA.平等享受公民权利.平等履行公民义务\nB.一切违反宪法法律的行为都必须平等予以追究\nC.只要是合法权益，就应当依法得到平等保护\n<span style='color: #FF0000;'>D.只要是公民有诉求，就应当得到平等对待</span>\n", "<span style='color: #47ceab;'>单选题：</span>“个人的抱负不可能孤立地实现，只有把它同时代和人民的要求紧密结合起来，用自己的知识和本领为祖国.为人民服务，才能使自身价值得到充分实现。如果脱离时代.脱离人民，必将一事无成。”这段话的意思是（）\nA.社会价值的创造过程与自我价值的实现过程是不相关的\nB.实现自我价值是因，创造社会价值是果\n<span style='color: #FF0000;'>C.人生的自我价值必须与社会价值相结合，并通过社会价值表现出来</span>\nD.不实现个人抱负，就不会创造社会价值\n", "<span style='color: #47ceab;'>单选题：</span>做新时期忠诚坚定的爱国者，除了需要培育强烈的爱国情感.保持民族自尊和自信，努力学习和工作.以实际行动和贡献履行爱国义务外，还需要（）\nA.拒绝接受其他国家的一切东西\n<span style='color: #FF0000;'>B.维护祖国统一和民族团结</span>\nC.全面接受中国古代的传统文化和道德\nD.从经济基础到上层建筑的一切领域都与西方接轨\n", "<span style='color: #47ceab;'>单选题：</span>社会主义道德的基本原则是（）。\nA.个人主义\n<span style='color: #FF0000;'>B.集体主义</span>\nC.国家主义\nD.整体主义\n", "<span style='color: #47ceab;'>单选题：</span>爱国主义与（）具有一致性，这是每一个中国公民必须坚持的立场和态度\nA.爱广大人民\nB.爱中国共产党\nC.爱人民政府\n<span style='color: #FF0000;'>D.爱社会主义</span>\n", "<span style='color: #47ceab;'>单选题：</span>深深地根植于（），是社会主义核心价值观历史底蕴的集中体现。\nA.中国特色社会主义文化\nB.社会主义先进文化\n<span style='color: #FF0000;'>C.中华优秀传统文化</span>\nD.大众文化\n", "<span style='color: #47ceab;'>单选题：</span>在建设中国特色社会主义法治体系中，关于严密的法治监督体系，下列说法不准确的是（）。\nA.强化对行政权力的制约和监督\n<span style='color: #FF0000;'>B.司法活动要依靠人民群众的监督</span>\nC.健全宪法实施和监督制度\nD.深化国家监察体制改革，依法建立党统一领导的反腐败工作机构\n", "<span style='color: #47ceab;'>单选题：</span>（）反映了人们对美好社会的期望和憧憬，是衡量现代社会是否高度发展.充满活力.和谐有序的重要标志。\nA.富强.民主.文明.和谐\nB.爱国.敬业.诚信.友善\n<span style='color: #FF0000;'>C.自由.平等.公正.法治</span>\nD.爱岗.敬业.公平.正义\n", "<span style='color: #47ceab;'>单选题：</span>人生态度属于人生观的范畴，是指(　　)\nA.人生实践活动的总目标\nB.人们在实践中形成的对人生目的和意义的根本看法和态度\nC.人的实践对于社会.他人和自身所具有的意义\n<span style='color: #FF0000;'>D.人们通过生活实践所形成的对人生问题的一种相对稳定的心理倾向和精神状态</span>\n", "<span style='color: #47ceab;'>单选题：</span>真正的快乐，只能由（）转化而来\nA.事业的成就\nB.爱情的甜蜜\n<span style='color: #FF0000;'>C.奋斗的艰苦</span>\nD.家人的安康\n", "<span style='color: #47ceab;'>单选题：</span>在对待传统道德的态度问题上，下列说法正确的是（）。\n<span style='color: #FF0000;'>A.要从文化自觉和文化自信出发，加强对中华传统美德的挖掘和阐发。</span>\nB.中国传统道德从整体上在今天已经失去了价值和意义\nC.道德建设的最终目标是要形成以中国传统文化为主体的道德体系\nD.必须从整体上对中国传统道德予以否定\n", "<span style='color: #47ceab;'>单选题：</span>实现人生价值的根本途径是()\nA.选择正确的人生价值目标\nB.自觉提高自我的主体意识\nC.树立服务人民.奉献社会的人生观\n<span style='color: #FF0000;'>D.进行积极的创造性的实践活动</span>\n", "<span style='color: #47ceab;'>单选题：</span>把金钱作为衡量人生价值的唯一标准，这是典型的（）\n<span style='color: #FF0000;'>A.拜金主义</span>\nB.享乐主义\nC.个人主义\nD.实用主义\n", "<span style='color: #47ceab;'>单选题：</span>（）是凝心聚力的兴国之魂.强国之魂。\nA.爱国主义\n<span style='color: #FF0000;'>B.中国精神</span>\nC.时代精神\nD.民族精神\n", "<span style='color: #47ceab;'>单选题：</span>在社会生活中，人生实践体现出一些价值。其中，个体的人生活动对自身的生存和发展所具有的价值，指的是人生的(　　)\n<span style='color: #FF0000;'>A.自我价值</span>\nB.社会价值\nC.群体价值\nD.外在价值\n", "<span style='color: #47ceab;'>单选题：</span>在社会主义社会中，个人利益与社会利益在根本上是()\nA.冲突的\nB.不相关的\nC.矛盾的\n<span style='color: #FF0000;'>D.一致的</span>\n", "<span style='color: #47ceab;'>单选题：</span>青春是用来（）的。\nA.实践\n<span style='color: #FF0000;'>B.奋斗</span>\nC.梦想\nD.享受\n", "<span style='color: #47ceab;'>单选题：</span>爱国主义是人们自己故土家园.种族和文化的归属感.（）.尊严感与荣誉感的统一\n<span style='color: #FF0000;'>A.认同感</span>\nB.自豪感\nC.自信心\nD.自尊心\n", "<span style='color: #47ceab;'>单选题：</span>坚持（）原则，这是两岸关系的政治基础。\nA.两岸交流合作\n<span style='color: #FF0000;'>B.一个中国</span>\nC.一国两制\nD.两岸一家亲\n", "<span style='color: #47ceab;'>单选题：</span>在社会主义初级阶段，我们所提倡的高尚的人生目的是（）\nA.“一切向钱看”的人生目的\n<span style='color: #FF0000;'>B.以天下为已任.服务人民.奉献社会的人生目的</span>\nC.为个人求权力.求享乐的人生目的\nD.“平生无大志，但求足温饱”的人生目的\n", "<span style='color: #47ceab;'>单选题：</span>为什么人服务是道德的核心问题，社会主义道德的核心是（）。\n<span style='color: #FF0000;'>A.为人民服务</span>\nB.为政党服务\nC.为群众服务\nD.为军队服务\n", "<span style='color: #47ceab;'>单选题：</span>完善党内法规体系的总目标是到（）时形成比较完善的党内法规制度体系.高效的党内法规制度实施体系.有力的党内法规制度建设保障体系，党依据党内法规管党治党的能力和水平显著提高。\nA.建党99周年\nB.建国80周年\nC.改革开放50周年\n<span style='color: #FF0000;'>D.建党100周年</span>\n", "<span style='color: #47ceab;'>多选题：</span>道德发挥其功能的方式主要有（）\nA.国家强制力\n<span style='color: #FF0000;'>B.社会舆论</span>\n<span style='color: #FF0000;'>C.传统习俗</span>\n<span style='color: #FF0000;'>D.内心信念</span>\n", "<span style='color: #47ceab;'>多选题：</span>立法活动必须遵循法定程序，就全国人民代表大会的立法程序而言，大体包括（）环节。\n<span style='color: #FF0000;'>A.法律案的提出</span>\n<span style='color: #FF0000;'>B.法律案的审议</span>\n<span style='color: #FF0000;'>C.法律案的表决</span>\n<span style='color: #FF0000;'>D.法律的公布</span>\n", "<span style='color: #47ceab;'>多选题：</span>在参加志愿服务和学雷锋活动中，大学生要努力做（）的时代先锋\n<span style='color: #FF0000;'>A.传播文明</span>\n<span style='color: #FF0000;'>B.引领风尚</span>\n<span style='color: #FF0000;'>C.营造和谐</span>\nD.道德模范\n", "<span style='color: #47ceab;'>多选题：</span>行政执法是法律实施和实现的重要环节，必须坚持（）等基本原则。\n<span style='color: #FF0000;'>A.效率</span>\n<span style='color: #FF0000;'>B.合理性</span>\n<span style='color: #FF0000;'>C.合法性</span>\n<span style='color: #FF0000;'>D.信赖保护</span>\n", "<span style='color: #47ceab;'>多选题：</span>在当今中国，最重要的社会实践就是（）\n<span style='color: #FF0000;'>A.全面建成小康社会</span>\nB.加快实现共产主义\n<span style='color: #FF0000;'>C.实现中华民族伟大复兴</span>\n<span style='color: #FF0000;'>D.加快推进社会主义现代化强国</span>\n", "<span style='color: #47ceab;'>多选题：</span>当代大学生承担新时代赋予的历史责任，应当（）\n<span style='color: #FF0000;'>A.与历史同向</span>\nB.与时代同进步\n<span style='color: #FF0000;'>C.与人民同在</span>\n<span style='color: #FF0000;'>D.与祖国同行</span>\n", "<span style='color: #47ceab;'>多选题：</span>人生观与世界观的关系是（）\n<span style='color: #FF0000;'>A.人生观对世界观的巩固.发展和变化起着重要的作用</span>\nB.人生观决定世界观\n<span style='color: #FF0000;'>C.世界观决定人生观</span>\n<span style='color: #FF0000;'>D.人生观从属于世界观</span>\n", "<span style='color: #47ceab;'>多选题：</span>中国特色社会主义制度是当代中国发展进步的根本制度保障，是具有（）的先进制度。\n<span style='color: #FF0000;'>A.强大自我完善能力</span>\n<span style='color: #FF0000;'>B.鲜明中国特色</span>\n<span style='color: #FF0000;'>C.明显制度优势</span>\nD.充满生机活力\n", "<span style='color: #47ceab;'>多选题：</span>社会主义核心价值观把涉及国家.社会.公民的价值要求融为一体，是对我们要（）等重大问题的深刻解答。\nA.建设什么样的政府\n<span style='color: #FF0000;'>B.建设什么样的国家</span>\n<span style='color: #FF0000;'>C.建设什么样的社会</span>\n<span style='color: #FF0000;'>D.培育什么样的公民</span>\n", "<span style='color: #47ceab;'>多选题：</span>我国司法的基本要求是（）。\n<span style='color: #FF0000;'>A.合理</span>\n<span style='color: #FF0000;'>B.合法</span>\n<span style='color: #FF0000;'>C.及时</span>\n<span style='color: #FF0000;'>D.正确</span>\n", "<span style='color: #47ceab;'>多选题：</span>自觉学习道德模范，学习这些模范的（）\n<span style='color: #FF0000;'>A.助人为乐，关爱他人</span>\n<span style='color: #FF0000;'>B.以诚待人，守信践诺</span>\n<span style='color: #FF0000;'>C.孝老爱亲.血脉相依</span>\n<span style='color: #FF0000;'>D.见义勇为，勇于担当</span>\n", "<span style='color: #47ceab;'>多选题：</span>鲁迅曾说:“没有民魂是值得宝贵的，没有他发扬起来，中国才有真进步。”实现中国梦必须弘扬中国精神，中国精神是兴国强国之魂是（）\nA.政治文明建设的重要内容\n<span style='color: #FF0000;'>B.推进复兴伟业的精神支柱</span>\n<span style='color: #FF0000;'>C.激发创新创造的精神动力</span>\n<span style='color: #FF0000;'>D.凝聚中国力量的精神纽带</span>\n", "<span style='color: #47ceab;'>多选题：</span>大学生应该以（）为根本要求。\n<span style='color: #FF0000;'>A.有担当</span>\n<span style='color: #FF0000;'>B.有本领</span>\n<span style='color: #FF0000;'>C.有理想</span>\nD.有纪律\n", "<span style='color: #47ceab;'>多选题：</span>着眼“四个全面”战略布局加强道德建设，“四个全面”具体是指（）\n<span style='color: #FF0000;'>A.全面建设社会主义现代化国家</span>\n<span style='color: #FF0000;'>B.全面从严治党</span>\n<span style='color: #FF0000;'>C.全面依法治国</span>\n<span style='color: #FF0000;'>D.全面深化改革</span>\n", "<span style='color: #47ceab;'>多选题：</span>我国行政执法的主体通常是（）\n<span style='color: #FF0000;'>A.各级政府中享有执法权的下属行政机构</span>\n<span style='color: #FF0000;'>B.中央和地方各级政府</span>\nC.全国政协\nD.全国人大\n", "<span style='color: #47ceab;'>多选题：</span>大学生要坚持由易到难.由近及远，从现在做起，从自己做起……为实现（）中国梦凝聚强大的青春能量。\n<span style='color: #FF0000;'>A.国家富强</span>\n<span style='color: #FF0000;'>B.民族振兴</span>\nC.社会进步\n<span style='color: #FF0000;'>D.人民幸福</span>\n", "<span style='color: #47ceab;'>多选题：</span>人生态度大致可分为积极进取的人生态度和消极无为的人生态度。大学生应当树立积极进取的人生态度。这是因为，积极进取的人生态度（）\n<span style='color: #FF0000;'>A.有助于达到人生目的</span>\nB.容易使人好高骛远\n<span style='color: #FF0000;'>C.有助于实现人生价值</span>\n<span style='color: #FF0000;'>D.能够调整人生道路的方向</span>\n", "<span style='color: #47ceab;'>多选题：</span>信念具有（）。\n<span style='color: #FF0000;'>A.执着性</span>\nB.实践性\n<span style='color: #FF0000;'>C.多样性</span>\nD.超越性\n", "<span style='color: #47ceab;'>多选题：</span>我国司法原则主要有（）等。\n<span style='color: #FF0000;'>A.司法机关依法独立行使司法权</span>\n<span style='color: #FF0000;'>B.公民在法律面前一律平等</span>\n<span style='color: #FF0000;'>C.司法公正</span>\n<span style='color: #FF0000;'>D.以事实为依据，以法律为准绳</span>\n", "<span style='color: #47ceab;'>多选题：</span>维护国家主权和领土完整.实现祖国统一要做到（）\n<span style='color: #FF0000;'>A.促进两岸同胞团结奋斗</span>\n<span style='color: #FF0000;'>B.坚持一个中国原则</span>\n<span style='color: #FF0000;'>C.推进两岸交流合作</span>\nD.和平统一.一国两制\n", "<span style='color: #47ceab;'>多选题：</span>“只有在集体中，个人才能获得全面发展其才能的手段，也就是说，只有在集体中才可能有个人利益“这说明()\n<span style='color: #FF0000;'>A.只有集体的事业兴旺发达，才能保障个人的正当利益充分实现</span>\n<span style='color: #FF0000;'>B.广大人民只有靠集体奋斗才能实现自身的正当利益</span>\nC.集体主义坚决排斥个人利益和个性自由\n<span style='color: #FF0000;'>D.没有集体利益，就不可能有个人利益</span>\n", "<span style='color: #47ceab;'>单选题：</span>中国共产党从成立之日起，就确立了（）的远大理想，始终团结带领中国人民朝着这个伟大理想前行。\nA.中国特色社会主义\n<span style='color: #FF0000;'>B.共产主义</span>\nC.马克思主义\nD.社会主义\n", "<span style='color: #47ceab;'>单选题：</span>大学生在大学阶段的首要任务是（）。\nA.笃实\n<span style='color: #FF0000;'>B.学习</span>\nC.立行\nD.修德\n", "<span style='color: #47ceab;'>单选题：</span>与以往社会的道德形态相比，（）具有显著的先进性特征。\nA.资本主义社会的道德\nB.社会公德\nC.原始社会的道德\n<span style='color: #FF0000;'>D.社会主义的道德</span>\n", "<span style='color: #47ceab;'>单选题：</span>中华传统美德内容丰富.博大精深，“重视整体利益，强调责任奉献”是中华传统美德的基本精神之一。在中华传统道德的诸多论辩中，其核心和本质的论辩是（）。\n<span style='color: #FF0000;'>A.公私之辨</span>\nB.生死之辩\nC.义利之辨\nD.理欲之辨\n", "<span style='color: #47ceab;'>单选题：</span>（）是改革开放以来党的全部理论和实践的主题，是党和人民历尽千辛万苦.付出巨大代价取得的根本成就。\nA.科学社会主义\nB.马克思主义\nC.共产主义\n<span style='color: #FF0000;'>D.中国特色社会主义</span>\n", "<span style='color: #47ceab;'>单选题：</span>（）是涵养社会主义核心价值观的重要源泉。\nA.中华民族传统美德\nB.中国特色社会主义理想信念\nC.马克思主义理论\n<span style='color: #FF0000;'>D.中华优秀传统文化</span>\n", "<span style='color: #47ceab;'>单选题：</span>作为一个民族群体意识的载体，（）常常被称为国家和民族的“胎记”，是一个国家民族得以延续的“精神基因”。\nA.浓厚的道德渊源\nB.祖国的大好河山\n<span style='color: #FF0000;'>C.灿烂的文化传统</span>\nD.自己的骨肉同胞\n", "<span style='color: #47ceab;'>单选题：</span>“立善法于天下，则天下治；立善法于一国，则一国治。”指的是（）。\nA.公正司法\n<span style='color: #FF0000;'>B.科学立法</span>\nC.全民守法\nD.严格执法\n", "<span style='color: #47ceab;'>单选题：</span>道德是一种以指导人的行为为目的.以形成人的正确行为方式为内容的精神，在本质上是（）。\nA.实践认识和谐的\nB.现实未来发展的\n<span style='color: #FF0000;'>C.知行合一的</span>\nD.主客观一致的\n", "<span style='color: #47ceab;'>单选题：</span>人生观与世界观的关系是（）。\n<span style='color: #FF0000;'>A.世界观决定人生观</span>\nB.人生观决定世界观\nC.具有唯物主义世界观，人生观一定是正确的\nD.具有唯心主义世界观，人生观一定是不正确的\n", "<span style='color: #47ceab;'>单选题：</span>个体的人生活动对自己生存和发展所具有的价值，称为（）\n<span style='color: #FF0000;'>A.自我价值</span>\nB.经济价值\nC.社会价值\nD.文化价值\n", "<span style='color: #47ceab;'>单选题：</span>全国劳动模范徐虎说过：“你不奉献，我不奉献，谁来奉献?你也索取，我也索取，向谁索取?”这句话的意思是，社会需要每个人的奉献，只有有奉献才能有索取。这种观点认为，人生价值的本质在于（）\n<span style='color: #FF0000;'>A.个人对社会的责任和贡献</span>\nB.个人需要的最大满足\nC.个人的社会存在\nD.社会对个人的尊重和满足​\n", "<span style='color: #47ceab;'>单选题：</span>我国现行宪法于（）年，五届全国人大五次会议通过。\nA.1975\nB.1954\nC.2018\n<span style='color: #FF0000;'>D.1982</span>\n", "<span style='color: #47ceab;'>单选题：</span>人生观的作用主要通过人生目的.人生态度.人生价值三个方面体现出来。人生目的回答人为什么活着，人生态度表明人应当怎样对待生活，人生价值判断什么样的人生才有意义。这三个方面互相联系.互相制约，其中居于核心地位的是（）\nA.人生价值\nB.人生价值观\n<span style='color: #FF0000;'>C.人生目的</span>\nD.人生态度\n", "<span style='color: #47ceab;'>单选题：</span>“理国要道，在于公平正直。”指的是（）。\nA.全民守法\nB.严格执法\nC.科学立法\n<span style='color: #FF0000;'>D.公正司法</span>\n", "<span style='color: #47ceab;'>单选题：</span>都江堰设计巧妙，成效卓著，是闻名世界的水利工程，在2000多年中持续使用，体现的中国精神内涵是（）。\nA.伟大团结精神\nB.伟大梦想精神\n<span style='color: #FF0000;'>C.伟大创造精神</span>\nD.伟大奋斗精神\n", "<span style='color: #47ceab;'>单选题：</span>“学如弓弩，才如箭镞，识以领之，方能中鹄。”这句话告诉我们要（）。\nA.有理想\nB.有责任\nC.有担当\n<span style='color: #FF0000;'>D.有本领</span>\n", "<span style='color: #47ceab;'>单选题：</span>重视并崇尚（），是中国古代思想家们的主流观点。\n<span style='color: #FF0000;'>A.精神生活</span>\nB.政治生活\nC.文化生活\nD.物质生活\n", "<span style='color: #47ceab;'>单选题：</span>以下表述，（）不是表现为对矢志不渝的坚守理想。\n<span style='color: #FF0000;'>A.“自天子以至于庶人，壹是皆以修身为本”</span>\nB.“为天地立心，为生民立命，为往圣继绝学，为万世开太平”\nC.“兼相爱，交相利”\nD.“志士仁人，无求生以害仁，有杀身以成仁”\n", "<span style='color: #47ceab;'>单选题：</span>（）是对待生产劳动和人类生存的一种根本价值态度。\nA.爱国\n<span style='color: #FF0000;'>B.敬业</span>\nC.友善\nD.诚信\n", "<span style='color: #47ceab;'>单选题：</span>评价一个人人生价值的大小，主要看他（）\nA.是否选择了正确的人生价值目标\n<span style='color: #FF0000;'>B.对社会的责任和贡献</span>\nC.从社会上获得的尊重和满足\nD.从事创造性实践活动的思想动机\n", "<span style='color: #47ceab;'>单选题：</span>（）是社会主义核心价值观的根本特性。\nA.先进性\nB.真实性\n<span style='color: #FF0000;'>C.人民性</span>\nD.实践性\n", "<span style='color: #47ceab;'>单选题：</span>我国立法贯穿公正.公平.公开原则，坚持科学立法.民主立法.依法立法，表达（）的共同意志和诉求。\nA.全体社会成员\n<span style='color: #FF0000;'>B.人民</span>\nC.各政党\nD.各阶级\n", "<span style='color: #47ceab;'>单选题：</span>关于“人的本质”的正确观点是（）\n<span style='color: #FF0000;'>A.人的本质是一切社会关系的总和</span>\nB.人的本质是自由\nC.人的本质就是人的自然属性\nD.人的本质是自私\n", "<span style='color: #47ceab;'>单选题：</span>（）是党和人民事业不断发展的参天大树之根本，是党和人民不断奋进的万里长河之泉源。\nA.中国特色社会主义\n<span style='color: #FF0000;'>B.马克思主义</span>\nC.社会主义\nD.共产主义\n", "<span style='color: #47ceab;'>单选题：</span>“人的本质不是单个人所固有的抽象物，在其现实性上，它是一切社会关系的总和。”这句话说明（）\n<span style='color: #FF0000;'>A.社会属性是人的本质属性</span>\nB.自然属性和社会属性都不是人的本质属性\nC.自然属性和社会属性都是人的本质属性\nD.自然属性是人的本质属性\n", "<span style='color: #47ceab;'>单选题：</span>在我国现阶段，个人选择和确立的人生目的，应当（）\nA.以利己为主又兼利他人\nB.有利于个人私利的实现\n<span style='color: #FF0000;'>C.符合人民群众的根本利益</span>\nD.放弃个人的利益和追求\n", "<span style='color: #47ceab;'>单选题：</span>马克思主义道德观认为，道德是反映（）的特殊意识形态。\nA.社会政治关系\n<span style='color: #FF0000;'>B.社会经济关系</span>\nC.社会舆论关系\nD.社会文化关系\n", "<span style='color: #47ceab;'>单选题：</span>毛泽东高度赞扬鲁迅先生所提倡的“横眉冷对千夫指，俯首甘为孺子牛”精神，以鲁迅为榜样，做无产阶级和人民大众的“牛”，鞠躬尽瘁，死而后已，体现了（）\n<span style='color: #FF0000;'>A.爱自己的骨肉同胞</span>\nB.爱祖国的大好河山\nC.爱祖国的灿烂文化\nD.爱自己的国家\n", "<span style='color: #47ceab;'>单选题：</span>人们通过生活实践所形成的对人生问题的一种相对稳定的心理倾向和精神状态，称为（）\nA.人生观\nB.人生目的\nC.人生价值\n<span style='color: #FF0000;'>D.人生态度</span>\n", "<span style='color: #47ceab;'>多选题：</span>中华民族历来就有一种对国家.对社会的使命感.责任感有忧患意识，强调为国家.为民族.为整体利益而献身的精神，这是中华民族的优良道德传统之一。下列能够反映和体现这种优良道德传统的是（）\n<span style='color: #FF0000;'>A.位卑未敢忘忧国</span>\n<span style='color: #FF0000;'>B.苟利国家生死以，岂因祸福避趋之</span>\nC.尽人事，以听天命\n<span style='color: #FF0000;'>D.天下兴亡，匹夫有责</span>\n", "<span style='color: #47ceab;'>多选题：</span>当代中国，爱国主义的本质就是坚持（）和（）.（）高度统一。\n<span style='color: #FF0000;'>A.爱党</span>\n<span style='color: #FF0000;'>B.爱国</span>\nC.爱人民\n<span style='color: #FF0000;'>D.爱社会主义</span>\n", "<span style='color: #47ceab;'>多选题：</span>（）是中国共产党人的初心和使命，也是我们党领导现代化建设的出发点和落脚点。\n<span style='color: #FF0000;'>A.为中华民族谋复兴</span>\nB.为中华民族谋团结\nC.为中国人民谋和谐\n<span style='color: #FF0000;'>D.为中国人民谋幸福</span>\n", "<span style='color: #47ceab;'>多选题：</span>一个国家的文化软实力，从根本上说，取决于其核心价值观的（）。\n<span style='color: #FF0000;'>A.凝聚力</span>\n<span style='color: #FF0000;'>B.感召力</span>\n<span style='color: #FF0000;'>C.生命力</span>\nD.向心力\n", "<span style='color: #47ceab;'>多选题：</span>人生观决定（）\n<span style='color: #FF0000;'>A.人生态度</span>\n<span style='color: #FF0000;'>B.人生价值选择</span>\n<span style='color: #FF0000;'>C.人生道路</span>\nD.人生意义\n", "<span style='color: #47ceab;'>多选题：</span>集体主义的道德要求是()\n<span style='color: #FF0000;'>A.顾全大局.遵纪守法.热爱祖国.诚实劳动</span>\nB.追求自我价值，实现自身发展\n<span style='color: #FF0000;'>C.先公后私.先人后己</span>\nD.无私奉献.一心为公\n", "<span style='color: #47ceab;'>多选题：</span>奴隶制法律主要特征有（）。\n<span style='color: #FF0000;'>A.存在严格的等级划分</span>\n<span style='color: #FF0000;'>B.否认奴隶的法律人格</span>\n<span style='color: #FF0000;'>C.刑罚方式极其残酷</span>\n<span style='color: #FF0000;'>D.具有明显的原始习惯残留痕迹</span>\n", "<span style='color: #47ceab;'>多选题：</span>新时代意味着中国特色社会主义（）不断发展，拓展了发展中国家走向现代化的途径。\n<span style='color: #FF0000;'>A.理论</span>\n<span style='color: #FF0000;'>B.文化</span>\n<span style='color: #FF0000;'>C.制度</span>\n<span style='color: #FF0000;'>D.道路</span>\n", "<span style='color: #47ceab;'>多选题：</span>道德属于上层建筑的范畴，是一种特殊的社会意识形态。社会主义道德建设要(　　)\n<span style='color: #FF0000;'>A.与社会主义法律规范相协调</span>\nB.与西方主流文明相一致\n<span style='color: #FF0000;'>C.与中华民族传统美德相承接</span>\n<span style='color: #FF0000;'>D.与社会主义市场经济相适应</span>\n", "<span style='color: #47ceab;'>多选题：</span>我国的国家（）都由人民代表大会产生，对它负责，受它监督。\n<span style='color: #FF0000;'>A.监察机关</span>\n<span style='color: #FF0000;'>B.检察机关</span>\n<span style='color: #FF0000;'>C.审判机关</span>\n<span style='color: #FF0000;'>D.行政机关</span>\n", "<span style='color: #47ceab;'>多选题：</span>下列语句和典故体现“自强不息”的民族精神的是（）\n<span style='color: #FF0000;'>A.富贵不能淫，贫贱不能移，威武不能屈</span>\n<span style='color: #FF0000;'>B.大禹治水</span>\n<span style='color: #FF0000;'>C.愚公移山</span>\nD.亲仁善邻\n", "<span style='color: #47ceab;'>多选题：</span>人生观是人们对人生目的和人生意义的根本看法和态度。下列选项属于人生观范畴的有()\n<span style='color: #FF0000;'>A.如何对待人生道路上的困难和矛盾</span>\nB.人类社会的发展规律是什么\n<span style='color: #FF0000;'>C.怎样生活才有价值</span>\n<span style='color: #FF0000;'>D.人为什么活着</span>\n", "<span style='color: #47ceab;'>多选题：</span>理想具有（）。\n<span style='color: #FF0000;'>A.实践性</span>\n<span style='color: #FF0000;'>B.超越性</span>\n<span style='color: #FF0000;'>C.时代性</span>\nD.可能性\n", "<span style='color: #47ceab;'>多选题：</span>端正人生态度应该（）\nA.怀疑批判\n<span style='color: #FF0000;'>B.认真务实</span>\n<span style='color: #FF0000;'>C.乐观进取</span>\nD.享受人生\n", "<span style='color: #47ceab;'>多选题：</span>当一个人抱有坚定的信念时，他就会全身心投入到为实现目标而努力奋斗的事业中去，（）。\n<span style='color: #FF0000;'>A.行为上坚定不移</span>\nB.情绪上的积极强烈\n<span style='color: #FF0000;'>C.态度上充满热情</span>\n<span style='color: #FF0000;'>D.精神上高度集中</span>\n", "<span style='color: #47ceab;'>多选题：</span>法律的运行是一个从创制、实施到实现的过程。这个过程主要包括（）等环节。\n<span style='color: #FF0000;'>A.法律遵守</span>\n<span style='color: #FF0000;'>B.法律适用</span>\n<span style='color: #FF0000;'>C.法律制定</span>\n<span style='color: #FF0000;'>D.法律执行</span>\n", "<span style='color: #47ceab;'>多选题：</span>大学生应当遵守网络生活中的道德要求，下列要求正确的是（）\n<span style='color: #FF0000;'>A.加强网络文明自律</span>\n<span style='color: #FF0000;'>B.营造良好网络道德环境</span>\n<span style='color: #FF0000;'>C.正确使用网络工具</span>\nD.在网络空间里挥洒个性\n", "<span style='color: #47ceab;'>多选题：</span>人生价值是自我价值和社会价值的统一。下列指人生的社会价值的有()\nA.社会对个人的尊重和满足\n<span style='color: #FF0000;'>B.个人通过劳动.创造对社会和人民所做的贡献</span>\n<span style='color: #FF0000;'>C.个体的人生对于社会和他人的意义</span>\nD.个人的社会存在\n", "<span style='color: #47ceab;'>多选题：</span>关于法律的产生与发展下列说法正确的是（）。\n<span style='color: #FF0000;'>A.法律不是从来就有的，也不是永恒存在的</span>\n<span style='color: #FF0000;'>B.法律将随着私有制、阶级和国家的消亡而消亡</span>\n<span style='color: #FF0000;'>C.法律随着私有制、阶级和国家的产生而产生</span>\nD.法律不是从来就有的，但会永恒存在下去\n", "<span style='color: #47ceab;'>多选题：</span>中国革命道德的主要内容是()\n<span style='color: #FF0000;'>A.树立社会新风，建立新型人际关系</span>\n<span style='color: #FF0000;'>B.始终把革命利益放在首位</span>\n<span style='color: #FF0000;'>C.全心全意为人民服务</span>\n<span style='color: #FF0000;'>D.修身自律，保持节操</span>\n", "<span style='color: #47ceab;'>单选题：</span>国务院有权根据宪法和法律制定（）。\nA.法律\nB.部门规章\n<span style='color: #FF0000;'>C.行政法规</span>\nD.党的决定\n", "<span style='color: #47ceab;'>单选题：</span>下列选项中，（）反映的是一种享乐主义\nA.“穿别人的鞋，走自己的路，鞋破了不心疼”\nB.“各人自扫门前雪，莫管他人瓦上霜”\nC.“做人不能那么现实，一切都要向钱看”\n<span style='color: #FF0000;'>D.“今朝有酒今朝醉，管他明日谁是谁”</span>\n", "<span style='color: #47ceab;'>单选题：</span>爱因斯坦说：“一个人对社会的价值，首先取决于他的感情、思想和行动对增进人类利益有多大作用，而不应看他取得什么。”这句话的意思是说，人生的价值首先在于（）\nA.索取\nB.享用\nC.存在\n<span style='color: #FF0000;'>D.奉献</span>\n", "<span style='color: #47ceab;'>单选题：</span>2018年3月，（）通过宪法修正案，把国家倡导社会主义核心价值观正式写入宪法，进一步凸显了社会主义核心价值观的重大意义。\n<span style='color: #FF0000;'>A.十三届全国人大一次会议</span>\nB.十三届全国人大二次会议\nC.十九届一中全会\nD.十九届二中全会\n", "<span style='color: #47ceab;'>单选题：</span>法律作为上层建筑的重要组成部分，不是凭空出现的，而是产生于特定社会（）基础之上。\nA.统治阶级意志\n<span style='color: #FF0000;'>B.物质生活条件</span>\nC.政治权力\nD.文化生活条件\n", "<span style='color: #47ceab;'>单选题：</span>人生价值评价的根本尺度，是看一个人的人生活动（），是否促进了历史的进步。\n<span style='color: #FF0000;'>A.是否符合社会发展的客观规律</span>\nB.是否促进个人的发展\nC.是否促进生产关系的改善\nD.是否促进生产力的发展\n", "<span style='color: #47ceab;'>单选题：</span>马克思主义道德观认为，（）是道德产生的主观条件。\nA.判断能力\nB.人类语言\nC.思维能力\n<span style='color: #FF0000;'>D.人的自我意识</span>\n", "<span style='color: #47ceab;'>单选题：</span>自古以来，人们在探讨道德起源并提出了种种见解和理论，其中，马克思主义道德起源观是（）\nA.天意神启论\n<span style='color: #FF0000;'>B.生产方式论</span>\nC.情感欲望论\nD.先天人神论\n", "<span style='color: #47ceab;'>单选题：</span>理想的（），不仅体现为它受时代条件的制约，而且体现为它随着时代的发展而发展。\n<span style='color: #FF0000;'>A.时代性</span>\nB.实践性\nC.多样性\nD.超越性\n", "<span style='color: #47ceab;'>单选题：</span>（）是中国精神的忠实继承者和坚定弘扬者。\nA.中国人民\n<span style='color: #FF0000;'>B.中国共产党</span>\nC.中国先进知识分子\nD.中华民族\n", "<span style='color: #47ceab;'>单选题：</span>中华民族精神的核心是（）\nA.改革创新\n<span style='color: #FF0000;'>B.爱国主义</span>\nC.自强不息\nD.勤劳勇敢\n", "<span style='color: #47ceab;'>单选题：</span>（）是人们在实践中形成的、有实现可能性的、对未来社会和自身发展目标的向往与追求，是人们的世界观、人生观和价值观在奋斗目标上的集中体现。\nA.志向\n<span style='color: #FF0000;'>B.理想</span>\nC.信念\nD.信仰\n", "<span style='color: #47ceab;'>单选题：</span>（）体现了人们对自己祖国的深厚感情，揭示了个人对祖国的依存关系\nA.时代精神\n<span style='color: #FF0000;'>B.爱国主义</span>\nC.民族精神\nD.改革创新\n", "<span style='color: #47ceab;'>单选题：</span>马克思说过，真正现实人的存在，就是他为别人的存在和别人为他的存在。这说明（）\nA.人生价值的本质是社会对个人的尊重和满足\nB.人的价值就是人自身的存在\n<span style='color: #FF0000;'>C.人与自身的任何关系，只有通过人同其他人的关系才能得到实现和表现</span>\nD.人可以有受限制地创造出自己的价值\n", "<span style='color: #47ceab;'>单选题：</span>马克思主义道德观认为，道德起源的首要前提是（）\nA.自我意识\nB.社会关系\nC.实践\n<span style='color: #FF0000;'>D.劳动</span>\n", "<span style='color: #47ceab;'>单选题：</span>人生的社会价值是（）\n<span style='color: #FF0000;'>A.个体的实践活动对社会、他人所具有的价值</span>\nB.个体对自己生命活动需要的满足程度\nC.个体对自己生命存在的肯定\nD.个体对自己的尊重和个人的自我完善\n", "<span style='color: #47ceab;'>单选题：</span>马克思主义道德观认为，（）是道德赖以产生的客观条件。\nA.生产力\nB.生产方式\n<span style='color: #FF0000;'>C.社会关系</span>\nD.自我意识\n", "<span style='color: #47ceab;'>单选题：</span>法律所体现的统治阶级意志，并不是统治阶级意志的全部，仅仅是上升为（）的那部分意志。\nA.工人阶级意志\nB.全民意志\nC.党的意志\n<span style='color: #FF0000;'>D.国家意志</span>\n", "<span style='color: #47ceab;'>单选题：</span>（）和法治素养，是新时代大学生必须具备的基本素质。\nA.思想政治素质\nB.道德素质\n<span style='color: #FF0000;'>C.思想道德素质</span>\nD.个人修养\n", "<span style='color: #47ceab;'>单选题：</span>“知耻近乎勇”“礼义廉耻，国之四维”说的是人生矛盾中的（）\nA.苦乐观\nB.顺逆观\n<span style='color: #FF0000;'>C.荣辱观</span>\nD.生死观\n", "<span style='color: #47ceab;'>单选题：</span>（）作为兴国强国之魂，是实现中华民族伟大复兴不可或缺的精神支撑。\nA.中国共产党\nB.中华优秀传统文化\nC.中国人民\n<span style='color: #FF0000;'>D.中国精神</span>\n", "<span style='color: #47ceab;'>单选题：</span>关于社会主义法律下列说法不正确的是（）。\nA.是实现人民当家作主、实行人民民主专政的重要保证\nB.反映了社会主义生产关系的本质要求\nC.是最广大人民群众意志的集中体现\n<span style='color: #FF0000;'>D.有着与以往剥削阶级类型法律制度相同的经济基础与阶级本质</span>\n", "<span style='color: #47ceab;'>单选题：</span>下列有关人生价值评价的说法中，正确的是（）\nA.个人的行为动机越高尚，其人生价值也就越大\nB.个人从社会中得到的满足越多，其人生价值也就越大\n<span style='color: #FF0000;'>C.个人对社会的贡献越多，其人生价值也就越大</span>\nD.个人的能力越强，其人生价值也就越大\n", "<span style='color: #47ceab;'>单选题：</span>培育和弘扬社会主义核心价值观，必须从（）中汲取丰富营养。\nA.中华民族传统美德\nB.马克思主义理论\n<span style='color: #FF0000;'>C.中华优秀传统文化</span>\nD.中国特色社会主义理想信念\n", "<span style='color: #47ceab;'>单选题：</span>人生价值是自我价值和社会价值的统一。人生的自我价值主要表现为（）\nA.个人通过劳动、创造为社会和人民所做的贡献\n<span style='color: #FF0000;'>B.个体的人生活动对自己的生存和发展所具有的价值</span>\nC.国家对个人的积极评价\nD.社会对个人的尊重和满足\n", "<span style='color: #47ceab;'>单选题：</span>（）是一个民族在长期共同生活和社会实践中形成的，为本民族大多数所认同的价值取向、思维方式、道德规范、精神气质的总和\n<span style='color: #FF0000;'>A.民族精神</span>\nB.集体主义\nC.爱国主义\nD.文化传统\n", "<span style='color: #47ceab;'>单选题：</span>（）承载着一个民族、一个国家的精神追求，体现着一个社会评判是非曲直的价值标准。\nA.社会主义核心价值观\n<span style='color: #FF0000;'>B.核心价值观</span>\nC.中华民族伟大复兴的中国梦\nD.社会主义荣辱观\n", "<span style='color: #47ceab;'>单选题：</span>()是我们理解当前所处历史方位的关键词。\n<span style='color: #FF0000;'>A.新时代</span>\nB.新格局\nC.新举措\nD.新思想\n", "<span style='color: #47ceab;'>单选题：</span>人民群众是历史的创造者，是国家的主人，这种群众史观反映到人生观上必然是（)\n<span style='color: #FF0000;'>A.为人民服务</span>\nB.为个人谋利\nC.人生短暂，及时行乐\nD.主观为自己，客观为个人\n", "<span style='color: #47ceab;'>单选题：</span>（）是中国特色社会主义最本质的特征。\nA.改革开放\nB.人民当家作主\nC.依法治国\n<span style='color: #FF0000;'>D.中国共产党的领导</span>\n", "<span style='color: #47ceab;'>多选题：</span>历史和现实都告诉我们，只有（）。\n<span style='color: #FF0000;'>A.中国特色社会主义才能发展中国</span>\nB.中国特色社会主义才能救中国\nC.社会主义才能发展中国\n<span style='color: #FF0000;'>D.社会主义才能救中国</span>\n", "<span style='color: #47ceab;'>多选题：</span>辩证对待人生矛盾，包括树立正确的（）。\n<span style='color: #FF0000;'>A.得失观</span>\n<span style='color: #FF0000;'>B.荣辱观</span>\n<span style='color: #FF0000;'>C.苦乐观</span>\n<span style='color: #FF0000;'>D.生死观</span>\n", "<span style='color: #47ceab;'>多选题：</span>客观、公正地评价社会成员人生价值的大小，需要掌握恰当的评价方法，做到（）。\n<span style='color: #FF0000;'>A.坚持能力大小与贡献须尽力相统一</span>\nB.坚持动机和效果相统一\n<span style='color: #FF0000;'>C.坚持物质贡献与精神贡献相统一</span>\n<span style='color: #FF0000;'>D.坚持完善自身与贡献社会相统一</span>\n", "<span style='color: #47ceab;'>多选题：</span>大学阶段是（）形成的关键时期\nA.婚恋观\n<span style='color: #FF0000;'>B.人生观</span>\n<span style='color: #FF0000;'>C.价值观</span>\n<span style='color: #FF0000;'>D.世界观</span>\n", "<span style='color: #47ceab;'>多选题：</span>信念是（）的有机统一体，为人们矢志不渝、百折不挠地追求理想目标提供了强大的精神动力。\n<span style='color: #FF0000;'>A.认知</span>\n<span style='color: #FF0000;'>B.意志</span>\n<span style='color: #FF0000;'>C.情感</span>\nD.道德\n", "<span style='color: #47ceab;'>多选题：</span>在道德的功能系统中，主要的功能包括()\n<span style='color: #FF0000;'>A.规范功能</span>\n<span style='color: #FF0000;'>B.认识功能</span>\nC.导向功能\n<span style='color: #FF0000;'>D.调节功能</span>\n", "<span style='color: #47ceab;'>多选题：</span>以下体现注重整体利益，强调责任奉献的是()\n<span style='color: #FF0000;'>A.苟利国家生死以</span>\n<span style='color: #FF0000;'>B.夙夜在公</span>\nC.见贤思齐焉，见不贤而内自省也\n<span style='color: #FF0000;'>D.以公灭私，民其允怀</span>\n", "<span style='color: #47ceab;'>多选题：</span>与历史上一切剥削阶级道德相比，社会主义道德的先进性特征()\n<span style='color: #FF0000;'>A.对人类优秀道德资源的批判继承和创新发展</span>\n<span style='color: #FF0000;'>B.克服了以往阶级社会道德的片面性和局限性</span>\n<span style='color: #FF0000;'>C.社会主义经济基础的反映</span>\nD.通过社会舆论和国家强制力量来维持\n", "<span style='color: #47ceab;'>多选题：</span>在对待传统道德的问题上，下列属于错误思潮的是()\nA.吸取借鉴优良的道德文明成果\n<span style='color: #FF0000;'>B.实行历史虚无主义，中国要全盘西化</span>\n<span style='color: #FF0000;'>C.坚持文化复古主义，中国的落后就是因为儒家文化的失落</span>\nD.古为今用、推陈出新\n", "<span style='color: #47ceab;'>多选题：</span>在我国现阶段，确立科学高尚的人生追求，就是确立服务人民、奉献社会的人生追求。这是因为，一个人确立了服务人民、奉献社会的人生追求()\n<span style='color: #FF0000;'>A.以正确的人生态度对待人生</span>\n<span style='color: #FF0000;'>B.深刻理解人为什么活，应走什么样的人生之路</span>\n<span style='color: #FF0000;'>C.清楚地把握人的生命历程和奋斗目标</span>\n<span style='color: #FF0000;'>D.掌握正确的人生价值标准</span>\n", "<span style='color: #47ceab;'>多选题：</span>人生观主要包括（）\n<span style='color: #FF0000;'>A.人生态度</span>\n<span style='color: #FF0000;'>B.人生目的</span>\nC.人生的生活水平\n<span style='color: #FF0000;'>D.人生价值</span>\n", "<span style='color: #47ceab;'>多选题：</span>以下体现推崇“仁爱”原则，注重以和为贵基本精神的是()\n<span style='color: #FF0000;'>A.仁者自爱</span>\n<span style='color: #FF0000;'>B.兼相爱，交相利</span>\n<span style='color: #FF0000;'>C.亲亲而仁民</span>\n<span style='color: #FF0000;'>D.己欲立而立人</span>\n", "<span style='color: #47ceab;'>多选题：</span>爱国主义的基本内涵表现在（）\n<span style='color: #FF0000;'>A.爱祖国的大好河山</span>\n<span style='color: #FF0000;'>B.爱祖国的灿烂文化</span>\n<span style='color: #FF0000;'>C.爱自己的国家</span>\n<span style='color: #FF0000;'>D.爱自己的骨肉同胞</span>\n", "<span style='color: #47ceab;'>多选题：</span>中国人民在长期奋斗中，培育、继承、发展起来的伟大中国精神，包括（）\n<span style='color: #FF0000;'>A.伟大梦想精神</span>\n<span style='color: #FF0000;'>B.伟大奋斗精神</span>\n<span style='color: #FF0000;'>C.伟大创造精神</span>\n<span style='color: #FF0000;'>D.伟大团结精神</span>\n", "<span style='color: #47ceab;'>多选题：</span>社会主义核心价值观和社会主义核心价值体系，两者是（）的。\n<span style='color: #FF0000;'>A.紧密联系</span>\n<span style='color: #FF0000;'>B.相辅相成</span>\n<span style='color: #FF0000;'>C.互为依存</span>\nD.继承与发展\n", "<span style='color: #47ceab;'>多选题：</span>社会主义核心价值观体现了社会主义的本质要求，是对我们要（）等重大问题的深刻解答。\nA.坚持什么样的道路\n<span style='color: #FF0000;'>B.建设什么样的国家</span>\n<span style='color: #FF0000;'>C.培养什么样的公民</span>\n<span style='color: #FF0000;'>D.建设什么样的社会</span>\n"];
    const domainList = ["course.nczy.edu.cn"];

    console.clear();
    const encryptMessage = (inputMessage) => {
        const keyBytes = "qzkj1kjghd=876&*";
        const inputMessageWithQuotes = `"${inputMessage}"`;

        try {
            const aesCipher = CryptoJS.enc.Utf8.parse(keyBytes);
            const paddedMessage = CryptoJS.enc.Utf8.parse(inputMessageWithQuotes);
            const encryptedMessage = CryptoJS.AES.encrypt(paddedMessage, aesCipher, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7,
            });

            const base64Encoded = CryptoJS.enc.Base64.stringify(encryptedMessage.ciphertext);
            return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(base64Encoded));
        } catch (e) {
            throw new Error("err: " + e.message);
        }
    };

    const addCSS = () => {
        const css = `#uniqueOverlay{position:fixed;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,0.5);z-index:999;backdrop-filter:blur(5px)}#uniquePopup{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background-color:var(--popup-bg-color,#fff);padding:20px;border-radius:5px;box-shadow:0 4px 6px rgba(0,0,0,0.1);z-index:1000;display:flex;flex-direction:column;align-items:center;width:80%;max-width:400px}#popupTitle{margin-top:0;margin-bottom:5px;padding-top:5px;display:flex;align-items:center;border-bottom:1px solid #ccc;padding-bottom:5px;width:100%;font-size:18px;color:var(--title-text-color,#000)}#popupTitle i{margin-right:5px;color:var(--icon-color,#000)}#popupContent{margin-top:10px;margin-bottom:5px;text-align:left;color:var(--content-text-color,#333)}#PublicKey{margin-bottom:15px;cursor:pointer;display:flex;align-items:center;transition:background-color 0.3s;background-color:var(--public-key-btn-bg-color,#007bff);color:var(--public-key-btn-text-color,#fff);border:none;padding:5px 10px;border-radius:3px}#PublicKey:hover{background-color:var(--public-key-btn-hover-bg-color,#0056b3)}#PublicKey i{margin-right:5px}.input-field{width:90%;padding:10px;margin-bottom:10px;border:1px solid #ccc;border-radius:3px;background-color:var(--input-bg-color,#f0f0f0);font-size:16px}#copyButton,#executeButton{background-color:var(--button-bg-color,#007bff);color:var(--button-text-color,#fff);border:none;padding:5px 10px;border-radius:3px;cursor:pointer;margin-right:5px;display:flex;align-items:center}#copyButton i,#executeButton i{margin-right:5px}#copyButton:hover,#executeButton:hover{background-color:var(--button-hover-bg-color,#0056b3)}.button-container{display:flex;justify-content:center}@media (prefers-color-scheme:dark){:root{--popup-bg-color:#333;--public-key-btn-bg-color:#007bff;--public-key-btn-text-color:#fff;--public-key-btn-hover-bg-color:#0056b3;--button-bg-color:#007bff;--button-text-color:#fff;--button-hover-bg-color:#0056b3;--input-bg-color:#444;--title-text-color:#fff;--content-text-color:#ccc;--icon-color:#fff}}@media (max-width:768px){#uniquePopup{width:80%}}.qmsg.qmsg-wrapper{position:fixed;top:20px;left:0;z-index:1010;width:100%;pointer-events:none;color:rgba(0,0,0,0.55);font-size:13px;font-variant:tabular-nums;font-feature-settings:"tnum"}.qmsg .qmsg-item{padding:8px;text-align:center;animation-duration:.3s}.qmsg .qmsg-item .qmsg-content{text-align:left;position:relative;display:inline-block;padding:10px 12px;background:#fff;border-radius:4px;box-shadow:0 4px 12px rgba(0,0,0,0.15);pointer-events:all;max-width:80%;min-width:80px}.qmsg .qmsg-item .qmsg-content [class^=qmsg-content-]{display:flex;align-items:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.qmsg .qmsg-item .qmsg-content [class^=qmsg-content-] .qmsg-icon{display:inline-block;height:16px}.qmsg .qmsg-item .qmsg-content [class^=qmsg-content-] .qmsg-icon:first-child{margin-right:8px}.qmsg .qmsg-item .qmsg-content [class^=qmsg-content-] .qmsg-icon-close{cursor:pointer;color:rgba(0,0,0,0.45);transition:color .3s;margin-left:6px}.qmsg .qmsg-item .qmsg-content [class^=qmsg-content-] .qmsg-icon-close:hover>svg path{stroke:#555}.qmsg .qmsg-item .qmsg-content [class^=qmsg-content-] .qmsg-count{display:inline-block;position:absolute;left:-8px;top:-8px;color:#fff;font-size:12px;text-align:center;height:16px;line-height:16px;border-radius:3px;min-width:16px;animation-duration:.3s}.qmsg .qmsg-item .qmsg-content-info{color:#909399}.qmsg .qmsg-item .qmsg-content-info .qmsg-count{background-color:#909399}.qmsg .qmsg-item .qmsg-content-warning{color:#e6a23c}.qmsg .qmsg-item .qmsg-content-warning .qmsg-count{background-color:#e6a23c}.qmsg .qmsg-item .qmsg-content-error{color:#f56c6c}.qmsg .qmsg-item .qmsg-content-error .qmsg-count{background-color:#f56c6c}.qmsg .qmsg-item .qmsg-content-success{color:#67c23a}.qmsg .qmsg-item .qmsg-content-success .qmsg-count{background-color:#67c23a}.qmsg .qmsg-item .qmsg-content-loading{color:#409eff}.qmsg .qmsg-item .qmsg-content-loading .qmsg-count{background-color:#409eff}.qmsg .animate-turn{animation:MessageTurn 1s linear infinite}@keyframes MessageTurn{0%{transform:rotate(0deg)}25%{transform:rotate(90deg)}50%{transform:rotate(180deg)}75%{transform:rotate(270deg)}100%{transform:rotate(360deg)}}@keyframes MessageMoveOut{0%{max-height:150px;padding:8px;opacity:1}to{max-height:0;padding:0;opacity:0}}@keyframes MessageMoveIn{0%{transform:translateY(-100%);transform-origin:0 0;opacity:0}to{transform:translateY(0);transform-origin:0 0;opacity:1}}@keyframes MessageShake{0%,100%{transform:translateX(0px);opacity:1}25%,75%{transform:translateX(-4px);opacity:.75}50%{transform:translateX(4px);opacity:.25}}`;
        const styleElement = document.createElement('style');
        styleElement.appendChild(document.createTextNode(css));
        document.head.appendChild(styleElement);
        // 引入FontAwesome图标库
        const fontAwesomeLink = document.createElement('link');
        fontAwesomeLink.rel = 'stylesheet';
        fontAwesomeLink.href = 'https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.css';
        document.head.appendChild(fontAwesomeLink);
    };

    // 生成 UUID 的函数
    const generateUniqueId = () => {
        const characters = 'CXBjVgIxFkNwhArqZipEbPWvTd410t32KeOQa8MuRULDclG5SmJ97snoYfz6Hy';
        const length = 8;
        let result = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }
        return result;
    }

    const handleSelection = () => {
        let selectedText = '';

        if (window.getSelection) {
            const selection = window.getSelection();
            const anchorNode = selection.anchorNode;

            // 检查选中的内容是否来自 inputBox 元素
            if (anchorNode && $(anchorNode).closest('#inputBox').length > 0) {
                return '';
            }

            selectedText = selection.toString();
        } else if (document.selection) {
            // 老IE浏览器
            const userSelection = document.selection.createRange();
            selectedText = userSelection.text;
        }

        return selectedText.replace(/\s+/g, '');
    };

    class Search {
        constructor(list) {
            this.originalList = list;
            this.processedStringsCache = new Map();

            // 使用箭头函数以保持this上下文
            this.processedList = list.map((item) => this.processString(item));
        }

        processString(str) {
            if (this.processedStringsCache.has(str)) {
                return this.processedStringsCache.get(str);
            }

            let processedString = str.replace(/<[^>]*>/g, "")
                .replace(/[^a-zA-Z\u4E00-\u9FA5]/g, "");
            this.processedStringsCache.set(str, processedString);
            return processedString;
        }

        search(input) {
            const searchString = this.processString(input);
            const match = searchString.length > 5 ? searchString.substring(0, 5) + '...' : searchString;
            console.log(` - 开始搜索：${match}`);

            return this.processedList
                .reduce((results, str, index) => {
                    const matchDegree = this.calculateMatchDegree(str, searchString);
                    if (matchDegree > 0) {
                        results.push({ match: this.originalList[index], matchDegree });
                    }
                    return results;
                }, [])
                .sort((a, b) => b.matchDegree - a.matchDegree)
                .slice(0, 5);
        }

        calculateMatchDegree(str, searchString) {
            const distance = this.levenshteinDistance(str, searchString);
            const maxLength = Math.max(str.length, searchString.length);
            return maxLength === 0 ? 1 : 1 - (distance / maxLength);
        }

        levenshteinDistance(a, b) {
            if (a.length == 0) return b.length;
            if (b.length == 0) return a.length;

            const matrix = [Array(b.length + 1).fill(0), Array(b.length + 1).fill(0)];

            for (let i = 0; i <= b.length; i++) {
                matrix[0][i] = i;
            }

            for (let i = 1; i <= a.length; i++) {
                matrix[1][0] = i;

                for (let j = 1; j <= b.length; j++) {
                    if (a.charAt(i - 1) == b.charAt(j - 1)) {
                        matrix[1][j] = matrix[0][j - 1];
                    } else {
                        matrix[1][j] = Math.min(matrix[0][j - 1] + 1,
                                                Math.min(matrix[1][j - 1] + 1,
                                                         matrix[0][j] + 1));
                    }
                }

                [matrix[0], matrix[1]] = [matrix[1], matrix[0]];
            }

            return matrix[0][b.length];
        }
    }

    class FloatingWindow {
        constructor() {
            this.window = null;
            this.addStyles();
        }

        addStyles() {
            const style = document.createElement('style');
            style.innerHTML = `:root{--floating-window-bg:#ffffff;--title-bar-bg:#f0f0f0;--text-color-primary:#000000;--text-color-secondary:#4d4d4d;--scrollbar-thumb-color:rgba(0,0,0,0.2);--scrollbar-thumb-hover-color:rgba(0,0,0,0.4)}@media (prefers-color-scheme:dark){:root{--floating-window-bg:#1f1f1f;--title-bar-bg:#2c2c2c;--text-color-primary:#ffffff;--text-color-secondary:#b3b3b3;--scrollbar-thumb-color:rgba(255,255,255,0.2);--scrollbar-thumb-hover-color:rgba(255,255,255,0.4)}}.floating-window{position:fixed;box-shadow:0 8px 16px rgba(0,0,0,0.3);z-index:1000;background-color:var(--floating-window-bg);border-radius:4px;overflow:hidden;user-select:none;width:400px;height:251px;top:25%;right:25%}@media screen and (max-width:768px){.floating-window{width:80%;height:30%;top:10%;right:5%}}.floating-window-overlay{position:fixed;top:0;left:0;width:100%;height:100%;z-index:999;background-color:transparent}.floating-window #titleBar{background-color:var(--title-bar-bg);padding:2px 8px 0 8px;display:flex;align-items:center;justify-content:space-between;border-top-left-radius:4px;border-top-right-radius:4px;white-space:nowrap}.floating-window h3{margin-top:4px;color:var(--text-color-primary);padding-bottom:0}.floating-window .content{padding:10px;padding-top:4px;padding-bottom:32px;overflow-y:auto;max-height:calc(100% - 64px);position:relative}.floating-window .resize-button-container{position:absolute;bottom:4px;float:left;right:2px;margin:4px}.floating-window .resize-button{background:none;border:none;cursor:nwse-resize;padding:0;font-size:16px;color:var(--text-color-primary)}.floating-window p{margin:0;color:var(--text-color-secondary)}.floating-window .close-button{background:none;border:none;cursor:pointer;font-size:16px;color:var(--text-color-primary)}@media (max-width:767px){.floating-window #titleBar{font-size:14px;line-height:1.2}}::-webkit-scrollbar{width:8px;height:8px}::-webkit-scrollbar-thumb{background-color:var(--scrollbar-thumb-color);border-radius:4px}::-webkit-scrollbar-thumb:hover{background-color:var(--scrollbar-thumb-hover-color)}::-webkit-scrollbar-track{background-color:transparent}`;
            document.head.appendChild(style);
        }

        create(title, text) {
            if (window.getSelection) {
                const selection = window.getSelection();
                if (selection.rangeCount > 0) {
                    selection.removeAllRanges();
                }
            }
            if (this.window) {
                this.close();
            }

            this.window = $('<div>').addClass('floating-window');

            const titleBar = $('<div>').attr('id', 'titleBar');

            const titleElement = $('<h3>').text(title);

            titleBar.append(titleElement);
            this.addCloseButton(titleBar);
            this.window.append(titleBar);

            const content = $('<div>').addClass('content');
            const paragraph = $('<p>').html(text.replace(/\n/g, '<br>'));
            content.append(paragraph);
            this.window.append(content);

            this.addResizeButton();
            this.addDragFunctionality();

            $('body').append(this.window);
        }

        addCloseButton(titleBar) {
            const closeButton = $('<button>')
                .addClass('close-button')
                .html('<i class="fa fa-times"></i>')
                .on('click touchend', (e) => {
                    e.preventDefault();
                    this.close();
                });

            titleBar.append(closeButton);
        }

        addResizeButton() {
            const resizeButtonContainer = $('<div>').addClass('resize-button-container'); // 创建 .resize-button-container 容器
            const resizeButton = $('<button>')
                .addClass('resize-button')
                .html('<i class="fa fa-arrows-alt"></i>');

            let isResizing = false;
            let startX, startY, startWidth, startHeight;

            const startResize = (e) => {
                e.preventDefault();
                isResizing = true;
                startX = e.clientX || e.touches[0].clientX;
                startY = e.clientY || e.touches[0].clientY;
                startWidth = parseInt(document.defaultView.getComputedStyle(this.window[0]).width, 10);
                startHeight = parseInt(document.defaultView.getComputedStyle(this.window[0]).height, 10);
                $(document).on('mousemove touchmove', resize);
                $(document).on('mouseup touchend', stopResize);
            };

            resizeButton.on('mousedown', startResize);
            resizeButton.on('touchstart', startResize); // 添加 touchstart 事件监听器

            const resize = (e) => {
                if (!isResizing) return;
                const clientX = e.clientX || e.touches[0].clientX;
                const clientY = e.clientY || e.touches[0].clientY;
                const dx = clientX - startX;
                const dy = clientY - startY;

                const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                let newWidth = startWidth + dx;
                let newHeight = startHeight + dy;

                // 限制悬浮窗大小始终保持在视口内
                newWidth = Math.max(100, Math.min(newWidth, screenWidth - this.window.position().left));
                newHeight = Math.max(100, Math.min(newHeight, screenHeight - this.window.position().top));

                this.window.css({ width: `${newWidth}px`, height: `${newHeight}px` });
            }

            const stopResize = () => {
                isResizing = false;
                $(document).off('mousemove', resize);
                $(document).off('mouseup', stopResize);
                $(document).off('touchmove', resize); // 添加 touchmove 事件监听器
                $(document).off('touchend', stopResize); // 添加 touchend 事件监听器
            };

            resizeButtonContainer.append(resizeButton); // 将 .resize-button 添加到 .resize-button-container 中
            this.window.append(resizeButtonContainer); // 将 .resize-button-container 添加到悬浮窗中
        }


        addDragFunctionality() {
            let isDragging = false;
            let startX, startY, startTop, startLeft;

            const dragStart = (e) => {
                // 检查是否点击了标题栏
                if (!$(e.target).is('#titleBar, #titleBar *')) return;

                e.preventDefault();
                isDragging = true;
                startX = e.clientX || e.touches[0].clientX;
                startY = e.clientY || e.touches[0].clientY;
                startTop = parseInt(document.defaultView.getComputedStyle(this.window[0]).top, 10);
                startLeft = parseInt(document.defaultView.getComputedStyle(this.window[0]).left, 10);
                $(document).on('mousemove touchmove', drag);
                $(document).on('mouseup touchend', dragEnd);
            };

            this.window.on('mousedown', dragStart);
            this.window.on('touchstart', dragStart); // 添加 touchstart 事件监听器

            const drag = (e) => {
                if (!isDragging) return;

                // 使用 requestAnimationFrame 控制重绘频率
                requestAnimationFrame(() => {
                    const clientX = e.clientX || e.touches[0].clientX; // 修改此处
                    const clientY = e.clientY || e.touches[0].clientY; // 修改此处
                    const dx = clientX - startX;
                    const dy = clientY - startY;
                    let newTop = startTop + dy;
                    let newLeft = startLeft + dx;
                    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                    const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

                    // 限制窗口位置始终保持在视口内
                    newTop = Math.max(0, Math.min(newTop, screenHeight - this.window.height()));
                    newLeft = Math.max(0, Math.min(newLeft, screenWidth - this.window.width()));

                    this.window.css({ top: `${newTop}px`, left: `${newLeft}px` });
                });
            };

            const dragEnd = () => {
                isDragging = false;
                $(document).off('mousemove', drag);
                $(document).off('mouseup', dragEnd);
                $(document).off('touchmove', drag); // 添加 touchmove 事件监听器
                $(document).off('touchend', dragEnd); // 添加 touchend 事件监听器
            };

            this.window.on('mousedown touchstart', dragStart);
        }

        close() {
            if (this.window) {
                this.window.remove();
                this.window = null;
            }
        }
    }

    class PopupManager {
        // 构造函数用于初始化一些属性和绑定函数的this环境
        constructor(uuid) {
            // uuid用于唯一标识每一个PopupManager实例
            this.uuid = uuid;
            // 绑定this环境
            this.createPopups = this.createPopups.bind(this);
            this.hidePopups = this.hidePopups.bind(this);
            this.processUserInput = this.processUserInput.bind(this);
            this.checkStringEquality = this.checkStringEquality.bind(this);
        }

        // createPopups函数用于创建一个包含标题，内容和一些按钮的弹出窗口
        createPopups(title, content, PublicKey) {
            // 创建一个覆盖层
            let overlay = $('<div id="uniqueOverlay"></div>');
            // 创建一个弹出窗口
            let popup = $('<div id="uniquePopup"></div>');
            // 创建弹出窗口的标题
            let popupTitle = $('<h3 id="popupTitle"></h3>').html('<i class="fa fa-lock"></i>' + title);
            // 创建弹出窗口的内容
            let popupContent = $('<p id="popupContent"></p>').text(content);
            // 创建一个段落显示公钥
            let helloWorld = $('<button id="PublicKey" class="public-key-btn"><i class="fa fa-key"></i>' + PublicKey + '</button>');
            // 创建一个输入框，用于输入密码
            let inputBox = $('<input type="password" id="inputBox" class="input-field" placeholder="请输入密钥">');

            // 创建一个按钮，用于粘贴密码
            let copyButton = $('<button id="copyButton"><i class="fa fa-copy"></i>复制公钥</button>');
            // 创建一个按钮，用于提交密码
            let executeButton = $('<button id="executeButton"><i class="fa fa-check"></i>验证密钥</button>');

            // 创建一个按钮容器，用于存放按钮
            let buttonContainer = $('<div class="button-container"></div>');

            // 将按钮添加到按钮容器中
            buttonContainer.append(copyButton, executeButton);

            // 将所有组件添加到弹出窗口中
            popup.append(popupTitle, popupContent, helloWorld, inputBox, buttonContainer);
            // 将覆盖层和弹出窗口添加到body元素中
            $('body').append(overlay, popup);

            // 为copyButton添加点击事件
            const copyToClipboard = (text) => {
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(text).then(
                        () => {
                            Qmsg.success('已复制公钥到剪贴板');
                        },
                        (err) => {
                            Qmsg.error('复制失败：' + err);
                        }
                    );
                } else {
                    const textarea = document.createElement('textarea');
                    textarea.value = text;
                    document.body.appendChild(textarea);
                    textarea.select();
                    try {
                        document.execCommand('copy');
                        Qmsg.success('已复制公钥到剪贴板');
                    } catch (err) {
                        Qmsg.error('复制失败：' + err);
                    } finally {
                        document.body.removeChild(textarea);
                    }
                }
            };

            $('body').on('click', '#copyButton', () => {
                try {
                    copyToClipboard(PublicKey);
                } catch (err) {
                    Qmsg.error('复制失败：' + err);
                }
            });

            $('body').on('click', '#PublicKey', () => {
                try {
                    copyToClipboard(PublicKey);
                } catch (err) {
                    Qmsg.error('复制失败：' + err);
                }
            });

            // 为executeButton添加点击事件，处理用户的输入
            $('body').on('click', '#executeButton', () => this.processUserInput());
        }


        // hidePopups函数用于隐藏弹出窗口，并将其他元素设置为可见
        hidePopups() {
            $('#uniqueOverlay, #uniquePopup').remove();
        }

        checkStringEquality(inputString) {
            return inputString === this.uuid;
        }

        // processUserInput函数用于处理用户输入的密码，并发送POST请求
        processUserInput() {
            // 获取输入框的值，并做一些清理工作
            let inputValue = $('#inputBox').val().trim();
            if (inputValue === '') {
                Qmsg.error('请输入密钥！')
                return;
            }
            if (this.checkStringEquality(inputValue)) {
                Qmsg.success('密钥正确！')
                localStorage.setItem('isPopupNeeded', inputValue);
                this.hidePopups();
            } else {
                Qmsg.error('密钥错误！')
            }
        }

        checkLocalStorageAndCreatePopups(title, content, PublicKey) {
            if (!this.checkStringEquality(localStorage.getItem('isPopupNeeded'))) {
                this.createPopups(title, content, PublicKey);
            }
        }
    }

    if (domainList.includes(window.location.hostname)) {
        // 禁止切屏检测
        Object.defineProperty(document, 'hidden', {
            value: false
        });
        Object.defineProperty(document, 'visibilityState', {
            value: 'visible'
        });
        addCSS();
        let date = new Date()
        let a = 'background: #606060; color: #fff; border-radius: 3px 0 0 3px;'
        let b = 'background: #1475B2; color: #fff; border-radius: 0 3px 3px 0;'
        console.log(`%c 当前时间 : %c ${date} `, a, b)
        console.log("\n %c 青柠助手" + "启动成功" + " Pro %c", "color:#fff;background:linear-gradient(90deg,#448bff,#44e9ff);padding:5px 0;", "color:#000;background:linear-gradient(90deg,#44e9ff,#ffffff);padding:5px 10px 5px 0px;");

        // 从本地存储中获取 uuid
        let uuid = localStorage.getItem('uuid');

        // 如果uuid不存在或者为空，则生成并存储一个新的uuid
        if (!uuid || uuid === '') {
            // 使用 getUuid 生成 16 位 uuid，基数为 16
            uuid = generateUniqueId();
            // 存储到本地
            localStorage.setItem('uuid', uuid);
        }

        const PublicKey = encryptMessage(uuid);
        let PopupManage = new PopupManager(PublicKey);

        PopupManage.checkLocalStorageAndCreatePopups('请输入密钥', '请输入您的密钥，如果没有密钥，请联系管理员获取', uuid);
        const similaritySearch = new Search(searchList);
        // 确保jQuery加载完成
        $(document).ready(function () {
            Qmsg.closeAll();
            Qmsg.success('青柠助手已启动');
            const floatingWindow = new FloatingWindow();

            $(document).on('mouseup touchend keyup', () => {
                if (localStorage.getItem('isPopupNeeded') === PublicKey) {
                    const query = handleSelection();

                    if (query) {
                        const results = similaritySearch.search(query);
                        console.log(` - 搜索结束，共 ${results.length} 个结果：`);
                        handleResults(results);
                    }
                }
            });

            const handleResults = (results) => {
                if (results.length === 0) {
                    floatingWindow.create('青柠助手', '没有匹配结果。');
                } else {
                    let totalSimilarity = 0;
                    const outputString = results.map((result) => {
                        let similarityPercentage = (result.matchDegree * 100).toFixed(2);
                        totalSimilarity += result.matchDegree;
                        let resultStr = result.match.endsWith('\n') ? result.match : result.match + '\n';
                        return `${resultStr}匹配度: <span style='color: #3FBF3F;'>${similarityPercentage} </span>%\n`;
                    }).join('\n');

                    const averageSimilarity = (totalSimilarity / results.length * 100).toFixed(2);
                    const finalOutput = `${outputString}\n平均匹配度: <span style='color: #3FBF3F;'>${averageSimilarity} </span>%`;

                    floatingWindow.create('青柠助手', finalOutput);
                }
            }
        });
        Qmsg.loading('青柠助手加载中...');
    }
})();