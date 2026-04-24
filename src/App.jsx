import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// ─── DATA ────────────────────────────────────────────────────────────────────
const FC_MAP = {
  "BA01": { estado: "Bahia", tipologia: "Totable + Super" },
  "BA02": { estado: "Bahia", tipologia: "Non Totable + H&B" },
  "BA03": { estado: "Bahia", tipologia: "Totable" },
  "CE01": { estado: "Ceará", tipologia: "Totable + Non Totable (Metro)" },
  "DF01": { estado: "Distrito Federal", tipologia: "Totable (Metro)" },
  "DF02": { estado: "Distrito Federal", tipologia: "Totable + Non Totable" },
  "DF03": { estado: "Distrito Federal", tipologia: "Totable + Non Totable" },
  "ES01": { estado: "Espírito Santo", tipologia: "Totable + Non Totable (Metro)" },
  "MG01": { estado: "Minas Gerais", tipologia: "Totable + Non Totable" },
  "MG02": { estado: "Minas Gerais", tipologia: "Totable + Non Totable" },
  "MG03": { estado: "Minas Gerais", tipologia: "Non Totable" },
  "MG04": { estado: "Minas Gerais", tipologia: "Non Totable" },
  "PE01": { estado: "Pernambuco", tipologia: "Totable + Non Totable" },
  "PR01": { estado: "Paraná", tipologia: "Totable + Non Totable" },
  "RC01": { estado: "São Paulo", tipologia: "Receiving" },
  "RC02": { estado: "São Paulo", tipologia: "Receiving" },
  "RC03": { estado: "São Paulo", tipologia: "Receiving" },
  "RC04": { estado: "São Paulo", tipologia: "Receiving" },
  "RJ01": { estado: "Rio de Janeiro", tipologia: "Totable + Non Totable (Metro)" },
  "RJ02": { estado: "Rio de Janeiro", tipologia: "Totable + Non Totable" },
  "RS01": { estado: "Rio Grande do Sul", tipologia: "Totable (Metro)" },
  "RS02": { estado: "Rio Grande do Sul", tipologia: "Totable + Non Totable" },
  "RS03": { estado: "Rio Grande do Sul", tipologia: "Non Totable" },
  "RT01": { estado: "São Paulo", tipologia: "Triage Center" },
  "SC02": { estado: "Santa Catarina", tipologia: "Totable + Non Totable" },
  "SP02": { estado: "São Paulo", tipologia: "Totable + Non Totable" },
  "SP04": { estado: "São Paulo", tipologia: "Totable" },
  "SP06": { estado: "São Paulo", tipologia: "Totable + Super" },
  "SP09": { estado: "São Paulo", tipologia: "H&B" },
  "SP10": { estado: "São Paulo", tipologia: "Non Totable" },
  "SP11": { estado: "São Paulo", tipologia: "Non Totable" },
  "SP12": { estado: "São Paulo", tipologia: "Totable" },
  "SP14": { estado: "São Paulo", tipologia: "Totable" },
  "SP15": { estado: "São Paulo", tipologia: "Totable" },
  "SP16": { estado: "São Paulo", tipologia: "Super" },
  "SP17": { estado: "São Paulo", tipologia: "Super" },
  "SP18": { estado: "São Paulo", tipologia: "Totable" },
  "SP19": { estado: "São Paulo", tipologia: "Totable" },
  "SP21": { estado: "São Paulo", tipologia: "Non Totable" },
  "SP24": { estado: "São Paulo", tipologia: "Totable + Non Totable (Metro)" },
  "SP25": { estado: "São Paulo", tipologia: "Totable" },
  "SP26": { estado: "São Paulo", tipologia: "Totable" },
  "SP27": { estado: "São Paulo", tipologia: "Totable" },
  "SP28": { estado: "São Paulo", tipologia: "Totable + Non Totable (Metro)" },
  "SP29": { estado: "São Paulo", tipologia: "H&B" },
  "SP30": { estado: "São Paulo", tipologia: "Totable + Non Totable (Metro)" },
  "SP31": { estado: "São Paulo", tipologia: "Totable" },
  "SP33": { estado: "São Paulo", tipologia: "Totable" },
};

