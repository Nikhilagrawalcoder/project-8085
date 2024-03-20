const registers = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    H: 0,
    L: 0,
};
const flag={
    S:0,
    Z:0,
    AC:0,
    P:0,
    CY:0,
};
let memory=[];

let num = 0;
let arr = [0, 0, 0, 0];
let arr2 = [0, 0];
const buttons = document.querySelectorAll('button');
let hasRelx = false;
let hasNext = false;
let first=false;
let hasGo=false;
// update2();
update(0);
buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

function handleButtonClick(event) {
    console.log(num);
    const buttonId = event.target.id;
    const buttonClass = event.target.className;

    if(hasGo==true && buttonId=='EXE'){
        hasGo=false;
        execute(num);
    }
    if(buttonId==='RESET'){update(0);update2();num=0;hasNext=false;hasGo=false;hasRelx=false;first=false;return;}
    if(buttonId==='GO'){hasGo=true;hasNext=false;first=false;num=0;return;}
    if (buttonId === 'relx') {
        hasRelx = true;
        update(0);
        return;
    }
    if(!hasRelx)return;

    if ((buttonClass !== 'rightk' && !hasNext) || hasGo==true) {
        const leftScreenInput = document.querySelector('.screen .left input');
        const buttonText = event.target.textContent;

        arr.splice(0, 1);
        arr.push(buttonText);
        leftScreenInput.value = arr.join('');
        num = parseInt(arr.join(''));
    }

    if(buttonId=='NEXT'){
        const rightScreenInput = document.querySelector('.screen .right input');
        const buttonText = event.target.textContent;

        hasNext = true;
        if(first)num+=1;
        rightScreenInput.value=memory[num] || '00';
        first=true;
        update(num);
        // update2();
        return;
    }

    if (hasNext && buttonClass === 'leftk') {
        const rightScreenInput = document.querySelector('.screen .right input');
        const buttonText = event.target.textContent;

        arr2.splice(0,1);
        arr2.push(buttonText);
        rightScreenInput.value = arr2.join('');
        memory[parseInt(num)]=(arr2.join(''));
        console.log(memory);
    }
}

function update(num) {
    const rightScreenInput = document.querySelector('.screen .left input');
    rightScreenInput.value = num;
}

function update2() {
    const rightScreenInput = document.querySelector('.screen .right input');
    rightScreenInput.value = '00';
}


