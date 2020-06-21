let puppeteer = require("puppeteer");
let fs = require("fs");
(async function(){
    let data = await fs.promises.readFile("credentials.json","utf-8");
    let credentials = JSON.parse(data);
        Gender = credentials.Gender;
        MeasureSystem = credentials.MeasureSystem
        Age = credentials.Age;
        ActivityLevel = credentials.ActivityLevel;
        HeightInft = credentials.HeightInft;
        HeightIninch = credentials.HeightIninch;
        WeightInKgs = credentials.WeightInKgs;
    let browser = await puppeteer.launch({
        headless:false,
        defaultViewport:null,
        args:["--start-maximized"]
    });
    let numberofpages = await browser.pages();
    let tab = numberofpages[0];

    await tab.goto("https://caloriecontrol.org/healthy-weight-tool-kit/assessment-calculator/",
    {
        waitUntil:"networkidle0"
    });
    console.log("page opened");

    let gender = await tab.waitForSelector("#gender");
    await tab.click("#gender");
    await tab.keyboard.type(Gender);
    await tab.keyboard.press("Enter");
    //console.log("gender selected");

    let measuresystem = await tab.waitForSelector("#measureSystem");
    await tab.click("#measureSystem");
    await tab.keyboard.type(MeasureSystem);
    await tab.keyboard.press("Enter");
    //console.log("measure system selected");


    let age = await tab.waitForSelector("#age");
    await tab.type("#age",Age,{delay:400});
    //console.log("age entered");

    let activitylevel = await tab.waitForSelector("#activitylevel");
    await tab.click("#activitylevel");
    await tab.keyboard.type(ActivityLevel);
    await tab.keyboard.press("Enter");
    //console.log("activity level selected");

    let heightinft = await tab.waitForSelector("#feets");
    await tab.type("#feets",HeightInft,{delay:400});
    let heightininch = await tab.waitForSelector("#inches");
    await tab.type("#inches",HeightIninch,{delay:400});
    //console.log("height entered");

    let weight = await tab.waitForSelector("#weight");
    await tab.type("#weight",WeightInKgs,{delay:400});
    //console.log("weight entered");

    let AssesGoal = await tab.waitForSelector(".btn.btn-blue");
    await tab.click(".btn.btn-blue");
    
    console.log("results shown");
    
    let CurrentWeight = await tab.$eval('#currentweight',el => el.innerText);
    console.log("Current Weight:" + CurrentWeight);

    let HealthyWeightRange = await tab.$eval('#currenthealthyweight',el => el.innerText);
    console.log("Healthy Weight Range : " + HealthyWeightRange);
    
    
    let CurrentBMI = await tab.$eval('#currentbmi',el => el.innerText);
    console.log("Current BMI : " + CurrentBMI);

    let HealthyBmiRange = await tab.$eval('#healthybmirange',el => el.innerText);
    console.log("Healthy BMI Range : " + HealthyBmiRange);

    let ToMaintainWt = await tab.$eval('#tomaintain',el => el.innerText);
    console.log("To Maintain Current Weight : " + ToMaintainWt + "  Calories  ");

    let ToLooseWt = await tab.$eval('#tolose',el => el.innerText);
    console.log("To Loose Weight : " + ToLooseWt + "  Calories ");

    await tab.close();

}) ()