const RAW = `Plan 2026|BA01|Representante de Envios|Salários|3416
Plan 2026|BA01|Representante de Envios|Beneficios|1162
Plan 2026|BA01|Representante de Envios|Fretado|829
Plan 2026|BA01|Representante de Envios|Refeição|568
Plan 2026|BA02|Representante de Envios|Salários|3992
Plan 2026|BA02|Representante de Envios|Beneficios|1162
Plan 2026|BA02|Representante de Envios|Fretado|1471
Plan 2026|BA02|Representante de Envios|Refeição|751
Plan 2026|DF01|Representante de Envios|Salários|4006
Plan 2026|DF01|Representante de Envios|Beneficios|1602
Plan 2026|DF01|Representante de Envios|Fretado|1259
Plan 2026|DF01|Representante de Envios|Refeição|455
Plan 2026|MG01|Representante de Envios|Salários|4564
Plan 2026|MG01|Representante de Envios|Beneficios|946
Plan 2026|MG01|Representante de Envios|Fretado|1200
Plan 2026|MG01|Representante de Envios|Refeição|639
Plan 2026|MG02|Representante de Envios|Salários|4028
Plan 2026|MG02|Representante de Envios|Beneficios|946
Plan 2026|MG02|Representante de Envios|Fretado|768
Plan 2026|MG02|Representante de Envios|Refeição|583
Plan 2026|PE01|Representante de Envios|Salários|3104
Plan 2026|PE01|Representante de Envios|Beneficios|1259
Plan 2026|PE01|Representante de Envios|Fretado|804
Plan 2026|PE01|Representante de Envios|Refeição|578
Plan 2026|PR01|Representante de Envios|Salários|4161
Plan 2026|PR01|Representante de Envios|Beneficios|946
Plan 2026|PR01|Representante de Envios|Fretado|1035
Plan 2026|PR01|Representante de Envios|Refeição|607
Plan 2026|RC01|Representante de Envios|Salários|4334
Plan 2026|RC01|Representante de Envios|Beneficios|946
Plan 2026|RC01|Representante de Envios|Fretado|1012
Plan 2026|RC01|Representante de Envios|Refeição|796
Plan 2026|RJ02|Representante de Envios|Salários|3308
Plan 2026|RJ02|Representante de Envios|Beneficios|1372
Plan 2026|RJ02|Representante de Envios|Fretado|821
Plan 2026|RJ02|Representante de Envios|Refeição|648
Plan 2026|RS01|Representante de Envios|Salários|3542
Plan 2026|RS01|Representante de Envios|Beneficios|3060
Plan 2026|RS01|Representante de Envios|Fretado|2044
Plan 2026|RS01|Representante de Envios|Refeição|892
Plan 2026|RT01|Representante de Envios|Salários|3710
Plan 2026|RT01|Representante de Envios|Beneficios|946
Plan 2026|RT01|Representante de Envios|Fretado|1218
Plan 2026|RT01|Representante de Envios|Refeição|738
Plan 2026|SC02|Representante de Envios|Salários|4161
Plan 2026|SC02|Representante de Envios|Beneficios|946
Plan 2026|SC02|Representante de Envios|Fretado|745
Plan 2026|SC02|Representante de Envios|Refeição|539
Plan 2026|SP02|Representante de Envios|Salários|3874
Plan 2026|SP02|Representante de Envios|Beneficios|946
Plan 2026|SP02|Representante de Envios|Fretado|1218
Plan 2026|SP02|Representante de Envios|Refeição|734
Plan 2026|SP04|Representante de Envios|Salários|4015
Plan 2026|SP04|Representante de Envios|Beneficios|946
Plan 2026|SP04|Representante de Envios|Fretado|1327
Plan 2026|SP04|Representante de Envios|Refeição|547
Plan 2026|SP06|Representante de Envios|Salários|4007
Plan 2026|SP06|Representante de Envios|Beneficios|946
Plan 2026|SP06|Representante de Envios|Fretado|1033
Plan 2026|SP06|Representante de Envios|Refeição|618
Plan 2026|SP09|Representante de Envios|Salários|4945
Plan 2026|SP09|Representante de Envios|Beneficios|946
Plan 2026|SP09|Representante de Envios|Fretado|1641
Plan 2026|SP09|Representante de Envios|Refeição|1695
Plan 2026|SP10|Representante de Envios|Salários|4197
Plan 2026|SP10|Representante de Envios|Beneficios|946
Plan 2026|SP10|Representante de Envios|Fretado|866
Plan 2026|SP10|Representante de Envios|Refeição|622
Plan 2026|SP11|Representante de Envios|Salários|4541
Plan 2026|SP11|Representante de Envios|Beneficios|946
Plan 2026|SP11|Representante de Envios|Fretado|1065
Plan 2026|SP11|Representante de Envios|Refeição|704
Plan 2026|SP14|Representante de Envios|Salários|4398
Plan 2026|SP14|Representante de Envios|Beneficios|946
Plan 2026|SP14|Representante de Envios|Fretado|1251
Plan 2026|SP14|Representante de Envios|Refeição|727
Plan 2026|SP15|Representante de Envios|Salários|3914
Plan 2026|SP15|Representante de Envios|Beneficios|946
Plan 2026|SP15|Representante de Envios|Fretado|1658
Plan 2026|SP15|Representante de Envios|Refeição|939
Plan 2026|SP18|Representante de Envios|Salários|4069
Plan 2026|SP18|Representante de Envios|Beneficios|946
Plan 2026|SP18|Representante de Envios|Fretado|1008
Plan 2026|SP18|Representante de Envios|Refeição|694
Plan 2026|SP19|Representante de Envios|Salários|4069
Plan 2026|SP19|Representante de Envios|Beneficios|946
Plan 2026|SP19|Representante de Envios|Fretado|1010
Plan 2026|SP19|Representante de Envios|Refeição|664
Plan 2026|SP21|Representante de Envios|Salários|4064
Plan 2026|SP21|Representante de Envios|Beneficios|946
Plan 2026|SP21|Representante de Envios|Fretado|1046
Plan 2026|SP21|Representante de Envios|Refeição|722
Plan 2026|SP24|Representante de Envios|Salários|5276
Plan 2026|SP24|Representante de Envios|Beneficios|0
Plan 2026|SP24|Representante de Envios|Fretado|1014
Plan 2026|SP24|Representante de Envios|Refeição|1158
Plan 2026|BA01|Team Leader|Salários|10379
Plan 2026|BA01|Team Leader|Beneficios|5267
Plan 2026|BA01|Team Leader|Fretado|829
Plan 2026|BA01|Team Leader|Refeição|568
Plan 2026|BA02|Team Leader|Salários|8548
Plan 2026|BA02|Team Leader|Beneficios|5267
Plan 2026|BA02|Team Leader|Fretado|1471
Plan 2026|BA02|Team Leader|Refeição|751
Plan 2026|DF01|Team Leader|Salários|11538
Plan 2026|DF01|Team Leader|Beneficios|3155
Plan 2026|DF01|Team Leader|Fretado|1259
Plan 2026|DF01|Team Leader|Refeição|455
Plan 2026|MG01|Team Leader|Salários|13061
Plan 2026|MG01|Team Leader|Beneficios|4063
Plan 2026|MG01|Team Leader|Fretado|1200
Plan 2026|MG01|Team Leader|Refeição|639
Plan 2026|MG02|Team Leader|Salários|13061
Plan 2026|MG02|Team Leader|Beneficios|4063
Plan 2026|MG02|Team Leader|Fretado|768
Plan 2026|MG02|Team Leader|Refeição|583
Plan 2026|PE01|Team Leader|Salários|11576
Plan 2026|PE01|Team Leader|Beneficios|4827
Plan 2026|PE01|Team Leader|Fretado|804
Plan 2026|PE01|Team Leader|Refeição|578
Plan 2026|PR01|Team Leader|Salários|11568
Plan 2026|PR01|Team Leader|Beneficios|4063
Plan 2026|PR01|Team Leader|Fretado|1035
Plan 2026|PR01|Team Leader|Refeição|607
Plan 2026|RC01|Team Leader|Salários|13357
Plan 2026|RC01|Team Leader|Beneficios|4063
Plan 2026|RC01|Team Leader|Fretado|1012
Plan 2026|RC01|Team Leader|Refeição|796
Plan 2026|RC02|Team Leader|Salários|13548
Plan 2026|RC02|Team Leader|Beneficios|4063
Plan 2026|RC02|Team Leader|Fretado|747
Plan 2026|RC02|Team Leader|Refeição|924
Plan 2026|RC03|Team Leader|Salários|13061
Plan 2026|RC03|Team Leader|Beneficios|4063
Plan 2026|RC03|Team Leader|Fretado|973
Plan 2026|RC03|Team Leader|Refeição|0
Plan 2026|RJ02|Team Leader|Salários|12069
Plan 2026|RJ02|Team Leader|Beneficios|2197
Plan 2026|RJ02|Team Leader|Fretado|821
Plan 2026|RJ02|Team Leader|Refeição|648
Plan 2026|RS01|Team Leader|Salários|11506
Plan 2026|RS01|Team Leader|Beneficios|2851
Plan 2026|RS01|Team Leader|Fretado|2044
Plan 2026|RS01|Team Leader|Refeição|892
Plan 2026|RT01|Team Leader|Salários|14086
Plan 2026|RT01|Team Leader|Beneficios|4063
Plan 2026|RT01|Team Leader|Fretado|1218
Plan 2026|RT01|Team Leader|Refeição|738
Plan 2026|SC02|Team Leader|Salários|13610
Plan 2026|SC02|Team Leader|Beneficios|4063
Plan 2026|SC02|Team Leader|Fretado|745
Plan 2026|SC02|Team Leader|Refeição|539
Plan 2026|SP02|Team Leader|Salários|13610
Plan 2026|SP02|Team Leader|Beneficios|4063
Plan 2026|SP02|Team Leader|Fretado|1218
Plan 2026|SP02|Team Leader|Refeição|734
Plan 2026|SP04|Team Leader|Salários|13541
Plan 2026|SP04|Team Leader|Beneficios|4063
Plan 2026|SP04|Team Leader|Fretado|1327
Plan 2026|SP04|Team Leader|Refeição|547
Plan 2026|SP06|Team Leader|Salários|13061
Plan 2026|SP06|Team Leader|Beneficios|4063
Plan 2026|SP06|Team Leader|Fretado|1033
Plan 2026|SP06|Team Leader|Refeição|618
Plan 2026|SP09|Team Leader|Salários|11131
Plan 2026|SP09|Team Leader|Beneficios|4063
Plan 2026|SP09|Team Leader|Fretado|1641
Plan 2026|SP09|Team Leader|Refeição|1695
Plan 2026|SP10|Team Leader|Salários|13061
Plan 2026|SP10|Team Leader|Beneficios|4063
Plan 2026|SP10|Team Leader|Fretado|866
Plan 2026|SP10|Team Leader|Refeição|622
Plan 2026|SP11|Team Leader|Salários|13061
Plan 2026|SP11|Team Leader|Beneficios|4063
Plan 2026|SP11|Team Leader|Fretado|1065
Plan 2026|SP11|Team Leader|Refeição|704
Plan 2026|SP14|Team Leader|Salários|14981
Plan 2026|SP14|Team Leader|Beneficios|4063
Plan 2026|SP14|Team Leader|Fretado|1251
Plan 2026|SP14|Team Leader|Refeição|727
Plan 2026|SP15|Team Leader|Salários|14317
Plan 2026|SP15|Team Leader|Beneficios|4063
Plan 2026|SP15|Team Leader|Fretado|1658
Plan 2026|SP15|Team Leader|Refeição|939
Plan 2026|SP18|Team Leader|Salários|14602
Plan 2026|SP18|Team Leader|Beneficios|4063
Plan 2026|SP18|Team Leader|Fretado|1008
Plan 2026|SP18|Team Leader|Refeição|694
Plan 2026|SP19|Team Leader|Salários|14602
Plan 2026|SP19|Team Leader|Beneficios|4063
Plan 2026|SP19|Team Leader|Fretado|1010
Plan 2026|SP19|Team Leader|Refeição|664
Plan 2026|SP24|Team Leader|Salários|11176
Plan 2026|SP24|Team Leader|Beneficios|0
Plan 2026|SP24|Team Leader|Fretado|1014
Plan 2026|SP24|Team Leader|Refeição|1158
Plan 2026|MG03|Team Leader|Salários|13061
Plan 2026|MG03|Team Leader|Beneficios|4063
Plan 2026|MG03|Team Leader|Fretado|1400
Plan 2026|MG03|Team Leader|Refeição|559
Plan 2026|MG04|Team Leader|Salários|13061
Plan 2026|MG04|Team Leader|Beneficios|4063
Plan 2026|MG04|Team Leader|Fretado|1400
Plan 2026|MG04|Team Leader|Refeição|559
Plan 2026|SP21|Team Leader|Salários|14500
Plan 2026|SP21|Team Leader|Beneficios|4063
Plan 2026|SP21|Team Leader|Fretado|1046
Plan 2026|SP21|Team Leader|Refeição|722
Plan 2026|SP25|Team Leader|Salários|14317
Plan 2026|SP25|Team Leader|Beneficios|4063
Plan 2026|SP25|Team Leader|Fretado|1009
Plan 2026|SP25|Team Leader|Refeição|921
Plan 2026|SP26|Team Leader|Salários|14317
Plan 2026|SP26|Team Leader|Beneficios|4063
Plan 2026|SP26|Team Leader|Fretado|962
Plan 2026|SP26|Team Leader|Refeição|1050
Plan 2026|SP27|Team Leader|Salários|14317
Plan 2026|SP27|Team Leader|Beneficios|4063
Plan 2026|SP27|Team Leader|Fretado|1693
Plan 2026|SP27|Team Leader|Refeição|1136
Plan 2026|SP28|Team Leader|Salários|11176
Plan 2026|SP28|Team Leader|Beneficios|3155
Plan 2026|SP28|Team Leader|Fretado|1076
Plan 2026|SP28|Team Leader|Refeição|1179
Plan 2026|ES01|Team Leader|Salários|11176
Plan 2026|ES01|Team Leader|Beneficios|3155
Plan 2026|ES01|Team Leader|Fretado|1076
Plan 2026|ES01|Team Leader|Refeição|1179
Plan 2026|SP29|Team Leader|Salários|11131
Plan 2026|SP29|Team Leader|Beneficios|4063
Plan 2026|SP29|Team Leader|Fretado|1887
Plan 2026|SP29|Team Leader|Refeição|1388
Plan 2026|SP30|Team Leader|Salários|11506
Plan 2026|SP30|Team Leader|Beneficios|2851
Plan 2026|SP30|Team Leader|Fretado|1076
Plan 2026|SP30|Team Leader|Refeição|2004
Plan 2026|SP31|Team Leader|Salários|14317
Plan 2026|SP31|Team Leader|Beneficios|4063
Plan 2026|SP31|Team Leader|Fretado|920
Plan 2026|SP31|Team Leader|Refeição|1020
Plan 2026|DF02|Team Leader|Salários|11506
Plan 2026|DF02|Team Leader|Beneficios|2851
Plan 2026|DF02|Team Leader|Fretado|1076
Plan 2026|DF02|Team Leader|Refeição|1179
Plan 2026|SP33|Team Leader|Salários|14317
Plan 2026|SP33|Team Leader|Beneficios|4063
Plan 2026|SP33|Team Leader|Fretado|920
Plan 2026|SP33|Team Leader|Refeição|1020
Plan 2026|DF03|Team Leader|Salários|11538
Plan 2026|DF03|Team Leader|Beneficios|3155
Plan 2026|DF03|Team Leader|Fretado|1259
Plan 2026|DF03|Team Leader|Refeição|455
2+10|BA01|Representante de Envios|Salários|3444
2+10|BA01|Representante de Envios|Beneficios|1162
2+10|BA01|Representante de Envios|Fretado|804
2+10|BA01|Representante de Envios|Refeição|676
2+10|BA02|Representante de Envios|Salários|3992
2+10|BA02|Representante de Envios|Beneficios|1162
2+10|BA02|Representante de Envios|Fretado|1188
2+10|BA02|Representante de Envios|Refeição|1126
2+10|MG01|Representante de Envios|Salários|4564
2+10|MG01|Representante de Envios|Beneficios|946
2+10|MG01|Representante de Envios|Fretado|1400
2+10|MG01|Representante de Envios|Refeição|559
2+10|MG02|Representante de Envios|Salários|4028
2+10|MG02|Representante de Envios|Beneficios|946
2+10|MG02|Representante de Envios|Fretado|764
2+10|MG02|Representante de Envios|Refeição|582
2+10|PE01|Representante de Envios|Salários|3104
2+10|PE01|Representante de Envios|Beneficios|1259
2+10|PE01|Representante de Envios|Fretado|841
2+10|PE01|Representante de Envios|Refeição|837
2+10|PR01|Representante de Envios|Salários|3673
2+10|PR01|Representante de Envios|Beneficios|946
2+10|PR01|Representante de Envios|Fretado|955
2+10|PR01|Representante de Envios|Refeição|841
2+10|RC01|Representante de Envios|Salários|4312
2+10|RC01|Representante de Envios|Beneficios|946
2+10|RC01|Representante de Envios|Fretado|1001
2+10|RC01|Representante de Envios|Refeição|626
2+10|RC02|Representante de Envios|Salários|4046
2+10|RC02|Representante de Envios|Beneficios|946
2+10|RC02|Representante de Envios|Fretado|747
2+10|RC02|Representante de Envios|Refeição|924
2+10|RC03|Representante de Envios|Salários|4029
2+10|RC03|Representante de Envios|Beneficios|946
2+10|RC03|Representante de Envios|Fretado|973
2+10|RC03|Representante de Envios|Refeição|0
2+10|RJ02|Representante de Envios|Salários|3308
2+10|RJ02|Representante de Envios|Beneficios|1372
2+10|RJ02|Representante de Envios|Fretado|674
2+10|RJ02|Representante de Envios|Refeição|913
2+10|RT01|Representante de Envios|Salários|3710
2+10|RT01|Representante de Envios|Beneficios|946
2+10|RT01|Representante de Envios|Fretado|1294
2+10|RT01|Representante de Envios|Refeição|684
2+10|SC02|Representante de Envios|Salários|4161
2+10|SC02|Representante de Envios|Beneficios|946
2+10|SC02|Representante de Envios|Fretado|694
2+10|SC02|Representante de Envios|Refeição|614
2+10|SP02|Representante de Envios|Salários|3735
2+10|SP02|Representante de Envios|Beneficios|946
2+10|SP02|Representante de Envios|Fretado|1373
2+10|SP02|Representante de Envios|Refeição|779
2+10|SP04|Representante de Envios|Salários|3909
2+10|SP04|Representante de Envios|Beneficios|946
2+10|SP04|Representante de Envios|Fretado|1432
2+10|SP04|Representante de Envios|Refeição|577
2+10|SP06|Representante de Envios|Salários|4007
2+10|SP06|Representante de Envios|Beneficios|946
2+10|SP06|Representante de Envios|Fretado|951
2+10|SP06|Representante de Envios|Refeição|596
2+10|SP09|Representante de Envios|Salários|4390
2+10|SP09|Representante de Envios|Beneficios|946
2+10|SP09|Representante de Envios|Fretado|1887
2+10|SP09|Representante de Envios|Refeição|1388
2+10|SP10|Representante de Envios|Salários|4125
2+10|SP10|Representante de Envios|Beneficios|946
2+10|SP10|Representante de Envios|Fretado|938
2+10|SP10|Representante de Envios|Refeição|779
2+10|SP11|Representante de Envios|Salários|4085
2+10|SP11|Representante de Envios|Beneficios|946
2+10|SP11|Representante de Envios|Fretado|1244
2+10|SP11|Representante de Envios|Refeição|786
2+10|SP14|Representante de Envios|Salários|4888
2+10|SP14|Representante de Envios|Beneficios|946
2+10|SP14|Representante de Envios|Fretado|1563
2+10|SP14|Representante de Envios|Refeição|765
2+10|SP15|Representante de Envios|Salários|3439
2+10|SP15|Representante de Envios|Beneficios|946
2+10|SP15|Representante de Envios|Fretado|1482
2+10|SP15|Representante de Envios|Refeição|1188
2+10|SP18|Representante de Envios|Salários|4117
2+10|SP18|Representante de Envios|Beneficios|946
2+10|SP18|Representante de Envios|Fretado|1008
2+10|SP18|Representante de Envios|Refeição|747
2+10|SP19|Representante de Envios|Salários|4014
2+10|SP19|Representante de Envios|Beneficios|946
2+10|SP19|Representante de Envios|Fretado|1021
2+10|SP19|Representante de Envios|Refeição|694
2+10|SP21|Representante de Envios|Salários|4064
2+10|SP21|Representante de Envios|Beneficios|946
2+10|SP21|Representante de Envios|Fretado|1144
2+10|SP21|Representante de Envios|Refeição|791
2+10|SP25|Representante de Envios|Salários|4169
2+10|SP25|Representante de Envios|Beneficios|946
2+10|SP25|Representante de Envios|Fretado|1009
2+10|SP25|Representante de Envios|Refeição|921
2+10|SP24|Representante de Envios|Salários|5276
2+10|SP24|Representante de Envios|Beneficios|1602
2+10|SP24|Representante de Envios|Fretado|1076
2+10|SP24|Representante de Envios|Refeição|1179
2+10|SP26|Representante de Envios|Salários|4169
2+10|SP26|Representante de Envios|Beneficios|946
2+10|SP26|Representante de Envios|Fretado|962
2+10|SP26|Representante de Envios|Refeição|1050
2+10|SP27|Representante de Envios|Salários|3914
2+10|SP27|Representante de Envios|Beneficios|946
2+10|SP27|Representante de Envios|Fretado|1693
2+10|SP27|Representante de Envios|Refeição|1136
2+10|SP28|Representante de Envios|Salários|5276
2+10|SP28|Representante de Envios|Beneficios|1602
2+10|SP28|Representante de Envios|Fretado|1076
2+10|SP28|Representante de Envios|Refeição|1179
2+10|ES01|Representante de Envios|Salários|5276
2+10|ES01|Representante de Envios|Beneficios|1602
2+10|ES01|Representante de Envios|Fretado|1076
2+10|ES01|Representante de Envios|Refeição|1179
2+10|SP29|Representante de Envios|Salários|4945
2+10|SP29|Representante de Envios|Beneficios|946
2+10|SP29|Representante de Envios|Fretado|1887
2+10|SP29|Representante de Envios|Refeição|1388
2+10|SP30|Representante de Envios|Salários|3565
2+10|SP30|Representante de Envios|Beneficios|3060
2+10|SP30|Representante de Envios|Fretado|1076
2+10|SP30|Representante de Envios|Refeição|2004
2+10|SP31|Representante de Envios|Salários|3914
2+10|SP31|Representante de Envios|Beneficios|946
2+10|SP31|Representante de Envios|Fretado|920
2+10|SP31|Representante de Envios|Refeição|1020
2+10|DF02|Representante de Envios|Salários|3565
2+10|DF02|Representante de Envios|Beneficios|3060
2+10|DF02|Representante de Envios|Fretado|1076
2+10|DF02|Representante de Envios|Refeição|1179
2+10|SP33|Representante de Envios|Salários|3914
2+10|SP33|Representante de Envios|Beneficios|946
2+10|SP33|Representante de Envios|Fretado|920
2+10|SP33|Representante de Envios|Refeição|1020
2+10|BA01|Team Leader|Salários|10379
2+10|BA01|Team Leader|Beneficios|5267
2+10|BA01|Team Leader|Fretado|804
2+10|BA01|Team Leader|Refeição|676
2+10|BA02|Team Leader|Salários|8548
2+10|BA02|Team Leader|Beneficios|5267
2+10|BA02|Team Leader|Fretado|1188
2+10|BA02|Team Leader|Refeição|1126
2+10|MG01|Team Leader|Salários|13061
2+10|MG01|Team Leader|Beneficios|4063
2+10|MG01|Team Leader|Fretado|1400
2+10|MG01|Team Leader|Refeição|559
2+10|MG02|Team Leader|Salários|13061
2+10|MG02|Team Leader|Beneficios|4063
2+10|MG02|Team Leader|Fretado|764
2+10|MG02|Team Leader|Refeição|582
2+10|MG03|Team Leader|Salários|13061
2+10|MG03|Team Leader|Beneficios|4063
2+10|MG03|Team Leader|Fretado|1400
2+10|MG03|Team Leader|Refeição|559
2+10|MG04|Team Leader|Salários|13061
2+10|MG04|Team Leader|Beneficios|4063
2+10|MG04|Team Leader|Fretado|1400
2+10|MG04|Team Leader|Refeição|559
2+10|PE01|Team Leader|Salários|11576
2+10|PE01|Team Leader|Beneficios|4827
2+10|PE01|Team Leader|Fretado|841
2+10|PE01|Team Leader|Refeição|837
2+10|PR01|Team Leader|Salários|11568
2+10|PR01|Team Leader|Beneficios|4063
2+10|PR01|Team Leader|Fretado|955
2+10|PR01|Team Leader|Refeição|841
2+10|RC01|Team Leader|Salários|12312
2+10|RC01|Team Leader|Beneficios|4063
2+10|RC01|Team Leader|Fretado|1001
2+10|RC01|Team Leader|Refeição|626
2+10|RC02|Team Leader|Salários|12294
2+10|RC02|Team Leader|Beneficios|4063
2+10|RC02|Team Leader|Fretado|747
2+10|RC02|Team Leader|Refeição|924
2+10|RC03|Team Leader|Salários|13061
2+10|RC03|Team Leader|Beneficios|4063
2+10|RC03|Team Leader|Fretado|973
2+10|RC03|Team Leader|Refeição|0
2+10|RJ02|Team Leader|Salários|12069
2+10|RJ02|Team Leader|Beneficios|2197
2+10|RJ02|Team Leader|Fretado|674
2+10|RJ02|Team Leader|Refeição|913
2+10|RS01|Team Leader|Salários|11506
2+10|RS01|Team Leader|Beneficios|2851
2+10|RS01|Team Leader|Fretado|2044
2+10|RS01|Team Leader|Refeição|892
2+10|RT01|Team Leader|Salários|14086
2+10|RT01|Team Leader|Beneficios|4063
2+10|RT01|Team Leader|Fretado|1294
2+10|RT01|Team Leader|Refeição|684
2+10|SC02|Team Leader|Salários|13610
2+10|SC02|Team Leader|Beneficios|4063
2+10|SC02|Team Leader|Fretado|694
2+10|SC02|Team Leader|Refeição|614
2+10|SP02|Team Leader|Salários|13610
2+10|SP02|Team Leader|Beneficios|4063
2+10|SP02|Team Leader|Fretado|1373
2+10|SP02|Team Leader|Refeição|779
2+10|RS02|Team Leader|Salários|12069
2+10|RS02|Team Leader|Beneficios|4063
2+10|RS02|Team Leader|Fretado|674
2+10|RS02|Team Leader|Refeição|913
2+10|SP04|Team Leader|Salários|13541
2+10|SP04|Team Leader|Beneficios|4063
2+10|SP04|Team Leader|Fretado|1432
2+10|SP04|Team Leader|Refeição|577
2+10|SP06|Team Leader|Salários|13061
2+10|SP06|Team Leader|Beneficios|4063
2+10|SP06|Team Leader|Fretado|951
2+10|SP06|Team Leader|Refeição|596
2+10|RS03|Team Leader|Salários|13610
2+10|RS03|Team Leader|Beneficios|4063
2+10|RS03|Team Leader|Fretado|694
2+10|RS03|Team Leader|Refeição|614
2+10|SP09|Team Leader|Salários|11249
2+10|SP09|Team Leader|Beneficios|4063
2+10|SP09|Team Leader|Fretado|1887
2+10|SP09|Team Leader|Refeição|1388
2+10|SP10|Team Leader|Salários|13061
2+10|SP10|Team Leader|Beneficios|4063
2+10|SP10|Team Leader|Fretado|938
2+10|SP10|Team Leader|Refeição|779
2+10|SP11|Team Leader|Salários|13061
2+10|SP11|Team Leader|Beneficios|4063
2+10|SP11|Team Leader|Fretado|1244
2+10|SP11|Team Leader|Refeição|786
2+10|SP14|Team Leader|Salários|18776
2+10|SP14|Team Leader|Beneficios|4063
2+10|SP14|Team Leader|Fretado|1563
2+10|SP14|Team Leader|Refeição|765
2+10|SP15|Team Leader|Salários|12386
2+10|SP15|Team Leader|Beneficios|4063
2+10|SP15|Team Leader|Fretado|1482
2+10|SP15|Team Leader|Refeição|1188
2+10|SP18|Team Leader|Salários|14602
2+10|SP18|Team Leader|Beneficios|4063
2+10|SP18|Team Leader|Fretado|1008
2+10|SP18|Team Leader|Refeição|747
2+10|SP19|Team Leader|Salários|14602
2+10|SP19|Team Leader|Beneficios|4063
2+10|SP19|Team Leader|Fretado|1021
2+10|SP19|Team Leader|Refeição|694
2+10|SP21|Team Leader|Salários|14500
2+10|SP21|Team Leader|Beneficios|4063
2+10|SP21|Team Leader|Fretado|1144
2+10|SP21|Team Leader|Refeição|791
2+10|SP25|Team Leader|Salários|14317
2+10|SP25|Team Leader|Beneficios|4063
2+10|SP25|Team Leader|Fretado|1009
2+10|SP25|Team Leader|Refeição|921
2+10|SP24|Team Leader|Salários|11176
2+10|SP24|Team Leader|Beneficios|3155
2+10|SP24|Team Leader|Fretado|1076
2+10|SP24|Team Leader|Refeição|1179
2+10|SP26|Team Leader|Salários|14317
2+10|SP26|Team Leader|Beneficios|4063
2+10|SP26|Team Leader|Fretado|962
2+10|SP26|Team Leader|Refeição|1050
2+10|SP27|Team Leader|Salários|14317
2+10|SP27|Team Leader|Beneficios|4063
2+10|SP27|Team Leader|Fretado|1693
2+10|SP27|Team Leader|Refeição|1136
2+10|SP28|Team Leader|Salários|11176
2+10|SP28|Team Leader|Beneficios|3155
2+10|SP28|Team Leader|Fretado|1076
2+10|SP28|Team Leader|Refeição|1179
2+10|ES01|Team Leader|Salários|11176
2+10|ES01|Team Leader|Beneficios|3155
2+10|ES01|Team Leader|Fretado|1076
2+10|ES01|Team Leader|Refeição|1179
2+10|SP29|Team Leader|Salários|11131
2+10|SP29|Team Leader|Beneficios|4063
2+10|SP29|Team Leader|Fretado|1887
2+10|SP29|Team Leader|Refeição|1388
2+10|SP30|Team Leader|Salários|11506
2+10|SP30|Team Leader|Beneficios|2851
2+10|SP30|Team Leader|Fretado|1076
2+10|SP30|Team Leader|Refeição|2004
2+10|SP31|Team Leader|Salários|14317
2+10|SP31|Team Leader|Beneficios|4063
2+10|SP31|Team Leader|Fretado|920
2+10|SP31|Team Leader|Refeição|1020
2+10|DF02|Team Leader|Salários|11506
2+10|DF02|Team Leader|Beneficios|2851
2+10|DF02|Team Leader|Fretado|1076
2+10|DF02|Team Leader|Refeição|1179
2+10|DF03|Team Leader|Salários|11538
2+10|DF03|Team Leader|Beneficios|3155
2+10|DF03|Team Leader|Fretado|1259
2+10|DF03|Team Leader|Refeição|455
2+10|SP33|Team Leader|Salários|14317
2+10|SP33|Team Leader|Beneficios|4063
2+10|SP33|Team Leader|Fretado|920
2+10|SP33|Team Leader|Refeição|1020`;