function execute(address){
    while(true){
        let memo=find[memory[address]];
        memo=memo.split(' ');
        if(memo[0]=='HLT')break;
        else if(memo[0]=='ADD'){instructions.ADD(memo[1]);address++;}
        else if(memo[0]=='MADD'){instructions.MADD(registers["H"]*100+registers["L"]);address++;}
        else if(memo[0]=='ADC'){instructions.ADC(memo[1]);address++;}
        else if(memo[0]=='MADC'){instructions.MADD(registers["H"]*100+registers["L"]);address++;}
        else if(memo[0]=='ADI'){instructions.ADI(memory[address+1]);address+=2;}
        else if(memo[0]=='ACI'){instructions.ACI(memory[address+1]);address+=2;}
        else if(memo[0]=='DAD'){instructions.DAD(memo[1].split(''));address++;}
        else if(memo[0]=='SBB'){instructions.SBB(memo[1]);address++;}
        else if(memo[0]=='SUI'){instructions.SUI(memory[address+1]);address+=2;}
        else if(memo[0]=='SBI'){instructions.SBI(memory[address+1]);address+=2;}
        else if(memo[0]=='SUB'){instructions.SUB(memo[1]);address++;}
        else if(memo[0]=='MSUB'){instructions.MSUB(registers["H"]*100+registers["L"]);address++;}
        else if(memo[0]=='INR'){instructions.INR(memo[1]);address++;}
        else if(memo[0]=='INX'){instructions.INX(memo[1].split(''));address++;}
        else if(memo[0]=='MINR'){instructions.MINR(registers["H"]*100+registers["L"]);address++;}
        else if(memo[0]=='DCR'){instructions.DCR(memo[1]);address++;}
        else if(memo[0]=='MDCR'){instructions.MDCR(registers["H"]*100+registers["L"]);address++;}
        else if(memo[0]=='DCX'){instructions.DCX(memo[1].split(''));address++;}
        else if(memo[0]=='MOV'){instructions.MOV(memo[2],memo[1]);address++;}
        else if(memo[0]=='MMOV'){instructions.MMOV(memo[1],memory[registers["H"]*100+registers["L"]]);address++;}
        // else if(memo[0]=='MMVI'){instructions.MMVI(memo[1],memory[address+1]);address+=2;}
        else if(memo[0]=='MVI'){instructions.MVI(memo[1],memory[address+1]);address+=2;}
        else if(memo[0]=='LXI'){instructions.LXI(memo[1].split(''),memory[address+1]*100+memory[address+2]);address+=3;}
        else if(memo[0]=='LDA'){instructions.LDA(memory[address+2]*100+memory[address+1]);address+=3;}
        else if(memo[0]=='LDAX'){instructions.LDAX(memo[1].split(''));address++;}
        else if(memo[0]=='LHLD'){instructions.LHLD(address+1);address+=3;}
        else if(memo[0]=='STA'){instructions.STA(address+1);address+=3;}
        else if(memo[0]=='STAX'){instructions.STAX(memo[1].split(''));address++;}
        else if(memo[0]=='SHLD'){instructions.SHLD(memory[address+2]*100+memory[address+1]);address+=3;}
        else if(memo[0]=='XCHG'){instructions.XCHG();}
        else if(memo[0]=='CMP'){instructions.CMP(memo[1]);address++;}
        else if(memo[0]=='MCMP'){instructions.MCMP(memory[address+2]*100+memory[address+1]);address+=2;}
        else if(memo[0]=='CPI'){instructions.CPI(memory[address+1]);address+=2;}
        else if(memo[0]=='ANA'){instructions.ANA(memo[1]);address++;}
        else if(memo[0]=='MANA'){instructions.MANA(registers["H"]*100+registers["L"]);address++;}
        else if(memo[0]=='ANI'){instructions.ANI(memory[address+1]);address+=2;}
        else if(memo[0]=='ORA'){instructions.ORA(memo[1]);address++;}
        else if(memo[0]=='MORA'){instructions.MORA(registers["H"]*100+registers["L"]);address++;}
        else if(memo[0]=='ORI'){instructions.ORI(memory[address+1]);address+=2;}
        else if(memo[0]=='XRA'){instructions.XRA(memo[1]);address++;}
        else if(memo[0]=='MXRA'){instructions.MXRA(registers["H"]*100+registers["L"]);address++;}
        else if(memo[0]=='XRI'){instructions.XRI(memory[address+1]);address+=2;}
        else if(memo[0]=='RLC'){instructions.RLC();address++;}
        else if(memo[0]=='RRC'){instructions.RRC();address++;}
        else if(memo[0]=='RAL'){instructions.RAL();address++;}
        else if(memo[0]=='RAR'){instructions.RAR();address++;}
        else if(memo[0]=='CMA'){instructions.CMA();address++;}
        else if(memo[0]=='CMC'){instructions.CMC();address++;}
        else if(memo[0]=='STC'){instructions.STC();address++;}
        updateflags();
    }
}
function updateflags(){
    let sign=document.querySelector('#sign');
    let zero=document.querySelector('#zero');
    let halfCarry=document.querySelector('#auxiliary');
    let carry=document.querySelector('#carry');
    let parity=document.querySelector('#parity');

    sign.innerHTML=flag["S"];
    zero.innerHTML=flag["Z"];
    halfCarry.innerHTML=flag["AC"];
    carry.innerHTML=flag["CY"];
    parity.innerHTML=flag["P"];
}
function convert(hex) {
    var decimal = parseInt(hex, 16);
    var binary = decimal.toString(2);
    return parseInt(decimal);
}
function convert2(decimal) {
    // var decimal = parseInt(binary, 2);
    var hex = decimal.toString(16).toUpperCase();
    return hex;
}
const find = {
    '00': 'NOP',
    '01': 'LXI BC data',
    '02': 'STAX BC',
    '03': 'INX BC',
    '04': 'INR B',
    '05': 'DCR B',
    '06': 'MVI B data',
    '07': 'RLC',
    '08': 'NOP',
    '09': 'DAD BC',
    '0A': 'LDAX B',
    '0B': 'DCX B',
    '0C': 'INR C',
    '0D': 'DCR C',
    '0E': 'MVI C data',
    '0F': 'RRC',
    '10': 'NOP',
    '11': 'LXI DE data',
    '12': 'STAX DE',
    '13': 'INX DE',
    '14': 'INR D',
    '15': 'DCR D',
    '16': 'MVI D data',
    '17': 'RAL',
    '18': 'NOP',
    '19': 'DAD DE',
    '1A': 'LDAX D',
    '1B': 'DCX D',
    '1C': 'INR E',
    '1D': 'DCR E',
    '1E': 'MVI E data',
    '1F': 'RAR',
    '20': 'RIM',
    '21': 'LXI HL data',
    '22': 'SHLD addr',
    '23': 'INX HL',
    '24': 'INR H',
    '25': 'DCR H',
    '26': 'MVI H data',
    '27': 'DAA',
    '28': 'NOP',
    '29': 'DAD HL',
    '2A': 'LHLD addr',
    '2B': 'DCX H',
    '2C': 'INR L',
    '2D': 'DCR L',
    '2E': 'MVI L data',
    '2F': 'CMA',
    '30': 'SIM',
    '31': 'LXI SP data',
    '32': 'STA addr',
    '33': 'INX SP',
    '34': 'MINR M',
    '35': 'MDCR M',
    '36': 'MVI M data',
    '37': 'STC',
    '38': 'NOP',
    '39': 'DAD SP',
    '3A': 'LDA addr',
    '3B': 'DCX SP',
    '3C': 'INR A',
    '3D': 'DCR A',
    '3E': 'MVI A data',
    '3F': 'CMC',
    '40': 'MOV B B',
    '41': 'MOV B C',
    '42': 'MOV B D',
    '43': 'MOV B E',
    '44': 'MOV B H',
    '45': 'MOV B L',
    '46': 'MMOV B M',
    '47': 'MOV B A',
    '48': 'MOV C B',
    '49': 'MOV C C',
    '4A': 'MOV C D',
    '4B': 'MOV C E',
    '4C': 'MOV C H',
    '4D': 'MOV C L',
    '4E': 'MMOV C M',
    '4F': 'MOV C A',
    '50': 'MOV D B',
    '51': 'MOV D C',
    '52': 'MOV D D',
    '53': 'MOV D E',
    '54': 'MOV D H',
    '55': 'MOV D L',
    '56': 'MMOV D M',
    '57': 'MOV D A',
    '58': 'MOV E B',
    '59': 'MOV E C',
    '5A': 'MOV E D',
    '5B': 'MOV E E',
    '5C': 'MOV E H',
    '5D': 'MOV E L',
    '5E': 'MMOV E M',
    '5F': 'MOV E A',
    '60': 'MOV H B',
    '61': 'MOV H C',
    '62': 'MOV H D',
    '63': 'MOV H E',
    '64': 'MOV H H',
    '65': 'MOV H L',
    '66': 'MMOV H M',
    '67': 'MOV H A',
    '68': 'MOV L B',
    '69': 'MOV L C',
    '6A': 'MOV L D',
    '6B': 'MOV L E',
    '6C': 'MOV L H',
    '6D': 'MOV L L',
    '6E': 'MMOV L M',
    '6F': 'MOV L A',
    '70': 'MMOV M B',
    '71': 'MMOV M C',
    '72': 'MMOV M D',
    '73': 'MMOV M E',
    '74': 'MMOV M H',
    '75': 'MMOV M L',
    '76': 'HLT',
    '77': 'MMOV M A',
    '78': 'MOV A B',
    '79': 'MOV A C',
    '7A': 'MOV A D',
    '7B': 'MOV A E',
    '7C': 'MOV A H',
    '7D': 'MOV A L',
    '7E': 'MMOV A M',
    '7F': 'MOV A A',
    '80': 'ADD B',
    '81': 'ADD C',
    '82': 'ADD D',
    '83': 'ADD E',
    '84': 'ADD H',
    '85': 'ADD L',
    '86': 'MADD M',
    '87': 'ADD A',
    '88': 'ADC B',
    '89': 'ADC C',
    '8A': 'ADC D',
    '8B': 'ADC E',
    '8C': 'ADC H',
    '8D': 'ADC L',
    '8E': 'MADC M',
    '8F': 'ADC A',
    '90': 'SUB B',
    '91': 'SUB C',
    '92': 'SUB D',
    '93': 'SUB E',
    '94': 'SUB H',
    '95': 'SUB L',
    '96': 'MSUB M',
    '97': 'SUB A',
    '98': 'SBB B',
    '99': 'SBB C',
    '9A': 'SBB D',
    '9B': 'SBB E',
    '9C': 'SBB H',
    '9D': 'SBB L',
    '9E': 'SBB M',
    '9F': 'SBB A',
    'A0': 'ANA B',
    'A1': 'ANA C',
    'A2': 'ANA D',
    'A3': 'ANA E',
    'A4': 'ANA H',
    'A5': 'ANA L',
    'A6': 'MANA M',
    'A7': 'ANA A',
    'A8': 'XRA B',
    'A9': 'XRA C',
    'AA': 'XRA D',
    'AB': 'XRA E',
    'AC': 'XRA H',
    'AD': 'XRA L',
    'AE': 'MXRA M',
    'AF': 'XRA A',
    'B0': 'ORA B',
    'B1': 'ORA C',
    'B2': 'ORA D',
    'B3': 'ORA E',
    'B4': 'ORA H',
    'B5': 'ORA L',
    'B6': 'MORA M',
    'B7': 'ORA A',
    'B8': 'CMP B',
    'B9': 'CMP C',
    'BA': 'CMP D',
    'BB': 'CMP E',
    'BC': 'CMP H',
    'BD': 'CMP L',
    'BE': 'MCMP M',
    'BF': 'CMP A',
    'C0': 'RNZ',
    'C1': 'POP B',
    'C2': 'JNZ addr',
    'C3': 'JMP addr',
    'C4': 'CNZ addr',
    'C5': 'PUSH B',
    'C6': 'ADI data',
    'C7': 'RST 0',
    'C8': 'RZ',
    'C9': 'RET',
    'CA': 'JZ addr',
    'CB': 'NOP', // The CB prefix is used for bit manipulation instructions, handled separately
    'CC': 'CZ addr',
    'CD': 'CALL addr',
    'CE': 'ACI data',
    'CF': 'RST 1',
    'D0': 'RNC',
    'D1': 'POP D',
    'D2': 'JNC addr',
    'D3': 'OUT data',
    'D4': 'CNC addr',
    'D5': 'PUSH D',
    'D6': 'SUI data',
    'D7': 'RST 2',
    'D8': 'RC',
    'D9': 'NOP', // The D9 opcode is used for the RET instruction with an additional prefix, handled separately
    'DA': 'JC addr',
    'DB': 'IN data',
    'DC': 'CC addr',
    'DD': 'NOP', // The DD and DDCB prefixes are used for IX register instructions, handled separately
    'DE': 'SBI data',
    'DF': 'RST 3',
    'E0': 'RPO',
    'E1': 'POP H',
    'E2': 'JPO addr',
    'E3': 'XTHL',
    'E4': 'CPO addr',
    'E5': 'PUSH H',
    'E6': 'ANI data',
    'E7': 'RST 4',
    'E8': 'RPE',
    'E9': 'PCHL',
    'EA': 'JPE addr',
    'EB': 'XCHG',
    'EC': 'CPE addr',
    'ED': 'NOP', // The ED and EDCB prefixes are used for IX register instructions, handled separately
    'EE': 'XRI data',
    'EF': 'RST 5',
    'F0': 'RP',
    'F1': 'POP PSW',
    'F2': 'JP addr',
    'F3': 'DI',
    'F4': 'CP addr',
    'F5': 'PUSH PSW',
    'F6': 'ORI data',
    'F7': 'RST 6',
    'F8': 'RM',
    'F9': 'SPHL',
    'FA': 'JM addr',
    'FB': 'EI',
    'FC': 'CM addr',
    'FD': 'NOP', // The FD and FDCB prefixes are used for IY register instructions, handled separately
    'FE': 'CPI data',
    'FF': 'RST 7'
}

