// Template Name: Educate
// Template URL: https://techpedia.co.uk/template/Educate
// Description: Educate Html 5 Template
// Version: 1.0.0

(function (window, document, $, undefined) {
  "use strict";
  var Init = {
    i: function (e) {
      Init.s();
      Init.methods();
    },
    s: function (e) {
      (this._window = $(window)),
        (this._document = $(document)),
        (this._body = $("body")),
        (this._html = $("html"));
    },
    methods: function (e) {
      Init.w();
      Init.BackToTop();
      Init.preloader();
      Init.wow();
      Init.magnifying();
      Init.tilt();
      Init.niceSelect();
      Init.odometer();
      Init.header();
      Init.searchToggle();
      Init.cursor();
      Init.countdownInit(".countdown", "2024/12/01");
      Init.passwordHide();
      Init.initializeSlick();
      Init.formValidation();
      Init.contactForm();
    },

    w: function (e) {
      this._window.on("load", Init.l).on("scroll", Init.res);
    },

    /*-- Back-to-top --*/
    BackToTop: function () {
      let scrollTop = $(".scroll-top path");
      if (scrollTop.length) {
        var e = document.querySelector(".scroll-top path"),
          t = e.getTotalLength();
        (e.style.transition = e.style.WebkitTransition = "none"),
          (e.style.strokeDasharray = t + " " + t),
          (e.style.strokeDashoffset = t),
          e.getBoundingClientRect(),
          (e.style.transition = e.style.WebkitTransition =
            "stroke-dashoffset 10ms linear");
        var o = function () {
          var o = $(window).scrollTop(),
            r = $(document).height() - $(window).height(),
            i = t - (o * t) / r;
          e.style.strokeDashoffset = i;
        };
        o(), $(window).scroll(o);
        var back = $(".scroll-top"),
          body = $("body, html");
        $(window).on("scroll", function () {
          if ($(window).scrollTop() > $(window).height()) {
            back.addClass("scroll-top--active");
          } else {
            back.removeClass("scroll-top--active");
          }
        });
      }
    },
    // PreLoader
    preloader: function () {
      setTimeout(function () {
        $("#preloader").hide("slow");
      }, 2000);
    },
    // Wow
    wow: function () {
      if ($(".wow").length) {
        var wow = new WOW({
          boxClass: "wow", // animated element css class (default is wow)
          animateClass: "animated", // animation css class (default is animated)
          mobile: true, // trigger animations on mobile devices (default is true)
          live: true, // act on asynchronously loaded content (default is true)
        });
        wow.init();
      }
    },
    // Magnifying Popup
    magnifying: function () {
      if ($(".video-popup").length) {
        $(".video-popup").magnificPopup({
          type: "iframe",
          mainClass: "mfp-fade",
          removalDelay: 160,
          preloader: true,
          fixedContentPos: false,
        });
      }
    },
    // Nice Select
    niceSelect: function () {
      if ($(".has-nice-select").length) {
        $(".has-nice-select, .contact-form select").niceSelect();
      }
    },

    // Tilt
    tilt: function () {
      let educateTiltElm = $(".educate-tilt");
      if (educateTiltElm.length) {
        educateTiltElm.each(function () {
          let self = $(this);
          let options = self.data("tilt-options");
          let educateTilt = self.tilt(
            "object" === typeof options ? options : JSON.parse(options)
          );
        });
      }
    },
    // odometer
    odometer: function () {
      if ($(".count_one").length) {
        $(".count_one").appear(function (e) {
          var odo = $(".count_one");
          odo.each(function () {
            var countNumber = $(this).attr("data-count");
            $(this).html(countNumber);
          });
        });
      }
    },
    // Header
    header: function () {
      function dynamicCurrentMenuClass(selector) {
        let FileName = window.location.href.split("/").reverse()[0];

        selector.find("li").each(function () {
          let anchor = $(this).find("a");
          if ($(anchor).attr("href") == FileName) {
            $(this).addClass("current");
          }
        });
        selector.children("li").each(function () {
          if ($(this).find(".current").length) {
            $(this).addClass("current");
          }
        });
        if ("" == FileName) {
          selector.find("li").eq(0).addClass("current");
        }
      }

      if ($(".main-menu__list").length) {
        let mainNavUL = $(".main-menu__list");
        dynamicCurrentMenuClass(mainNavUL);
      }

      if ($(".main-menu__nav").length && $(".mobile-nav__container").length) {
        let navContent = document.querySelector(".main-menu__nav").innerHTML;
        let mobileNavContainer = document.querySelector(
          ".mobile-nav__container"
        );
        mobileNavContainer.innerHTML = navContent;
      }
      if ($(".sticky-header__content").length) {
        let navContent = document.querySelector(".main-menu").innerHTML;
        let mobileNavContainer = document.querySelector(
          ".sticky-header__content"
        );
        mobileNavContainer.innerHTML = navContent;
      }

      if ($(".mobile-nav__container .main-menu__list").length) {
        let dropdownAnchor = $(
          ".mobile-nav__container .main-menu__list .dropdown > a"
        );
        dropdownAnchor.each(function () {
          let self = $(this);
          let toggleBtn = document.createElement("BUTTON");
          toggleBtn.setAttribute("aria-label", "dropdown toggler");
          toggleBtn.innerHTML = "<i class='fa fa-angle-down'></i>";
          self.append(function () {
            return toggleBtn;
          });
          self.find("button").on("click", function (e) {
            e.preventDefault();
            let self = $(this);
            self.toggleClass("expanded");
            self.parent().toggleClass("expanded");
            self.parent().parent().children("ul").slideToggle();
          });
        });
      }

      if ($(".mobile-nav__toggler").length) {
        $(".mobile-nav__toggler").on("click", function (e) {
          e.preventDefault();
          $(".mobile-nav__wrapper").toggleClass("expanded");
          $("body").toggleClass("locked");
        });
      }

      $(window).on("scroll", function () {
        if ($(".stricked-menu").length) {
          var headerScrollPos = 130;
          var stricky = $(".stricked-menu");
          if ($(window).scrollTop() > headerScrollPos) {
            stricky.addClass("stricky-fixed");
          } else if ($(this).scrollTop() <= headerScrollPos) {
            stricky.removeClass("stricky-fixed");
          }
        }
      });
    },

    // Search Toggle
    searchToggle: function () {
      if ($(".search-toggler").length) {
        $(".search-toggler").on("click", function (e) {
          e.preventDefault();
          $(".search-popup").toggleClass("active");
          $(".mobile-nav__wrapper").removeClass("expanded");
          $("body").toggleClass("locked");
        });
      }
    },

    // Cursor
    cursor: function () {
      if ($(".custom-cursor").length) {
        var cursor = document.querySelector(".custom-cursor__cursor");
        var cursorinner = document.querySelector(".custom-cursor__cursor-two");
        var a = document.querySelectorAll("a");

        document.addEventListener("mousemove", function (e) {
          var x = e.clientX;
          var y = e.clientY;
          cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
        });

        document.addEventListener("mousemove", function (e) {
          var x = e.clientX;
          var y = e.clientY;
          cursorinner.style.left = x + "px";
          cursorinner.style.top = y + "px";
        });

        document.addEventListener("mousedown", function () {
          cursor.classList.add("click");
          cursorinner.classList.add("custom-cursor__innerhover");
        });

        document.addEventListener("mouseup", function () {
          cursor.classList.remove("click");
          cursorinner.classList.remove("custom-cursor__innerhover");
        });

        a.forEach((item) => {
          item.addEventListener("mouseover", () => {
            cursor.classList.add("custom-cursor__hover");
          });
          item.addEventListener("mouseleave", () => {
            cursor.classList.remove("custom-cursor__hover");
          });
        });
      }
    },
    // Count Down
    countdownInit: function (countdownSelector, countdownTime) {
      var eventCounter = $(countdownSelector);
      if (eventCounter.length) {
        eventCounter.countdown(countdownTime, function (e) {
          var past = parseInt(e.offset.seconds + 3);
          var html = "";
          for (let i = past; i > e.offset.seconds; i--) {
            if (i < 10) {
              html += "<li>0" + i + "</li>";
            } else {
              html += "<li>" + i + "</li>";
            }
          }
          $(".top-remain").html(html);
          var star = parseInt(e.offset.seconds - 1);
          var max = parseInt(e.offset.seconds - 3);
          var html = "";
          for (let bi = star; bi >= max; bi--) {
            if (bi < 10) {
              html += "<li>0" + bi + "</li>";
            } else {
              html += "<li>" + bi + "</li>";
            }
          }
          $(".top-coming").html(html);
          $(this).html(
            e.strftime(
              "<li><h2>%D</h2><h6>Days</h6></li>\
              <li><h2>%H</h2><h6>Hrs</h6></li>\
              <li><h2>%M</h2><h6>Min</h6></li>\
              <li><h2><span>%S</span></h2><h6>Sec</h6></li>"
            )
          );
        });
      }
    },
    // Form validation
    formValidation: function () {
      if ($(".form-validator").length) {
        $(".form-validator").validate();
      }
    },
    // Contact Form
    contactForm: function () {
      $(".contact-form").on("submit", function (e) {
        e.preventDefault();
        if ($(".contact-form").valid()) {
          var _self = $(this);
          _self
            .closest("div")
            .find('button[type="submit"]')
            .attr("disabled", "disabled");
          var data = $(this).serialize();
          $.ajax({
            url: "./assets/mail/contact.php",
            type: "post",
            dataType: "json",
            data: data,
            success: function (data) {
              $(".contact-form").trigger("reset");
              _self.find('button[type="submit"]').removeAttr("disabled");
              if (data.success) {
                document.getElementById("message").innerHTML =
                  "<h5 class='text-success mt-3 mb-2'>Email Sent Successfully</h5>";
              } else {
                document.getElementById("message").innerHTML =
                  "<h5 class='text-danger mt-3 mb-2'>There is an error</h5>";
              }
              $("#message").show("slow");
              $("#message").slideDown("slow");
              setTimeout(function () {
                $("#message").slideUp("hide");
                $("#message").hide("slow");
              }, 3000);
            },
          });
        } else {
          return false;
        }
      });
    },
    // Password Hide
    passwordHide: function () {
      $(".toggle-password").click(function () {
        var passwordField = $($(this).attr("toggle"));
        var icon = $(this).find("i");

        if (passwordField.attr("type") === "password") {
          passwordField.attr("type", "text");
          icon.removeClass("fa-eye").addClass("fa-eye-slash");
        } else {
          passwordField.attr("type", "password");
          icon.removeClass("fa-eye-slash").addClass("fa-eye");
        }
      });
    },
    // Slick Slider
    initializeSlick: function (e) {
      if ($(".brands-slider").length) {
        $(".brands-slider").slick({
          slidesToShow: 6,
          arrows: false,
          dots: false,
          infinite: true,
          cssEase: "linear",
          autoplay: true,
          autoplaySpeed: 0,
          speed: 6000,
          pauseOnFocus: false,
          pauseOnHover: false,
          responsive: [
            {
              breakpoint: 1599,
              settings: {
                slidesToShow: 5,
              },
            },
            {
              breakpoint: 1399,
              settings: {
                slidesToShow: 4,
              },
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 492,
              settings: {
                slidesToShow: 1,
              },
            },
          ],
        });
      }
      if ($(".courses-slider").length) {
        $(".courses-slider").slick({
          slidesToShow: 3,
          slideToScroll: 1,
          arrows: false,
          dots: true,
          infinite: true,
          cssEase: "linear",
          autoplay: true,
          autoplaySpeed: 3000,
          responsive: [
            {
              breakpoint: 1799,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 1,
              },
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 650,
              settings: {
                slidesToShow: 1,
              },
            },
          ],
        });
      }
      if ($(".team-slider").length) {
        $(".team-slider").slick({
          slidesToShow: 3,
          slideToScroll: 1,
          arrows: false,
          dots: true,
          infinite: true,
          cssEase: "linear",
          autoplay: false,
          autoplaySpeed: 3000,
          variableWidth: true,
          variableHeight: true,
          responsive: [
            {
              breakpoint: 1599,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 1399,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 1199,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 900,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 575,
              settings: {
                slidesToShow: 1,
              },
            },
          ],
        });
      }
      if ($(".testimonials_slider").length) {
        $(".testimonials_slider").slick({
          slidesToShow: 1,
          slideToScroll: 1,
          arrows: false,
          dots: true,
          infinite: true,
          cssEase: "linear",
          autoplay: false,
          autoplaySpeed: 3000,
          responsive: [
            {
              breakpoint: 575,
              settings: {
                slidesToShow: 1,
              },
            },
          ],
        });
      }
      if ($(".testimonials_slider_2").length) {
        $(".testimonials_slider_2").slick({
          slidesToShow: 2,
          slideToScroll: 1,
          arrows: false,
          dots: true,
          infinite: true,
          cssEase: "linear",
          autoplay: false,
          autoplaySpeed: 3000,
          centerMode: true,
          centerPadding: "15%",
          variableWidth: true,
          responsive: [
            {
              breakpoint: 452,
              settings: {
                slidesToShow: 1,
                centerMode: true,
                centerPadding: "0%",
                variableWidth: true,
              },
            },
          ],
        });
      }
    },
  };
  Init.i();
})(window, document, jQuery);

// var iphone= $('.light');
// var camera= $('.camera');
// var dollar= $('.dollar');
// var mic= $('.mic');

// var layer= $('.hero-banner-1');

// layer.mousemove(function(e){
//   var ivalueX= (e.pageX * -1 / 30);
//   var ivalueY= (e.pageY * -1 / 30);
//   var cvalueX= (e.pageX * -1 / 40);
//   var cvalueY= (e.pageY * -1 / 60);
//   console.log('ok');
//   iphone.css('transform', 'translate3d('+ivalueX+'px,'+ivalueY+'px, 0)');
//   camera.css('transform', 'translate3d('+cvalueX+'px,'+cvalueY+'px, 0)');
//   dollar.css('transform', 'translate3d('+ivalueX+'px,'+ivalueY+'px, 0)');
//   mic.css('transform', 'translate3d('+cvalueX+'px,'+cvalueY+'px, 0)');
// });