function parseData() {
  return RAW.trim().split("\n").map(line => {
    const [versao, rawFc, cargo, cat, valor] = line.split("|");
    const fc = rawFc.replace(/^BR/, "");
    const meta = FC_MAP[fc] || { estado: "Outros", tipologia: "Outros" };
    const categoria = cat === "Salários" ? "Salários" : cat === "Beneficios" ? "Benefícios" : cat === "Fretado" ? "Transporte" : "Alimentação";
    return { versao, fc, cargo: cargo === "Representante de Envios" ? "Rep. de Envios" : cargo, categoria, valor: parseInt(valor), estado: meta.estado, tipologia: meta.tipologia };
  });
}

const ALL_DATA = parseData();

const fmtBRL = v => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(v);
const fmtUSD = v => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(v / 5.5);

const COLORS = { "Salários": "#FFE600", "Benefícios": "#9ca3af", "Transporte": "#1a1a1a", "Alimentação": "#3b82f6" };
const PIE_COLORS = ["#FFE600","#9ca3af","#1a1a1a","#3b82f6"];

function unique(arr) { return [...new Set(arr)].sort(); }

export default function App() {
  const [versao, setVersao] = useState("Todos");
  const [cargo, setCargo] = useState("Todos");
  const [estado, setEstado] = useState("Todos");
  const [fcs, setFcs] = useState([]);
  const [tipologias, setTipologias] = useState([]);
  const [currency, setCurrency] = useState("BRL");
  const [topN, setTopN] = useState(15);

  const fmt = v => currency === "BRL" ? fmtBRL(v) : fmtUSD(v);

  const filtered = useMemo(() => ALL_DATA.filter(d =>
    (versao === "Todos" || d.versao === versao) &&
    (cargo === "Todos" || d.cargo === cargo) &&
    (estado === "Todos" || d.estado === estado) &&
    (fcs.length === 0 || fcs.includes(d.fc)) &&
    (tipologias.length === 0 || tipologias.includes(d.tipologia))
  ), [versao, cargo, estado, fcs, tipologias]);

  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach(d => {
      const k = `${d.fc}||${d.versao}||${d.cargo}`;
      if (!map[k]) map[k] = { fc: d.fc, versao: d.versao, cargo: d.cargo, estado: d.estado, tipologia: d.tipologia, Salários: 0, Benefícios: 0, Transporte: 0, Alimentação: 0 };
      map[k][d.categoria] += d.valor;
    });
    return Object.values(map).map(r => ({ ...r, total: r.Salários + r.Benefícios + r.Transporte + r.Alimentação }))
      .filter(r => r.total >= 1000)
      .sort((a, b) => b.total - a.total);
  }, [filtered]);

  const chartData = grouped.slice(0, topN);
  const avgTotal = grouped.length ? grouped.reduce((s, r) => s + r.total, 0) / grouped.length : 0;
  const maxRow = grouped[0];
  const minRow = grouped[grouped.length - 1];

  const pieData = useMemo(() => {
    if (!grouped.length) return [];
    const sum = { Salários: 0, Benefícios: 0, Transporte: 0, Alimentação: 0 };
    grouped.forEach(r => { sum.Salários += r.Salários; sum.Benefícios += r.Benefícios; sum.Transporte += r.Transporte; sum.Alimentação += r.Alimentação; });
    const n = grouped.length;
    return Object.entries(sum).map(([name, v]) => ({ name, value: v / n }));
  }, [grouped]);

  const versoes = useMemo(() => ["Todos", ...unique(ALL_DATA.map(d => d.versao))], []);
  const cargos = useMemo(() => ["Todos", ...unique(filtered.map(d => d.cargo))], [filtered]);
  const estados = useMemo(() => ["Todos", ...unique(filtered.map(d => d.estado))], [filtered]);
  const allFcs = useMemo(() => unique(filtered.map(d => d.fc)), [filtered]);
  const allTipologias = useMemo(() => unique(filtered.map(d => d.tipologia)), [filtered]);

  const isFiltered = versao !== "Todos" || cargo !== "Todos" || estado !== "Todos" || fcs.length > 0 || tipologias.length > 0;

  const clearAll = () => { setVersao("Todos"); setCargo("Todos"); setEstado("Todos"); setFcs([]); setTipologias([]); };

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#f4f4f4", minHeight: "100vh", color: "#111" }}>
      {/* HEADER */}
      <header style={{ background: "#FFE600", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ background: "#111", borderRadius: 8, padding: "6px 14px", fontWeight: 900, fontSize: 15, color: "#FFE600", letterSpacing: 1 }}>ML</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 18, letterSpacing: "-0.5px" }}>Dashboard Promédio BC</div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, opacity: 0.6, textTransform: "uppercase" }}>Mercado Envíos · CAPEX Management 2026</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ background: "rgba(0,0,0,0.08)", borderRadius: 999, padding: 3, display: "flex" }}>
            {["BRL","USD"].map(c => (
              <button key={c} onClick={() => setCurrency(c)} style={{ padding: "5px 16px", borderRadius: 999, border: "none", cursor: "pointer", fontWeight: 800, fontSize: 12, background: currency === c ? "#111" : "transparent", color: currency === c ? "#FFE600" : "#333", transition: "all 0.2s" }}>{c}</button>
            ))}
          </div>
          {isFiltered && <button onClick={clearAll} style={{ background: "rgba(0,0,0,0.12)", border: "none", borderRadius: 999, padding: "7px 16px", fontWeight: 700, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>✕ Limpar filtros</button>}
        </div>
      </header>

      <main style={{ maxWidth: 1440, margin: "0 auto", padding: "24px 20px" }}>
        {/* FILTERS */}
        <section style={{ background: "#fff", borderRadius: 16, padding: 20, marginBottom: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
          <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: 1, textTransform: "uppercase", color: "#888", marginBottom: 14 }}>Filtros</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
            <FilterSelect label="Versão" value={versao} options={versoes} onChange={setVersao} />
            <FilterSelect label="Cargo" value={cargo} options={cargos} onChange={setCargo} />
            <FilterSelect label="Estado" value={estado} options={estados} onChange={setEstado} />
            <MultiChip label="FC" all={allFcs} selected={fcs} onChange={setFcs} />
            <MultiChip label="Tipologia" all={allTipologias} selected={tipologias} onChange={setTipologias} />
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Top N (gráfico)</div>
              <select value={topN} onChange={e => setTopN(+e.target.value)} style={selectStyle}>
                {[10,15,20,30,50].map(n => <option key={n} value={n}>Top {n}</option>)}
              </select>
            </div>
          </div>
        </section>

        {!isFiltered ? (
          <div style={{ background: "#fff", borderRadius: 16, padding: 60, textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
            <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 8 }}>Selecione ao menos um filtro</div>
            <div style={{ color: "#888", fontSize: 14 }}>Use os filtros acima para carregar as métricas e gráficos.</div>
          </div>
        ) : (
          <>
            {/* KPI CARDS */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16, marginBottom: 20 }}>
              <KpiCard label="Média Geral" value={fmt(avgTotal)} sub={`${grouped.length} unidades`} accent="#FFE600" icon="📊" />
              <KpiCard label="Maior Promédio" value={maxRow ? fmt(maxRow.total) : "—"} sub={maxRow ? `${maxRow.fc} · ${maxRow.estado}` : ""} accent="#111" textColor="#fff" icon="⬆️" />
              <KpiCard label="Menor Promédio" value={minRow ? fmt(minRow.total) : "—"} sub={minRow ? `${minRow.fc} · ${minRow.estado}` : ""} accent="#e5e7eb" icon="⬇️" />
              <KpiCard label="Total Unidades" value={grouped.length} sub="no filtro selecionado" accent="#3b82f6" textColor="#fff" icon="🏭" />
            </div>

            {/* CHARTS */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16, marginBottom: 20 }}>
              {/* Bar Chart */}
              <div style={{ background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Comparativo por FC — Top {Math.min(topN, grouped.length)}</div>
                <div style={{ fontSize: 12, color: "#888", marginBottom: 16 }}>Custo total empilhado (Salários + Benefícios + Transporte + Alimentação)</div>
                <div style={{ height: Math.max(300, chartData.length * 34) }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 60 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                      <XAxis type="number" tickFormatter={v => currency === "BRL" ? `R$${(v/1000).toFixed(0)}k` : `$${(v/5500).toFixed(0)}k`} tick={{ fontSize: 11 }} />
                      <YAxis dataKey="fc" type="category" width={52} tick={{ fontSize: 11, fontWeight: 700 }} axisLine={false} tickLine={false} />
                      <Tooltip formatter={(v, name) => [fmt(v), name]} contentStyle={{ borderRadius: 10, fontSize: 12 }} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                      {["Salários","Benefícios","Transporte","Alimentação"].map((cat, i) => (
                        <Bar key={cat} dataKey={cat} stackId="a" fill={PIE_COLORS[i]} radius={i === 3 ? [0, 4, 4, 0] : [0,0,0,0]} barSize={22} />
                      ))}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Pie + breakdown */}
              <div style={{ background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column" }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Composição Média</div>
                <div style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>Participação por categoria</div>
                <div style={{ height: 200 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" paddingAngle={4}
                        label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`} labelLine={false}>
                        {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                      </Pie>
                      <Tooltip formatter={(v) => [fmt(v), "Média"]} contentStyle={{ borderRadius: 10, fontSize: 12 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
                  {pieData.map((item, i) => (
                    <div key={item.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#f9f9f9", borderRadius: 10, padding: "8px 12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 10, height: 10, borderRadius: "50%", background: PIE_COLORS[i] }} />
                        <span style={{ fontSize: 12, fontWeight: 700 }}>{item.name}</span>
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 800 }}>{fmt(item.value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* TABLE */}
            <section style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f0f0", fontWeight: 700, fontSize: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>Detalhamento por Unidade</span>
                <span style={{ fontSize: 11, color: "#888", background: "#f4f4f4", padding: "3px 10px", borderRadius: 999 }}>Taxa de câmbio: 5,50 · {grouped.length} registros</span>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                  <thead>
                    <tr style={{ background: "#f9f9f9" }}>
                      {["FC","Versão","Cargo","Estado","Tipologia","Salários","Benefícios","Transporte","Alimentação","Total"].map(h => (
                        <th key={h} style={{ padding: "10px 14px", textAlign: h.length > 6 && h !== "Tipologia" ? "right" : "left", fontWeight: 700, fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color: "#888", whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {grouped.map((r, i) => (
                      <tr key={i} style={{ borderTop: "1px solid #f4f4f4", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                        <td style={{ padding: "8px 14px", fontWeight: 800 }}>{r.fc}</td>
                        <td style={{ padding: "8px 14px", color: "#555" }}>{r.versao}</td>
                        <td style={{ padding: "8px 14px", fontStyle: "italic", color: "#444" }}>{r.cargo}</td>
                        <td style={{ padding: "8px 14px" }}>{r.estado}</td>
                        <td style={{ padding: "8px 14px", color: "#666", fontSize: 11 }}>{r.tipologia}</td>
                        <td style={{ padding: "8px 14px", textAlign: "right" }}>{fmt(r.Salários)}</td>
                        <td style={{ padding: "8px 14px", textAlign: "right" }}>{fmt(r.Benefícios)}</td>
                        <td style={{ padding: "8px 14px", textAlign: "right" }}>{fmt(r.Transporte)}</td>
                        <td style={{ padding: "8px 14px", textAlign: "right" }}>{fmt(r.Alimentação)}</td>
                        <td style={{ padding: "8px 14px", textAlign: "right", fontWeight: 900, background: "#fffbe6", borderLeft: "2px solid #FFE600" }}>{fmt(r.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </main>

      <footer style={{ textAlign: "center", padding: "20px", fontSize: 11, color: "#aaa", marginTop: 20 }}>
        © 2026 Mercado Envíos · Planeación y Control de Gestión de Capex · Última actualización 03/2026
      </footer>
    </div>
  );
}

const selectStyle = { width: "100%", padding: "8px 12px", borderRadius: 10, border: "1px solid #e5e7eb", background: "#f9f9f9", fontSize: 13, fontWeight: 600, cursor: "pointer", outline: "none" };

function FilterSelect({ label, value, options, onChange }) {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{label}</div>
      <select value={value} onChange={e => onChange(e.target.value)} style={selectStyle}>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function MultiChip({ label, all, selected, onChange }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{label}</div>
      <button onClick={() => setOpen(!open)} style={{ ...selectStyle, display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #e5e7eb" }}>
        <span>{selected.length === 0 ? "Todos" : selected.length === 1 ? selected[0] : `${selected.length} sel.`}</span>
        <span style={{ fontSize: 10 }}>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div style={{ position: "absolute", top: "100%", left: 0, zIndex: 200, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", minWidth: 180, maxHeight: 260, overflowY: "auto", marginTop: 4 }}>
          <div onClick={() => { onChange([]); setOpen(false); }} style={{ padding: "8px 14px", fontSize: 12, fontWeight: 700, borderBottom: "1px solid #f0f0f0", cursor: "pointer", color: "#555" }}>Limpar seleção</div>
          {all.map(opt => (
            <div key={opt} onClick={() => onChange(selected.includes(opt) ? selected.filter(s => s !== opt) : [...selected, opt])}
              style={{ padding: "7px 14px", fontSize: 12, cursor: "pointer", display: "flex", gap: 8, alignItems: "center", background: selected.includes(opt) ? "#fffbe6" : "transparent" }}>
              <div style={{ width: 14, height: 14, borderRadius: 3, border: "1.5px solid #ccc", background: selected.includes(opt) ? "#111" : "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {selected.includes(opt) && <span style={{ color: "#FFE600", fontSize: 10, fontWeight: 900 }}>✓</span>}
              </div>
              <span style={{ fontWeight: selected.includes(opt) ? 700 : 400 }}>{opt}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function KpiCard({ label, value, sub, accent, textColor = "#111", icon }) {
  return (
    <div style={{ background: "#fff", borderRadius: 16, padding: "18px 20px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", display: "flex", gap: 14, alignItems: "flex-start" }}>
      <div style={{ background: accent, borderRadius: 10, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{icon}</div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{label}</div>
        <div style={{ fontSize: 20, fontWeight: 900, color: "#111", lineHeight: 1.1 }}>{value}</div>
        <div style={{ fontSize: 11, color: "#aaa", marginTop: 4 }}>{sub}</div>
      </div>
    </div>
  );
}
