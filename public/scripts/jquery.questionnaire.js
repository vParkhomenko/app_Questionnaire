;(function ($) {

    function Questionnaire(element, questions) { // функция конструктор
        var questionnaireObj = this;

        questionnaireObj.element = $(element);
        questionnaireObj.questions = questions;
        questionnaireObj.percent = 0;

        // private vars
        var focusOffsetPercent = 30,
            focusNavPercent = parseInt(window.innerHeight / 100 * 25)



        // private methods
        var
            init = function () { // метод класса
                for (var i = 0; i < questionnaireObj.questions.length; i++) {
                    switch (questionnaireObj.questions[i].type) {
                        case 'text':
                            questionnaireObj.buildText(i);
                            break;

                        case 'image':
                            questionnaireObj.buildImage(i);
                            break;

                        case 'evaluation':
                            questionnaireObj.buildEvaluation(i);
                            break;

                        case 'quantity':
                            questionnaireObj.buildQuantity(i);
                            break;

                        case 'textarea':
                            questionnaireObj.buildTextarea(i);
                            break;

                        case 'chooseYesNo':
                            questionnaireObj.buildChooseYesNo(i);
                            break;

                    }
                }

                questionnaireObj.buildSubmit();
                questionnaireObj.buildProgress();

                var
                    articleHeight = parseInt(questionnaireObj.element.find('.article').last().css('height')),
                    submitHeight = parseInt(questionnaireObj.element.find('.submit-report').css('height')),
                    submitMargBot = parseInt(questionnaireObj.element.find('.submit-report').css('margin-bottom')),
                    artLastMargBot = parseInt(window.innerHeight -  focusNavPercent - articleHeight - submitHeight - submitMargBot);

                questionnaireObj.element.find('.article').first().css('margin-top', focusNavPercent - 50);
                questionnaireObj.element.find('.article').first().addClass('active');

                if (artLastMargBot > 0) {
                    questionnaireObj.element.find('.article').last().css('margin-bottom', artLastMargBot);
                }

                $(window).scroll(focusQuestion);
                $('body').on('click', '.confirm-input', confirmInput);
                $('body').on('click', '.confirm-img', confirmImg);
                $('body').on('click', '.confirm-txtarea', confirmTxtArea);
                $('body').on('click', '.thumbnail', checkThumbnail);
                $('body').on('click', '.layout-choice li', choice);
                $('body').on('click', '.icons li', choiceUser);
                $('body').on('click', '.selection', select);
                $('body').on('click', '.down', navDown);
                $('body').on('click', '.up', navUp);
                $('body').on('click', '.general', submit);
                $("body").keypress(function (event) {
                    if (event.which == 13) {
                        questionnaireObj.element.find('.active').find('button').trigger('click');
                        if (questionnaireObj.element.find('.article').last().hasClass('active')) {
                            questionnaireObj.element.find('.general').trigger('click');
                        }
                    }
                });

                questionnaireObj.element.find('.icons li').hover(
                    function () {
                        questionnaireObj.element.find(this).prevAll('li').andSelf().addClass("hovered");
                    },
                    function () {
                        questionnaireObj.element.find(this).prevAll('li').andSelf().removeClass("hovered");
                    });

                function confirmInput(event) {
                    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,6})+$/;

                    if (questionnaireObj.element.find(event.currentTarget).closest('.article').hasClass('active')) {


                        if (questionnaireObj.element.find(event.currentTarget).closest('.article').find('input').val() == '') {
                            questionnaireObj.element.find(event.currentTarget).closest('.article').find('.message').css('display', 'inline-block');
                            return false;
                        } else {
                            if (questionnaireObj.element.find(event.currentTarget).closest('.article').find('input').attr('type') === "email" && !filter.test(questionnaireObj.element.find(event.currentTarget).closest('.article').find('input').val())) {
                                questionnaireObj.element.find(event.currentTarget).closest('.article').find('.message').css('display', 'inline-block');
                                return false;
                            }
                            if (!questionnaireObj.element.find(event.currentTarget).closest('.article').hasClass('disabled')) {
                                progressCounter();
                            } else {
                                navDown();
                                return false;
                            }
                            questionnaireObj.element.find(event.currentTarget).closest('.article').find('.message').css('display', 'none');
                            questionnaireObj.element.find(event.currentTarget).closest('.article').addClass('disabled');
                            navDown();
                            return true;
                        }
                    } else {
                        return false;
                    }
                    ;
                };

                function confirmImg(event) {
                    if (questionnaireObj.element.find(event.currentTarget).closest('.article').hasClass('active')) {
                        if (questionnaireObj.element.find(event.currentTarget).closest('.article').find('.check').length && !questionnaireObj.element.find(event.currentTarget).closest('.article').find('.check').hasClass('checked')) {
                            questionnaireObj.element.find(event.currentTarget).closest('.article').find('.message').css('display', 'inline-block');
                            return false;
                        } else {
                            if (!questionnaireObj.element.find(event.currentTarget).closest('.article').hasClass('disabled')) {
                                progressCounter();
                            } else {
                                navDown();
                                return false;
                            }
                            questionnaireObj.element.find(event.currentTarget).closest('.article').find('.message').css('display', 'none');
                            questionnaireObj.element.find(event.currentTarget).closest('.article').addClass('disabled');
                            navDown();
                            return true;
                        }
                    } else {
                        return false;
                    };
                };

                function confirmTxtArea(event) {
                    if (questionnaireObj.element.find(event.currentTarget).closest('.article').hasClass('active')) {
                        if (questionnaireObj.element.find(event.currentTarget).closest('.article').find('textarea').val() == '') {
                            questionnaireObj.element.find(event.currentTarget).closest('.article').find('.message').css('display', 'inline-block');
                            return false;
                        } else {
                            if (!questionnaireObj.element.find(event.currentTarget).closest('.article').hasClass('disabled')) {
                                progressCounter();
                            } else {
                                navDown();
                                return false;
                            }
                            questionnaireObj.element.find(event.currentTarget).closest('.article').find('.message').css('display', 'none');
                            questionnaireObj.element.find(event.currentTarget).closest('.article').addClass('disabled');
                            navDown();
                            return true;
                        }
                    } else {
                        return false;
                    }
                };

                function checkThumbnail(event) {
                    if (!questionnaireObj.element.find(event.currentTarget).closest('.article').hasClass('active')) {
                        return false;
                    }
                    questionnaireObj.element.find(event.currentTarget).closest('.thumbnail').find('.check').toggleClass('checked');
                };

                function choice(event) {
                    if (questionnaireObj.element.find(event.currentTarget).closest('.article').hasClass('active')) {

                        questionnaireObj.element.find(event.currentTarget).closest('.choice').addClass('choiced');
                        questionnaireObj.element.find(event.currentTarget).closest('.choice').nextAll('.choice').removeClass('choiced');
                        questionnaireObj.element.find(event.currentTarget).closest('.choice').prevAll('.choice').removeClass('choiced');
                        questionnaireObj.element.find(event.currentTarget).closest('.article').find('.message').css('display', 'none');

                        if (questionnaireObj.element.find(event.currentTarget).hasClass('choiced')) {
                            if (!questionnaireObj.element.find(event.currentTarget).closest('.article').hasClass('disabled')) {
                                progressCounter();
                            } else {
                                navDown();
                                return false;
                            }
                            questionnaireObj.element.find(event.currentTarget).closest('.article').addClass('disabled');
                            navDown();
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                };

                function choiceUser(event) {
                    if (questionnaireObj.element.find(event.currentTarget).closest('.article').hasClass('active')) {

                        questionnaireObj.element.find(event.currentTarget).closest('.icons li').prevAll('li').andSelf().addClass('usered');
                        questionnaireObj.element.find(event.currentTarget).closest('.icons li').nextAll('li').removeClass('usered');
                        questionnaireObj.element.find(event.currentTarget).closest('.article').find('.message').css('display', 'none');
                        if (questionnaireObj.element.find(event.currentTarget).hasClass('usered')) {
                            if (!questionnaireObj.element.find(event.currentTarget).closest('.article').hasClass('disabled')) {
                                progressCounter();
                            } else {
                                navDown();
                                return false;
                            }

                            questionnaireObj.element.find(event.currentTarget).closest('.article').addClass('disabled');
                            navDown();
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                };

                function select(event) {
                    if (questionnaireObj.element.find(event.currentTarget).closest('.article').hasClass('active')) {
                        if (!questionnaireObj.element.find(event.currentTarget).closest('.article').hasClass('disabled')) {
                            progressCounter();
                        }
                        questionnaireObj.element.find(event.currentTarget).closest('.article').find('.message').css('display', 'none');
                        questionnaireObj.element.find(event.currentTarget).closest('.article').addClass('disabled');
                        questionnaireObj.element.find(event.currentTarget).closest('.selection').find('.select').addClass('selected');
                        questionnaireObj.element.find(event.currentTarget).nextAll('.selection').find('.select').removeClass('selected');
                        questionnaireObj.element.find(event.currentTarget).closest('.selection').find('.select').addClass('selected');
                        questionnaireObj.element.find(event.currentTarget).prevAll('.selection').find('.select').removeClass('selected');
                        navDown();
                    } else {
                        return false;
                    }
                };

                function navDown(event) {
                    if (questionnaireObj.element.find('.active').closest('.article').next().length) {
                        $("body").animate({
                            "scrollTop": questionnaireObj.element.find('.active').closest('.article').next().offset().top - focusNavPercent
                        }, "slow");
                    }
                };

                function navUp(event) {
                    if (questionnaireObj.element.find('.active').closest('.article').prev().length) {
                        $("body").animate({
                            "scrollTop": questionnaireObj.element.find('.active').closest('.article').prev().offset().top - focusNavPercent
                        }, "slow");
                    }
                };

                function submit(event) {
                    event.preventDefault();

                    var
                        valid = true,
                        dataObj = {
                            data: []
                        },
                        answers = [],
                        ajaxOptions = {
                            type: 'POST',
                            url: '/api/answers',
                            contentType: 'application/json; charset=utf-8',
                            error: function () {
                                if (!$('#myModal').hasClass('in')) {
                                    $('.modal-body').addClass('bg-danger').find('p').remove();
                                };
                                $('.modal-body').append(
                                    $('<p/>', {
                                        addClass: 'resAlertAnswer',
                                        text: 'We would be happy to write : " Thank you for an answer" , but something went wrong on the server !'
                                    }));
                                $('#myModal').modal('show');
                            },
                            success: function (response) {
                                if (!$('#myModal').hasClass('in')) {
                                    $('.modal-body').removeClass('bg-danger').addClass('bg-success').find('p').remove();
                                };
                                $('.modal-body').append(
                                    $('<p/>', {
                                        addClass: 'resCountCorrectAnswer',
                                        text: response[0]
                                    }),
                                    $('<p/>', {
                                        addClass: 'resCorrectAnswer',
                                        text: response[1]
                                    }));
                                $('#myModal').modal('show');
                            }

                        };

                    questionnaireObj.element.find('.article').length && $.each(questionnaireObj.element.find('.article'), function (index, value) {


                        if (questionnaireObj.element.find(value).find('input').length) {
                            valid = checkInput(questionnaireObj.element.find(value));
                        }
                        if (questionnaireObj.element.find(value).find('.thumbnail').length) {
                            valid = checkImg(questionnaireObj.element.find(value));
                        }
                        if (questionnaireObj.element.find(value).find('.layout-choice').length) {
                            valid = checkChoice(questionnaireObj.element.find(value));
                        }
                        if (questionnaireObj.element.find(value).find('.icons li').length) {
                            valid = checkUser(questionnaireObj.element.find(value));
                        }
                        if (questionnaireObj.element.find(value).find('textarea').length) {
                            valid = checkTextarea(questionnaireObj.element.find(value));
                        }
                        if (questionnaireObj.element.find(value).find('.selection').length) {
                            valid = checkChooseYesNo(questionnaireObj.element.find(value));
                        }

                        if (!valid) {
                            return false;
                        }

                        answers = [];

                        if (questionnaireObj.element.find(value).find('input').length) {
                            answers.push(questionnaireObj.element.find(value).find('input').val());
                        }

                        if (questionnaireObj.element.find(value).find('.thumbnail').length) {
                            questionnaireObj.element.find(value).find('.checked~.text ').length && $.each(questionnaireObj.element.find(value).find('.checked~.text'), function (index, text) {
                                answers.push(questionnaireObj.element.find(text).find('.inscription').text());
                            });
                        }
                        if (questionnaireObj.element.find(value).find('.choiced').length) {
                            answers.push(questionnaireObj.element.find(value).find('.choiced').text());
                        }
                        if (questionnaireObj.element.find(value).find('.icons').length) {
                            answers.push(questionnaireObj.element.find(value).find('.usered').last().text()); // некоректно показывает результат
                        }
                        if (questionnaireObj.element.find(value).find('textarea').length) {
                            answers.push(questionnaireObj.element.find(value).find('textarea').val());
                        }
                        if (questionnaireObj.element.find(value).find('.selected').length) {
                            answers.push(questionnaireObj.element.find(value).find('.selected~.text').text() === 'AYes');
                        }

                        dataObj.data.push({
                            id: questionnaireObj.element.find(value).data('id'),
                            answers: answers
                        });
                    });

                    dataObj.data = JSON.stringify(dataObj.data);
                    ajaxSettings = $.extend({}, ajaxOptions, dataObj);

                    if (!valid) {
                        return;
                    }
                    $.ajax(ajaxSettings);
                };
            },


            progressCounter = function () {
                questionnaireObj.percent += (1 * 100) / questionnaireObj.questions.length;
                questionnaireObj.element.find('.progress').css('width', Math.round(questionnaireObj.percent) + '%');
                questionnaireObj.element.find('.label-progress').text(Math.round(questionnaireObj.percent) + '% completed');
            };

        focusQuestion = function (event) {
            var posTop = questionnaireObj.element.find('.article').first().offset().top,
                currentY = $(window).scrollTop() + parseInt(window.innerHeight / 100 * focusOffsetPercent);

            if ($(window).scrollTop() >= posTop) {
                questionnaireObj.element.find('.up').removeClass('inactive');
            } else {
                questionnaireObj.element.find('.up').addClass('inactive');
            }


            questionnaireObj.element.find('.article').length && $.each(questionnaireObj.element.find('.article'), function (index, value) {

                if (currentY >= value.offsetTop && currentY <= value.offsetTop + value.offsetHeight) {
                    questionnaireObj.element.find(value).addClass('active');
                    if (questionnaireObj.element.find('.article').next().length) {
                        questionnaireObj.element.find('.down').addClass('inactive');
                    }
                } else {
                    questionnaireObj.element.find(value).removeClass('active');
                    questionnaireObj.element.find('.down').removeClass('inactive');
                }
                ;
            });
        },

            checkInput = function (currEl) {
                var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,6})+$/;

                if (currEl.find('input').val() == '') {
                    currEl.find('.message').css('display', 'inline-block');
                    return false;
                } else {
                    if (currEl.find('input').attr('type') === "email" && !filter.test(currEl.find('input').val())) {
                        currEl.find('.message').css('display', 'inline-block');
                        return false;
                    }
                }
                return true;
            };

        checkImg = function (currEl) {

            if (currEl.find('.check').length && !currEl.find('.check').hasClass('checked')) {
                currEl.find('.message').css('display', 'inline-block');
                return false;
            }
            return true;
        };

        checkChoice = function (currEl) {
            if (currEl.find('.layout-choice') && !currEl.find('.layout-choice li').hasClass('choiced')) {
                currEl.find('.message').css('display', 'inline-block');
                return false;
            }
            return true;
        };

        checkUser = function (currEl) {

            if (currEl.find('.icons li') && !currEl.find('.icons li').hasClass('usered')) {
                currEl.find('.message').css('display', 'inline-block');
                return false;
            }
            return true;
        };

        checkTextarea = function (currEl) {

            if (currEl.find('textarea').val() == '') {
                currEl.find('.message').css('display', 'inline-block');
                return false;
            }
            return true;
        };

        checkChooseYesNo = function (currEl) {

            if (currEl.find('.select').length && !currEl.find('.select').hasClass('selected')) {
                currEl.find('.message').css('display', 'inline-block');
                return false;
            }
            return true;
        };

        init();
    }

    var numerator = 0;
    Questionnaire.prototype.buildText = function (index) {

        var article = $('<div/>', {
            addClass: "container-fluid article",
            "data-id": this.questions[index].id
        }).append(
            $('<div/>', {
                addClass: "question",
                text: this.questions[index].question
            }).prepend(
                $('<span/>', {
                    addClass: "num",
                    text: numerator += 1
                })
            ),
            $('<div/>', {
                addClass: "arrow"
            }).append(
                $('<div/>', {
                    addClass: "arrow-right"
                })
            ),
            $('<div/>', {
                addClass: "message",
                text: this.questions[index].alertMessage
            }),
            $('<div/>', {
                addClass: "content"
            }).append(
                $('<img/>', {
                    src: this.questions[index].src,
                    alt: "user"
                })
            ),
            $('<input/>', {
                type: this.questions[index].inputType
            }),
            $('<button/>', {
                addClass: "confirm-input"
            }).append(
                $('<div/>', {
                    addClass: "ok"
                }).append(
                    $('<span/>', {
                        text: "Ok"
                    }),
                    $('span/', {
                        addClass: "glyphicon glyphicon-ok"
                    })
                ),
                $('<div/>', {
                    addClass: "enter",
                    text: "press"
                }).append(
                    $('<strong/>', {
                        text: "ENTER"
                    })
                )
            )
        );

        $(article).appendTo(this.element);

    }

    Questionnaire.prototype.buildImage = function (index) {
        lettersNumerator = 65;

        var answers = [];

        for (var i = 0; i < this.questions[index].answers.length; i++) {
            answers.push($('<div/>', {
                addClass: "col-xs-6 col-sm-3 thumbnail"
            }).append(
                $('<span/>', {
                    addClass: "glyphicon glyphicon-ok  check"
                }),
                $('<img/>', {
                    src: this.questions[index].answers[i].src,
                    alt: "..."
                }),
                $('<div/>', {
                    addClass: "text"
                }).prepend(
                    $('<div/>', {
                        addClass: "label",
                        text: String.fromCharCode(lettersNumerator++)
                    }),
                    $('<span/>', {
                        addClass: "inscription",
                        text: this.questions[index].answers[i].text
                    })
                )
            ));
        }

        var article = $('<div/>', {
            addClass: "container-fluid article",
            "data-id": this.questions[index].id
        }).append(
            $('<div/>', {
                addClass: "question",
                text: this.questions[index].question
            }).prepend(
                $('<span/>', {
                    addClass: "num",
                    text: numerator += 1
                })
            ),
            $('<div/>', {
                addClass: "arrow"
            }).append(
                $('<div/>', {
                    addClass: "arrow-right"
                })
            ),
            $('<div/>', {
                addClass: "message",
                text: this.questions[index].alertMessage
            }),
            $('<div/>', {
                addClass: "row content"
            }).append(
                $('<div/>', {
                    addClass: "multiple",
                    text: "Select all affected body parts"
                }),
                answers
            ),
            $('<button/>', {
                addClass: "confirm-img"
            }).append(
                $('<div/>', {
                    addClass: "ok"
                }).append(
                    $('<span/>', {
                        text: "Ok"
                    }),
                    $('span/', {
                        addClass: "glyphicon glyphicon-ok"
                    })
                ),
                $('<div/>', {
                    addClass: "enter",
                    text: "press"
                }).append(
                    $('<strong/>', {
                        text: "ENTER"
                    })
                )
            )
        );

        $(article).appendTo(this.element);

    }

    Questionnaire.prototype.buildEvaluation = function (index) {

        var article = $('<div/>', {
            addClass: "container-fluid article",
            "data-id": this.questions[index].id
        }).append(
            $('<div/>', { // question
                addClass: "question",
                text: this.questions[index].question
            }).prepend(
                $('<span/>', {
                    addClass: "num",
                    text: numerator += 1
                })
            ),
            $('<div/>', {
                addClass: "arrow"
            }).append(
                $('<div/>', {
                    addClass: "arrow-right"
                })
            ),
            $('<div/>', {
                addClass: "message",
                text: this.questions[index].alertMessage
            }),
            $('<div/>', {
                addClass: "content"
            }).append(
                $('<ul/>', {
                    addClass: "layout-choice"
                }).append(
                    $('<li/>', {
                        addClass: "choice",
                        text: 0
                    }).append(
                        $('<div/>', {
                            addClass: "line"
                        })
                    ),
                    $('<li/>', {
                        addClass: "choice",
                        text: 1
                    }),
                    $('<li/>', {
                        addClass: "choice",
                        text: 2
                    }),
                    $('<li/>', {
                        addClass: "choice",
                        text: 3
                    }),
                    $('<li/>', {
                        addClass: "choice",
                        text: 4
                    }).append(
                        $('<div/>', {
                            addClass: "line"
                        })
                    ),
                    $('<li/>', {
                        addClass: "choice",
                        text: 5
                    }),
                    $('<li/>', {
                        addClass: "choice",
                        text: 6
                    }),
                    $('<li/>', {
                        addClass: "choice",
                        text: 7
                    }),
                    $('<li/>', {
                        addClass: "choice",
                        text: 8
                    }).append(
                        $('<div/>', {
                            addClass: "line"
                        })
                    )
                ),
                $('<ul/>', {
                    addClass: "layout-lable"
                }).append(
                    $('<li/>', {
                        addClass: "choice-lable first",
                        text: "Not at all"
                    }),
                    $('<li/>', {
                        addClass: "choice-lable second",
                        text: "Slightly"
                    }),
                    $('<li/>', {
                        addClass: "choice-lable third",
                        text: "Extremely"
                    })
                )
            )
        );

        $(article).appendTo(this.element);

    }

    Questionnaire.prototype.buildQuantity = function (index) {

        var article = $('<div/>', {
            addClass: "container-fluid article",
            "data-id": this.questions[index].id
        }).append(
            $('<div/>', {
                addClass: "question",
                text: this.questions[index].question
            }).prepend(
                $('<span/>', {
                    addClass: "num",
                    text: numerator += 1
                })
            ),
            $('<div/>', { // arrow
                addClass: "arrow"
            }).append(
                $('<div/>', {
                    addClass: "arrow-right"
                })
            ),
            $('<div/>', {
                addClass: "message",
                text: this.questions[index].alertMessage
            }),
            $('<ul/>', {
                addClass: "icons content"
            }).append(
                $('<li/>', {
                    addClass: "glyphicon glyphicon-user"
                }).append(
                    $('<div/>', {
                        addClass: "label-icon",
                        text: "1"
                    })
                ),
                $('<li/>', {
                    addClass: "glyphicon glyphicon-user"
                }).append(
                    $('<div/>', {
                        addClass: "label-icon",
                        text: "2"
                    })
                ),
                $('<li/>', {
                    addClass: "glyphicon glyphicon-user"
                }).append(
                    $('<div/>', {
                        addClass: "label-icon",
                        text: "3"
                    })
                ),
                $('<li/>', {
                    addClass: "glyphicon glyphicon-user"
                }).append(
                    $('<div/>', {
                        addClass: "label-icon",
                        text: "4"
                    })
                ),
                $('<li/>', {
                    addClass: "glyphicon glyphicon-user"
                }).append(
                    $('<div/>', {
                        addClass: "label-icon",
                        text: "5"
                    })
                ),
                $('<li/>', {
                    addClass: "glyphicon glyphicon-user"
                }).append(
                    $('<div/>', {
                        addClass: "label-icon",
                        text: "6"
                    })
                )
            )
        );

        $(article).appendTo(this.element);

    }

    Questionnaire.prototype.buildTextarea = function (index) {

        var article = $('<div/>', {
            addClass: "container-fluid article",
            "data-id": this.questions[index].id
        }).append(
            $('<div/>', {
                addClass: "question",
                text: this.questions[index].question
            }).prepend(
                $('<span/>', {
                    addClass: "num",
                    text: numerator += 1
                })
            ),
            $('<div/>', {
                addClass: "arrow"
            }).append(
                $('<div/>', {
                    addClass: "arrow-right"
                })
            ),
            $('<div/>', {
                addClass: "message",
                text: this.questions[index].alertMessage
            }),
            $('<div/>', {
                addClass: "content"
            }).append(
                $('<div/>', {
                    addClass: "description",
                    text: "Provide as much detail as you can. Include the time and location of the incident."
                }),
                $('<div/>', {
                    addClass: "textarea-wrapper"
                }).append(
                    $('<span/>', {
                        addClass: "txtarea-tip",
                        text: "To add a paragraph, press "
                    }).append(
                        $('<strong/>', {
                            text: "SHIFT + ENTER"
                        })
                    ),
                    $('<textarea/>')
                )
            ),
            $('<button/>', {
                addClass: "confirm-txtarea"
            }).append(
                $('<div/>', {
                    addClass: "ok"
                }).append(
                    $('<span/>', {
                        text: "Ok"
                    }),
                    $('span/', {
                        addClass: "glyphicon glyphicon-ok"
                    })
                ),
                $('<div/>', {
                    addClass: "enter",
                    text: "press"
                }).append(
                    $('<strong/>', {
                        text: "ENTER"
                    })
                )
            )
        );

        $(article).appendTo(this.element);

    }

    Questionnaire.prototype.buildChooseYesNo = function (index) {
        lettersNumerator = 65;

        var article = $('<div/>', {
            addClass: "container-fluid article",
            "data-id": this.questions[index].id
        }).append(
            $('<div/>', {
                addClass: "question",
                text: this.questions[index].question
            }).prepend(
                $('<span/>', {
                    addClass: "num",
                    text: numerator += 1
                })
            ),
            $('<div/>', {
                addClass: "arrow"
            }).append(
                $('<div/>', {
                    addClass: "arrow-right"
                })
            ),
            $('<div/>', {
                addClass: "message",
                text: this.questions[index].alertMessage
            }),
            $('<div/>', {
                addClass: "content"
            }).append(
                $('<div/>', {
                    addClass: "col-xs-6 col-sm-3 selection"
                }).append(
                    $('<span/>', {
                        addClass: "glyphicon glyphicon-ok text-center yesNo"
                    }),
                    $('<span/>', {
                        addClass: "glyphicon glyphicon-ok select"
                    }),
                    $('<div/>', {
                        addClass: "text",
                        text: "Yes"
                    }).prepend(
                        $('<div/>', {
                            addClass: "label",
                            text: String.fromCharCode(lettersNumerator++)
                        })
                    )
                ),
                $('<div/>', {
                    addClass: "col-xs-6 col-sm-3 selection"
                }).append(
                    $('<span/>', {
                        addClass: "glyphicon glyphicon-remove text-center yesNo"
                    }),
                    $('<span/>', {
                        addClass: "glyphicon glyphicon-ok select"
                    }),
                    $('<div/>', {
                        addClass: "text",
                        text: "No"
                    }).prepend(
                        $('<div/>', {
                            addClass: "label",
                            text: String.fromCharCode(lettersNumerator++)
                        })
                    )
                )
            )
        );

        $(article).appendTo(this.element);

    }

    Questionnaire.prototype.buildSubmit = function () {

        var submit = $('<footer/>', {
            addClass: "submit-report"
        }).append(
            $('<div/>', {
                addClass: "container-fluid article-submit"
            }).append(
                $('<button/>', {
                    addClass: "general",
                }).append(
                    $('<span/>', {
                        text: "Submit Report"
                    })
                ),
                $('<div/>', {
                    addClass: "enter",
                    text: "press"
                }).append(
                    $('<strong/>', {
                        text: "ENTER"
                    })
                )
            )
        );

        $(this.element).append(submit);
    }

    Questionnaire.prototype.buildProgress = function () {

        var progress = $('<footer/>', {
            addClass: "navbar navbar-default navbar-fixed-bottom"
        }).append(
            $('<div/>', {
                addClass: "container-fluid article-progress"
            }).append(
                $('<div/>', {
                    addClass: "content"
                }).append(
                    $('<div/>', {
                        addClass: "label-progress",
                        text: "0% completed"
                    }),
                    $('<div/>', {
                        addClass: "bar"
                    }).append(
                        $('<div/>', {
                            addClass: "progress"
                        })
                    ),
                    $('<div/>', {
                        addClass: "nav-buttons"
                    }).append(
                        $('<div/>', {
                            addClass: "button-wrapper up inactive"
                        }).append(
                            $('<span/>', {
                                addClass: "glyphicon glyphicon-menu-up"
                            })
                        ),
                        $('<div/>', {
                            addClass: "button-wrapper down"
                        }).append(
                            $('<span/>', {
                                addClass: "glyphicon glyphicon-menu-down"
                            })
                        )
                    )
                )
            )
        );

        $(this.element).append(progress);
    }

    $.questionnaire = function (searchElString, questions) {

        return new Questionnaire(searchElString, questions);

    };

})(jQuery);