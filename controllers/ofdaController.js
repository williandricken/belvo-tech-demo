const fetch = require('node-fetch');
const secretId = process.env.BELVO_ID;
const secretPassword = process.env.BELVO_PASSWORD;
const baseUrl = process.env.BASE_URL;

function generateExternalId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result;
    result = '';
    for (let i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log("External ID generated:", result);
    return result;
}

exports.listAllInstitutions = async (req, res) => {
    // var resultList = "JOJO";
    let access_token = await getApiToken();
    console.log(access_token);
    async function getListAllInstitutions() {
      
        const resp = await fetch(
            `${baseUrl}/api/institutions?page=1`, 
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + Buffer.from(`${secretId}:${secretPassword}`).toString('base64')
                }
            }
        );
      
        const data = await resp.text();
        // console.log(data);
    }
    resultList = await getListAllInstitutions();
    return res.render("listAllInstitutions", {list: resultList})
}

exports.biometricPix = async (req, res) => {
    console.log(req.body);
    let enrollmentExternalId = generateExternalId();
    let customerExternalId = generateExternalId();
    let paymentExternalId = generateExternalId();



    async function getWidgetAccessToken() {
        const resp = await fetch(
          `${baseUrl}/payments/br/token/`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Basic ' + Buffer.from(`${secretId}:${secretPassword}`).toString('base64')
            },
            body: JSON.stringify({
                id: secretId,
                password: secretPassword,
                use_cases: [
                    'ENROLLMENT',
                    'PAYMENT_INTENT'
                ],
                widget: {
                    enrollment: {
                        type: 'open_finance_biometric_pix',
                        external_id: enrollmentExternalId,
                        details: {
                            name: 'enrollment-payment-test',
                            customer: {
                                name: req.body.fullname,
                                identifier: req.body.cpf,
                                external_id: customerExternalId
                            },
                        },
                    },
                    payment_intent: {
                        amount: '100.00',
                        external_id: paymentExternalId,
                        description: 'Test payment',
                        statement_description: 'Super Shop Store - Powered by Oceanpayment',
                        allowed_payment_method_types: [
                            'open_finance_biometric_pix'
                        ],
                        payment_method_details: {
                            open_finance_biometric_pix: {
                            beneficiary_bank_account: 'a80d5a9d-20ae-479a-8dd7-ff3443bcbbfc',
                            }
                        },
                    },
                    callback_urls: {
                        success: 'your_deeplink_here://success',
                        exit: 'your_deeplink_here://exit'
                    },
                    branding: {
                        color_scheme: 'LIGHT',
                        company_name: 'Will Inc.'
                    },
                    top_tier_institutions: [
                        'nubank_retail',
                        'picpay_retail',
                        'mercadopago_retail',
                        'itau_retail'
                    ],
                    theme: [
                        {
                            css_key: '--color-primary-base',
                            value: '#907AD6'
                        }
                    ]
                }
            })
          }
        );
      
        const data = await resp.json();
        console.log(data);
      }
      
      getWidgetAccessToken();
}

exports.createWidget = async (req, res) => {
    // console.log(req.body);

    const requestBody = {
        id: secretId,
        password: secretPassword,
        scopes: "read_institutions,write_links,read_links,read_consents,write_consents,write_consent_callback,delete_consents",
        credentials_storage: "store",
        stale_in: "365d",
        fetch_resources: [
            "ACCOUNTS",
            "TRANSACTIONS",
            "OWNERS",
            "BILLS"
        ],
        widget: {
            openfinance_feature: "consent_link_creation",
            branding: {
                company_terms_url: "https://belvo.com/terms-service/"
            },
            consent: {
                terms_and_conditions_url: "https://www.belvo.com",
                permissions: [
                    "REGISTER",
                    "ACCOUNTS",
                    "CREDIT_CARDS",
                    "CREDIT_OPERATIONS"
                ],
                identification_info: [
                    {
                    type: "CPF",
                    number: req.body.cpf,
                    name: req.body.fullname
                    }
                ]
            },
            callback_urls: {
                success: "http://localhost:3000/",
                exit: "http://localhost:3000/",
                event: "http://localhost:3000/"
            },
        }
    };

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody),
        redirect: "follow"
    };

    const response = await fetch(`${baseUrl}/api/token/`, requestOptions);
    const data = await response.json();
    // .then(response => response.text())
    // .then(result => access_token = result)
    // .catch(error => console.error("Error:", error));

    // console.log(data.access);
    // return data.access;
    https://widget.belvo.io/?access_token=&locale=pt&mode=webapp
    return res.redirect(`https://widget.belvo.io/?access_token=${data.access}&locale=pt&mode=webapp`);
}

exports.createLink = async (req, res) => {
    console.log(req.body);

    const requestBody = {
        "institution": req.body.institution,
        "username": req.body.username,
        "password": req.body.password,
        "external_id": generateExternalId(),
        "access_mode": "single",
        "fetch_resources": [
            "ACCOUNTS", 
            "BALANCES",
            // "BILLS", 
            // "INCOMES", 
            "OWNERS", 
            // "RECURRING_EXPENSES", 
            // "RISK_INSIGHTS",
            "TRANSACTIONS"
        ],
        "credentials_storage": "27d",
        "stale_in": "42d"
    };

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Basic ' + Buffer.from(`${secretId}:${secretPassword}`).toString('base64')
        },
        body: JSON.stringify(requestBody),
        redirect: "follow"
    };

    const response = await fetch(`${baseUrl}/api/links/`, requestOptions);
    const data = await response.json();
    // .then(response => response.text())
    // .then(result => access_token = result)
    // .catch(error => console.error("Error:", error));

    // console.log(data);
    console.log(data.id);
    res.cookie('linkId', data.id);
    return res.render("widget");
}