const instructions={
        ADD: (srcReg) => {
            registers["A"]=convert(registers["A"]);
            registers[srcReg]=convert(registers[srcReg]);
            registers["A"] += registers[srcReg];
            if(registers["A"]>255){flag["CY"]=1;registers["A"]=255;}
            else flag["CY"]=0;
            flag["Z"]=registers["A"]==0?1:0;
            flag["S"]=registers["A"]<0?1:0;
            flag["P"]=checkParity(registers["A"]);
            registers["A"]=convert2(registers["A"]);
            registers[srcReg]=convert2(registers[srcReg]);
        },
        MADD: (address) => {
            registers["A"]=convert(registers["A"]);
            memory[address]=convert(memory[address]);
            registers["A"] += memory[address];
            if(registers["A"]>255){flag["CY"]=1;registers["A"]=255;}
            else flag["CY"]=0;
            flag["Z"]=registers["A"]==0?1:0;
            flag["S"]=registers["A"]<0?1:0;
            flag["P"]=checkParity(registers["A"]);
            registers["A"]=convert2(registers["A"]);
            memory[address]=convert2(memory[address]);
    },
        ADC:(srcReg)=>{
            registers["A"]=convert(registers["A"]);
            registers[srcReg]=convert(registers[srcReg]);
            registers["A"]+=flag["CY"]+registers[srcReg];
            if(registers["A"]>255){flag["CY"]=1;registers["A"]=255;}
            else flag["CY"]=0;
            flag["Z"]=registers["A"]==0?1:0;
            flag["S"]=registers["A"]<0?1:0;
            flag["P"]=checkParity(registers["A"]);
            registers["A"]=convert2(registers["A"]);
            registers[srcReg]=convert2(registers[srcReg]);
    },
        MADC: (address) => {
            registers["A"]=convert(registers["A"]);
            memory[address]=convert(memory[address]);
            registers["A"] +=flag["CY"]+memory[address];
            if(registers["A"]>255){flag["CY"]=1;registers["A"]=255;}
            else flag["CY"]=0;
            flag["Z"]=registers["A"]==0?1:0;
            flag["S"]=registers["A"]<0?1:0;
            flag["P"]=checkParity(registers["A"]);
            registers["A"]=convert2(registers["A"]);
            memory[address]=convert2(memory[address]);
    },
        ADI:(data)=>{
            registers["A"]=convert(registers["A"]);
            data=convert(data);
            registers["A"]+=data;
            if(registers["A"]>255){flag["CY"]=1;registers["A"]=255;}
            else flag["CY"]=0;
            flag["Z"]=registers["A"]==0?1:0;
            flag["S"]=registers["A"]<0?1:0;
            flag["P"]=checkParity(registers["A"]);
            registers["A"]=convert2(registers["A"]);
    },
        ACI:(data)=>{
            registers["A"]=convert(registers["A"]);
            data=convert(data);
            registers["A"]+=flag["CY"]+data;
            if(registers["A"]>255){flag["CY"]=1;registers["A"]=255;}
            else flag["CY"]=0;
            flag["Z"]=registers["A"]==0?1:0;
            flag["S"]=registers["A"]<0?1:0;
            flag["P"]=checkParity(registers["A"]);
            registers["A"]=convert2(registers["A"]);
    },
        DAD: (regPair) => {
            registers["H"]=convert(registers["H"]);
            registers["L"]=convert(registers["L"]);
            const hlValue = (registers["H"] << 8) | registers["L"];
            const rpValue = (registers[regPair[0]] << 8) | registers[regPair[1]];
            const result = hlValue + rpValue;
            registers["H"] = (result & 0xFF00) >> 8;
            registers["L"] = result & 0x00FF;
            if (result > 0xFFFF) {flag["CY"]=1;result=65535;}
            else flag["CY"] =0;
            flag["Z"]=result==0?1:0;
            flag["P"]=checkParity(result);
            registers["H"]=convert2(registers["H"]);
            registers["L"]=convert2(registers["L"]);
        },
        SBB: (srcReg) => {
            registers["A"]=convert(registers["A"]);
            registers[srcReg]=convert(registers[srcReg]);
            const carry =flag["CY"];
            const result = registers["A"] - registers[srcReg] - carry;
            flag["S"]=result<0?1:0;
            flag["Z"]=result==0?1:0;
            flag["P"]=checkParity(result);
            flag["CY"]=result<0 || result>255?1:0;
            registers["A"]=result;
            registers[srcReg]=convert2(registers[srcReg]);
            registers["A"]=convert2(registers["A"]);
        },
        SUI: (data) => {
            registers["A"]=convert(registers["A"]);
            data=convert(data);
            const carry =flag["CY"];
            const result = registers["A"] - data - carry;
            flag["CY"]=result<0 || result>255?1:0;
            flag["S"]=result<0?1:0;
            flag["Z"]=result==0?1:0;
            flag["P"]=checkParity(result);
            registers["A"] = result;
            registers["A"]=convert2(registers["A"]);
        },
        SBI: (data) => {
            registers["A"]=convert(registers["A"]);
            data=convert(data);
            const carry = flag["CY"];
            const result = registers["A"] - (data + carry);
            flag["CY"]=result<0 || result>255?1:0;
            flag["S"]=result<0?1:0;
            flag["Z"]=result==0?1:0;
            flag["P"]=checkParity(result);
            registers["A"] = result;
            registers["A"]=convert2(registers["A"]);
        },
        SUB: (srcReg) => {
            registers["A"]=convert(registers["A"]);
            registers[srcReg]=convert(registers[srcReg]);
            registers["A"] -= registers[srcReg];
            const result=registers["A"];
            flag["CY"]=result<0 || result>255?1:0;
            flag["S"]=result<0?1:0;
            flag["Z"]=result==0?1:0;
            flag["P"]=checkParity(result);
            registers["A"]=convert2(registers["A"]);
            registers[srcReg]=convert2(registers[srcReg]);
        },
        MSUB: (address) =>{
            registers["A"]=convert(registers["A"]);
            memory[address]=convert(memory[address]);
            registers["A"] -= memory[address];
            const result=registers["A"];
            flag["CY"]=result<0 || result>255?1:0;
            flag["S"]=result<0?1:0;
            flag["Z"]=result==0?1:0;
            flag["P"]=checkParity(result);
            registers["A"]=convert2(registers["A"]);
            memory[address]=convert2(memory[address]);
        },
        INR: (reg) => {
            registers[reg]=convert(registers[reg]);
            registers[reg]++;
            const result=registers[reg];
            flag["S"]=result<0?1:0;
            flag["Z"]=result==0?1:0;
            flag["P"]=checkParity(result);
            registers[reg]=convert2(registers[reg]);
        },
        INX: (regPair) => {
            registers[regPair[0]]=convert(registers[regPair[0]]);
            registers[regPair[1]]=convert(registers[regPair[1]]);
            const regPairValue = (registers[regPair[0]] << 8) | registers[regPair[1]];
            regPairValue++;
            registers[regPair[0]] = (regPairValue & 0xFF00) >> 8;
            registers[regPair[1]] = regPairValue & 0x00FF;
            const result=regPairValue;
            flag["S"]=result<0?1:0;
            flag["Z"]=result==0?1:0;
            flag["P"]=checkParity(result);
            registers[regPair[0]]=convert2(registers[regPair[0]]);
            registers[regPair[1]]=convert2(registers[regPair[1]]);
        },
        MINR: (address) => {
            memory[address]=convert(memory[address]);
            memory[address]++;
            const result=memory[address];
            flag["S"]=result<0?1:0;
            flag["Z"]=result==0?1:0;
            flag["P"]=checkParity(result);
            memory[address]=convert2(memory[address]);
        },
        DCR: (reg) => {
            registers[reg]=convert(registers[reg]);
            registers[reg]--;
            const result=registers[reg];
            flag["S"]=result<0?1:0;
            flag["Z"]=result==0?1:0;
            flag["P"]=checkParity(result);
            registers[reg]=convert2(registers[reg]);
        },
        MDCR: (address) => {
            memory[address]=convert(memory[address]);
            memory[address]--;
            flag["S"]=result<0?1:0;
            flag["Z"]=result==0?1:0;
            flag["P"]=checkParity(result);
            memory[address]=convert2(memory[address]);
        },
        DCX: (regPair) => {
            registers[regPair[0]]=convert(registers[regPair[0]]);
            registers[regPair[1]]=convert(registers[regPair[1]]);
            const regPairValue = (registers[regPair[0]] << 8) | registers[regPair[1]];
            regPairValue--;
            registers[regPair[0]] = (regPairValue & 0xFF00) >> 8;
            registers[regPair[1]] = regPairValue & 0x00FF;
            const result=regPairValue;
            flag["S"]=result<0?1:0;
            flag["Z"]=result==0?1:0;
            flag["P"]=checkParity(result);
            registers[regPair[0]]=convert2(registers[regPair[0]]);
            registers[regPair[1]]=convert2(registers[regPair[1]]);
        },

        MOV:(srcReg,desReg)=>{
            registers[desReg]=registers[srcReg];
        },
        MMOV:(desReg,address)=>{
            registers[desReg]=memory[address];
        },
        IMOV:(desReg,data)=>{
            registers[desReg]=data;
        },
        MMVI:(address,data)=>{
            memory[address]=data;
        },
        MVI:(desReg,data)=>{
            registers[desReg]=data;
        },
        LXI: (destRegPair, data) => {
            data=convert(data);
            registers[destRegPair[0]] = (data & 0xFF00) >> 8; registers[destRegPair[1]] = data & 0x00FF; 
            registers[destRegPair[0]]=convert2(registers[destRegPair[0]]);
            registers[destRegPair[1]]=convert2(registers[destRegPair[1]]);
        },
        LDA: (address) => {
            memory[address]=convert(memory[address]);
            registers["A"] = memory[address];
            registers["A"]=convert2(registers["A"]);
        },
        LDAX: (regPair) => {
            registers[regPair[0]]=convert(registers[regPair[0]]);
            registers[regPair[1]]=convert(registers[regPair[1]]);
            registers["A"] = memory[(registers[regPair[0]] << 8) | registers[regPair[1]]];
            registers["A"]=convert2(registers["A"]);
            registers[regPair[0]]=convert2(registers[regPair[0]]);
            registers[regPair[1]]=convert2(registers[regPair[1]]);
        },
        LHLD:(address)=>{
            memory[address]=convert(memory[address]);
            memory[address+1]=convert(memory[address+1]);
            registers["L"]=memory[address];registers["H"]=memory[address+1];
            registers["L"]=convert2(registers["L"]);
            registers["H"]=convert2(registers["H"]);
        },
        STA:(address)=>{
            registers["A"]=convert(registers["A"]);
            memory[address]=registers["A"];
            memory[address]=convert2(memory[address]);
            registers["A"]=convert2(registers["A"]);
        },
        STAX:(regPair)=>{memory[registers[regPair[1]]*100+registers[regPair[0]]]=registers["A"];},
        SHLD:(address)=>{memory[address]=registers["L"];memory[address+1]=registers["H"];},
        XCHG: () => { [registers["H"], registers["D"]] = [registers["D"], registers["H"]]; [registers["L"], registers["E"]] = [registers["E"], registers["L"]]; },

        CMP:(srcReg)=>{
            registers["A"]=convert(registers["A"]);
            registers[srcReg]=convert(registers[srcReg]);
            const result = registers["A"]-registers[srcReg];
            flag["S"]=result<0?1:0;
            flag["Z"]=result==0?1:0;
            flag["P"]=checkParity(result);
            registers["A"]=convert2(registers["A"]);
            registers[srcReg]=convert2(registers[srcReg]);
        },
        MCMP:(address)=>{
            registers["A"]=convert(registers["A"]);
            memory[address]=convert(memory[address]);
            const result = registers["A"]-memory[address];
            flag["S"]=result<0?1:0;
            flag["Z"]=result==0?1:0;
            flag["P"]=checkParity(result);
            registers["A"]=convert2(registers["A"]);
            memory[address]=convert2(memory[address]);
        },
        CPI:(data)=>{
            registers["A"]=convert(registers["A"]);
            data=convert(data);
            const result = registers["A"]-data;
            if(result<0)flag["CY"]=1;
            else if(result==0)flag["Z"]=1;
            else {flag["Z"]=0;flag["CY"]=0;};
            registers["A"]=convert2(registers["A"]);
        },
        ANA: (srcReg) => {
            registers["A"]=convert(registers["A"]);
            registers[srcReg]=convert(registers[srcReg]);
            registers["A"] &= registers[srcReg];
            const result=registers["A"];
            flag["S"]=result<0?1:0;
            flag["Z"]=result==0?1:0;
            flag["P"]=checkParity(result);
            registers["A"]=convert2(registers["A"]);
            registers[srcReg]=convert2(registers[srcReg]);
        },
        MANA: (address) => {
            registers["A"]=convert(registers["A"]);
            memory[address]=convert(memory[address]);
            registers["A"] &= memory[address];
            const result=registers["A"];
            flag["S"]=result<0?1:0;
            flag["Z"]=result==0?1:0;
            flag["P"]=checkParity(result);
            registers["A"]=convert2(registers["A"]);
            memory[address]=convert2(memory[address]);
        },
        ANI: (data) => {
            registers["A"]=convert(registers["A"]);
            data=convert(data);
            registers["A"] &= data;
            const result=registers["A"];
            flag["S"]=result<0?1:0;
            flag["Z"]=result==0?1:0;
            flag["P"]=checkParity(result);
            registers["A"]=convert2(registers["A"]);
        },
        ORA: (srcReg) => {
            registers["A"]=convert(registers["A"]);
            registers[srcReg]=convert(registers[srcReg]);
            registers["A"] |= registers[srcReg];
            const result=registers["A"];
            flag["S"]=result<0?1:0;
            flag["Z"]=result==0?1:0;
            flag["P"]=checkParity(result);
            registers["A"]=convert2(registers["A"]);
            registers[srcReg]=convert2(registers[srcReg]);
        },
        MORA: (address) => {
            registers["A"]=convert(registers["A"]);
            memory[address]=convert(memory[address]);
            registers["A"] |= memory[address];
            const result=registers["A"];
            flag["S"]=result<0?1:0;
            flag["Z"]=result==0?1:0;
            flag["P"]=checkParity(result);
            registers["A"]=convert2(registers["A"]);
            memory[address]=convert2(memory[address]);
        },
        ORI: (data) => {
            registers["A"]=convert(registers["A"]);
            data=convert(data);
            registers["A"] |= data;
            const result=registers["A"];
            flag["S"]=result<0?1:0;
            flag["Z"]=result==0?1:0;
            flag["P"]=checkParity(result);
            registers["A"]=convert2(registers["A"]);
        },
        XRA: (srcReg) => {
            registers["A"]=convert(registers["A"]);
            registers[srcReg]=convert(registers[srcReg]);
            registers["A"] ^= registers[srcReg];
            const result=registers["A"];
            flag["S"]=result<0?1:0;
            flag["Z"]=result==0?1:0;
            flag["P"]=checkParity(result);
            registers["A"]=convert2(registers["A"]);
            registers[srcReg]=convert2(registers[srcReg]);
        },
        MXRA: (address) => {
            registers["A"]=convert(registers["A"]);
            memory[address]=convert(memory[address]);
            registers["A"] ^= memory[address];
            const result=registers["A"];
            flag["S"]=result<0?1:0;
            flag["Z"]=result==0?1:0;
            flag["P"]=checkParity(result);
            registers["A"]=convert2(registers["A"]);
            memory[address]=convert2(memory[address]);
        },
        XRI: (data) => {
            registers["A"]=convert(registers["A"]);
            data=convert(data);
            registers["A"] ^= data;
            const result=registers["A"];
            flag["S"]=result<0?1:0;
            flag["Z"]=result==0?1:0;
            flag["P"]=checkParity(result);
            registers["A"]=convert2(registers["A"]);
        },
        RLC: () => {
            registers["A"]=convert(registers["A"]);
            const msb = (registers["A"] & 0x80) >> 7;
            registers["A"] = ((registers["A"] << 1) | flag["CY"]) & 0xFF;
            flag["CY"] = msb;
            registers["A"]=convert2(registers["A"]);
        },
        RRC: () => {
            registers["A"]=convert(registers["A"]);
            const lsb = registers["A"] & 0x01;
            registers["A"] = (registers["A"] >> 1) | (flag["CY"] << 7);
            flag["CY"] = lsb;
            registers["A"]=convert2(registers["A"]);
        },
        RAL: () => {
            registers["A"]=convert(registers["A"]);
            const msb = (registers["A"] & 0x80) >> 7;
            registers["A"] = ((registers["A"] << 1) | flag["CY"]) & 0xFF;
            flag["CY"] = msb;
            registers["A"]=convert2(registers["A"]);
        },
        RAR: () => {
            registers["A"]=convert(registers["A"]);
            const lsb = registers["A"] & 0x01;
            registers["A"] = (registers["A"] >> 1) | (flag["CY"] << 7);
            flag["CY"] = lsb;
            registers["A"]=convert2(registers["A"]);
        },
        CMA: () => {
            registers["A"]=convert(registers["A"]);
            registers["A"] = ~registers["A"] & 0xFF;
            registers["A"]=convert2(registers["A"]);
        },
        CMC: () => {
            flag["CY"] = flag["CY"] ? 0 : 1;
        },
        STC: () => {
            flag["CY"] = 1;
        },


        JMP:(Newaddress) => {address=Newaddress;},
        JC:(Newaddress) => {if(flag["CY"]==1)address=Newaddress;},
        JNC:(Newaddress) => {if(flag["CY"]==0)address=Newaddress;},
        JP:(Newaddress) => {if(flag["S"]==0)address=Newaddress;},
        JM:(Newaddress) => {if(flag["S"]==1)address=Newaddress;},
        JZ:(Newaddress) => {if(flag["Z"]==1)address=Newaddress;},
        JNZ:(Newaddress) => {if(flag["Z"]==0)address=Newaddress;},
        JPE:(Newaddress)=>{if(flag["P"]==1)address=Newaddress;},
        JPO:(Newaddress)=>{if(flag["P"]==0)address=Newaddress;},

        CALL:(Newaddress) => {
            stack.push(address);
            address=Newaddress;
        },
        CC:(Newaddress)=>{if(flag["CY"]==1){
            stack.push(address);
            address=Newaddress;}
        },
        CNC:(Newaddress)=>{if(flag["CY"]==1){
            stack.push(address);
            address=Newaddress;}
        },
        CP:(Newaddress)=>{if(flag["S"]==0){
            stack.push(address);
            address=Newaddress;}
        },
        CM:(Newaddress)=>{if(flag["S"]==0){
            stack.push(address);
            address=Newaddress;}
        },
        CZ:(Newaddress)=>{if(flag["Z"]==1){
            stack.push(address);
            address=Newaddress;}
        },
        CNZ:(Newaddress)=>{if(flag["Z"]==0){
            stack.push(address);
            address=Newaddress;}
        },
        CPE:(Newaddress)=>{if(flag["P"]==1){
            stack.push(address);
            address=Newaddress;}
        },
        CPO:(Newaddress)=>{if(flag["P"]==0){
            stack.push(address);
            address=Newaddress;}
        },

        RET: () => {
            address=stack.pop();
        },
        RC:(Newaddress)=>{if(flag["CY"]==1){address=Newaddress;}},
        RNC:(Newaddress)=>{if(flag["CY"]==0){address=Newaddress;}},
        RP:(Newaddress)=>{if(flag["S"]==0){address=Newaddress;}},
        RM:(Newaddress)=>{if(flag["S"]==1){address=Newaddress;}},
        RZ:(Newaddress)=>{if(flag["Z"]==1){address=Newaddress;}},
        RNZ:(Newaddress)=>{if(flag["Z"]==0){address=Newaddress;}},
        RPE:(Newaddress)=>{if(flag["P"]==1){address=Newaddress;}},
        RPO:(Newaddress)=>{if(flag["P"]==0){address=Newaddress;}},

        RST0:()=>{address=0;},
        RST1:()=>{address=8;},
        RST2:()=>{address=10;},
        RST3:()=>{address=18;},
        RST4:()=>{address=20;},
        RST5:()=>{address=28;},
        RST6:()=>{address=30;},
        RST7:()=>{address=38;},

        HLT: () => { halted = true; },
        DI: () => { interruptsEnabled = false; },
        EI: () => { interruptsEnabled = true; }
}

function checkParity(temp) {
    let count = 0;
    let t = temp.toString(); // Convert temp to string
    for (let i = 0; i < t.length; i++) {
        let bit = parseInt(t[i], 10); // Parse each character of the string
        if (bit) {
            count++;
        }
    }
    return count % 2 === 0;
}
