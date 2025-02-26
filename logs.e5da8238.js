let e,t,n,o,s,i,a,r,l,d,c,u,h,g,f,m,p,E,y;function C(e){return e&&e.__esModule?e.default:e}var v,O,I,T,_,w,N,A,S,R,b,L,M,x,D,B,H,F,k,P,U,$,G,j,K=globalThis,Y={},q={},J=K.parcelRequire94c2;null==J&&((J=function(e){if(e in Y)return Y[e].exports;if(e in q){var t=q[e];delete q[e];var n={id:e,exports:{}};return Y[e]=n,t.call(n.exports,n,n.exports),n.exports}var o=Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){q[e]=t},K.parcelRequire94c2=J),J.register;var W=J("lR3v8"),V=J("47Mwn"),X=J("9HrqM");(v=M||(M={})).STRING="string",v.NUMBER="number",v.INTEGER="integer",v.BOOLEAN="boolean",v.ARRAY="array",v.OBJECT="object",(O=x||(x={})).LANGUAGE_UNSPECIFIED="language_unspecified",O.PYTHON="python",(I=D||(D={})).OUTCOME_UNSPECIFIED="outcome_unspecified",I.OUTCOME_OK="outcome_ok",I.OUTCOME_FAILED="outcome_failed",I.OUTCOME_DEADLINE_EXCEEDED="outcome_deadline_exceeded";/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Q=["user","model","function","system"];(T=B||(B={})).HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",T.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",T.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",T.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",T.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT",(_=H||(H={})).HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",_.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",_.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",_.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",_.BLOCK_NONE="BLOCK_NONE",(w=F||(F={})).HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",w.NEGLIGIBLE="NEGLIGIBLE",w.LOW="LOW",w.MEDIUM="MEDIUM",w.HIGH="HIGH",(N=k||(k={})).BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",N.SAFETY="SAFETY",N.OTHER="OTHER",(A=P||(P={})).FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",A.STOP="STOP",A.MAX_TOKENS="MAX_TOKENS",A.SAFETY="SAFETY",A.RECITATION="RECITATION",A.LANGUAGE="LANGUAGE",A.BLOCKLIST="BLOCKLIST",A.PROHIBITED_CONTENT="PROHIBITED_CONTENT",A.SPII="SPII",A.MALFORMED_FUNCTION_CALL="MALFORMED_FUNCTION_CALL",A.OTHER="OTHER",(S=U||(U={})).TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",S.RETRIEVAL_QUERY="RETRIEVAL_QUERY",S.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",S.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",S.CLASSIFICATION="CLASSIFICATION",S.CLUSTERING="CLUSTERING",(R=$||($={})).MODE_UNSPECIFIED="MODE_UNSPECIFIED",R.AUTO="AUTO",R.ANY="ANY",R.NONE="NONE",(b=G||(G={})).MODE_UNSPECIFIED="MODE_UNSPECIFIED",b.MODE_DYNAMIC="MODE_DYNAMIC";/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z extends Error{constructor(e){super(`[GoogleGenerativeAI Error]: ${e}`)}}class Z extends z{constructor(e,t){super(e),this.response=t}}class ee extends z{constructor(e,t,n,o){super(e),this.status=t,this.statusText=n,this.errorDetails=o}}class et extends z{}(L=j||(j={})).GENERATE_CONTENT="generateContent",L.STREAM_GENERATE_CONTENT="streamGenerateContent",L.COUNT_TOKENS="countTokens",L.EMBED_CONTENT="embedContent",L.BATCH_EMBED_CONTENTS="batchEmbedContents";class en{constructor(e,t,n,o,s){this.model=e,this.task=t,this.apiKey=n,this.stream=o,this.requestOptions=s}toString(){var e,t;let n=(null===(e=this.requestOptions)||void 0===e?void 0:e.apiVersion)||"v1beta",o=(null===(t=this.requestOptions)||void 0===t?void 0:t.baseUrl)||"https://generativelanguage.googleapis.com",s=`${o}/${n}/${this.model}:${this.task}`;return this.stream&&(s+="?alt=sse"),s}}async function eo(e){var t;let n=new Headers;n.append("Content-Type","application/json"),n.append("x-goog-api-client",function(e){let t=[];return(null==e?void 0:e.apiClient)&&t.push(e.apiClient),t.push("genai-js/0.22.0"),t.join(" ")}(e.requestOptions)),n.append("x-goog-api-key",e.apiKey);let o=null===(t=e.requestOptions)||void 0===t?void 0:t.customHeaders;if(o){if(!(o instanceof Headers))try{o=new Headers(o)}catch(e){throw new et(`unable to convert customHeaders value ${JSON.stringify(o)} to Headers: ${e.message}`)}for(let[e,t]of o.entries()){if("x-goog-api-key"===e)throw new et(`Cannot set reserved header name ${e}`);if("x-goog-api-client"===e)throw new et(`Header name ${e} can only be set using the apiClient field`);n.append(e,t)}}return n}async function es(e,t,n,o,s,i){let a=new en(e,t,n,o,i);return{url:a.toString(),fetchOptions:Object.assign(Object.assign({},function(e){let t={};if((null==e?void 0:e.signal)!==void 0||(null==e?void 0:e.timeout)>=0){let n=new AbortController;(null==e?void 0:e.timeout)>=0&&setTimeout(()=>n.abort(),e.timeout),(null==e?void 0:e.signal)&&e.signal.addEventListener("abort",()=>{n.abort()}),t.signal=n.signal}return t}(i)),{method:"POST",headers:await eo(a),body:s})}}async function ei(e,t,n,o,s,i={},a=fetch){let{url:r,fetchOptions:l}=await es(e,t,n,o,s,i);return ea(r,l,a)}async function ea(e,t,n=fetch){let o;try{o=await n(e,t)}catch(t){!function(e,t){let n=e;throw e instanceof ee||e instanceof et||((n=new z(`Error fetching from ${t.toString()}: ${e.message}`)).stack=e.stack),n}(t,e)}return o.ok||await er(o,e),o}async function er(e,t){let n,o="";try{let t=await e.json();o=t.error.message,t.error.details&&(o+=` ${JSON.stringify(t.error.details)}`,n=t.error.details)}catch(e){}throw new ee(`Error fetching from ${t.toString()}: [${e.status} ${e.statusText}] ${o}`,e.status,e.statusText,n)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function el(e){return e.text=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),eu(e.candidates[0]))throw new Z(`${eh(e)}`,e);return function(e){var t,n,o,s;let i=[];if(null===(n=null===(t=e.candidates)||void 0===t?void 0:t[0].content)||void 0===n?void 0:n.parts)for(let t of null===(s=null===(o=e.candidates)||void 0===o?void 0:o[0].content)||void 0===s?void 0:s.parts)t.text&&i.push(t.text),t.executableCode&&i.push("\n```"+t.executableCode.language+"\n"+t.executableCode.code+"\n```\n"),t.codeExecutionResult&&i.push("\n```\n"+t.codeExecutionResult.output+"\n```\n");return i.length>0?i.join(""):""}(e)}if(e.promptFeedback)throw new Z(`Text not available. ${eh(e)}`,e);return""},e.functionCall=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),eu(e.candidates[0]))throw new Z(`${eh(e)}`,e);return console.warn("response.functionCall() is deprecated. Use response.functionCalls() instead."),ed(e)[0]}if(e.promptFeedback)throw new Z(`Function call not available. ${eh(e)}`,e)},e.functionCalls=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),eu(e.candidates[0]))throw new Z(`${eh(e)}`,e);return ed(e)}if(e.promptFeedback)throw new Z(`Function call not available. ${eh(e)}`,e)},e}function ed(e){var t,n,o,s;let i=[];if(null===(n=null===(t=e.candidates)||void 0===t?void 0:t[0].content)||void 0===n?void 0:n.parts)for(let t of null===(s=null===(o=e.candidates)||void 0===o?void 0:o[0].content)||void 0===s?void 0:s.parts)t.functionCall&&i.push(t.functionCall);return i.length>0?i:void 0}const ec=[P.RECITATION,P.SAFETY,P.LANGUAGE];function eu(e){return!!e.finishReason&&ec.includes(e.finishReason)}function eh(e){var t,n,o;let s="";if((!e.candidates||0===e.candidates.length)&&e.promptFeedback)s+="Response was blocked",(null===(t=e.promptFeedback)||void 0===t?void 0:t.blockReason)&&(s+=` due to ${e.promptFeedback.blockReason}`),(null===(n=e.promptFeedback)||void 0===n?void 0:n.blockReasonMessage)&&(s+=`: ${e.promptFeedback.blockReasonMessage}`);else if(null===(o=e.candidates)||void 0===o?void 0:o[0]){let t=e.candidates[0];eu(t)&&(s+=`Candidate was blocked due to ${t.finishReason}`,t.finishMessage&&(s+=`: ${t.finishMessage}`))}return s}function eg(e){return this instanceof eg?(this.v=e,this):new eg(e)}"function"==typeof SuppressedError&&SuppressedError;/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ef=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;async function em(e){let t=[],n=e.getReader();for(;;){let{done:e,value:o}=await n.read();if(e)return el(function(e){let t=e[e.length-1],n={promptFeedback:null==t?void 0:t.promptFeedback};for(let t of e){if(t.candidates){let e=0;for(let o of t.candidates)if(n.candidates||(n.candidates=[]),n.candidates[e]||(n.candidates[e]={index:e}),n.candidates[e].citationMetadata=o.citationMetadata,n.candidates[e].groundingMetadata=o.groundingMetadata,n.candidates[e].finishReason=o.finishReason,n.candidates[e].finishMessage=o.finishMessage,n.candidates[e].safetyRatings=o.safetyRatings,o.content&&o.content.parts){n.candidates[e].content||(n.candidates[e].content={role:o.content.role||"user",parts:[]});let t={};for(let s of o.content.parts)s.text&&(t.text=s.text),s.functionCall&&(t.functionCall=s.functionCall),s.executableCode&&(t.executableCode=s.executableCode),s.codeExecutionResult&&(t.codeExecutionResult=s.codeExecutionResult),0===Object.keys(t).length&&(t.text=""),n.candidates[e].content.parts.push(t)}e++}t.usageMetadata&&(n.usageMetadata=t.usageMetadata)}return n}(t));t.push(o)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ep(e,t,n,o){return function(e){let[t,n]=(function(e){let t=e.getReader();return new ReadableStream({start(e){let n="";return function o(){return t.read().then(({value:t,done:s})=>{let i;if(s){if(n.trim()){e.error(new z("Failed to parse stream"));return}e.close();return}let a=(n+=t).match(ef);for(;a;){try{i=JSON.parse(a[1])}catch(t){e.error(new z(`Error parsing JSON response: "${a[1]}"`));return}e.enqueue(i),a=(n=n.substring(a[0].length)).match(ef)}return o()})}()}})})(e.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0}))).tee();return{stream:function(e){return function(e,t,n){if(!Symbol.asyncIterator)throw TypeError("Symbol.asyncIterator is not defined.");var o,s=n.apply(e,t||[]),i=[];return o={},a("next"),a("throw"),a("return"),o[Symbol.asyncIterator]=function(){return this},o;function a(e){s[e]&&(o[e]=function(t){return new Promise(function(n,o){i.push([e,t,n,o])>1||r(e,t)})})}function r(e,t){try{var n;(n=s[e](t)).value instanceof eg?Promise.resolve(n.value.v).then(l,d):c(i[0][2],n)}catch(e){c(i[0][3],e)}}function l(e){r("next",e)}function d(e){r("throw",e)}function c(e,t){e(t),i.shift(),i.length&&r(i[0][0],i[0][1])}}(this,arguments,function*(){let t=e.getReader();for(;;){let{value:e,done:n}=yield eg(t.read());if(n)break;yield yield eg(el(e))}})}(t),response:em(n)}}(await ei(t,j.STREAM_GENERATE_CONTENT,e,!0,JSON.stringify(n),o))}async function eE(e,t,n,o){let s=await ei(t,j.GENERATE_CONTENT,e,!1,JSON.stringify(n),o);return{response:el(await s.json())}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ey(e){if(null!=e){if("string"==typeof e)return{role:"system",parts:[{text:e}]};if(e.text)return{role:"system",parts:[e]};if(e.parts)return e.role?e:{role:"system",parts:e.parts}}}function eC(e){let t=[];if("string"==typeof e)t=[{text:e}];else for(let n of e)"string"==typeof n?t.push({text:n}):t.push(n);return function(e){let t={role:"user",parts:[]},n={role:"function",parts:[]},o=!1,s=!1;for(let i of e)"functionResponse"in i?(n.parts.push(i),s=!0):(t.parts.push(i),o=!0);if(o&&s)throw new z("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");if(!o&&!s)throw new z("No content is provided for sending chat message.");return o?t:n}(t)}function ev(e){let t;return t=e.contents?e:{contents:[eC(e)]},e.systemInstruction&&(t.systemInstruction=ey(e.systemInstruction)),t}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eO=["text","inlineData","functionCall","functionResponse","executableCode","codeExecutionResult"],eI={user:["text","inlineData"],function:["functionResponse"],model:["text","functionCall","executableCode","codeExecutionResult"],system:["text"]},eT="SILENT_ERROR";class e_{constructor(e,t,n,o={}){this.model=t,this.params=n,this._requestOptions=o,this._history=[],this._sendPromise=Promise.resolve(),this._apiKey=e,(null==n?void 0:n.history)&&(function(e){let t=!1;for(let n of e){let{role:e,parts:o}=n;if(!t&&"user"!==e)throw new z(`First content should be with role 'user', got ${e}`);if(!Q.includes(e))throw new z(`Each item should include role field. Got ${e} but valid roles are: ${JSON.stringify(Q)}`);if(!Array.isArray(o))throw new z("Content should have 'parts' property with an array of Parts");if(0===o.length)throw new z("Each Content should have at least one part");let s={text:0,inlineData:0,functionCall:0,functionResponse:0,fileData:0,executableCode:0,codeExecutionResult:0};for(let e of o)for(let t of eO)t in e&&(s[t]+=1);let i=eI[e];for(let t of eO)if(!i.includes(t)&&s[t]>0)throw new z(`Content with role '${e}' can't contain '${t}' part`);t=!0}}(n.history),this._history=n.history)}async getHistory(){return await this._sendPromise,this._history}async sendMessage(e,t={}){var n,o,s,i,a,r;let l;await this._sendPromise;let d=eC(e),c={safetySettings:null===(n=this.params)||void 0===n?void 0:n.safetySettings,generationConfig:null===(o=this.params)||void 0===o?void 0:o.generationConfig,tools:null===(s=this.params)||void 0===s?void 0:s.tools,toolConfig:null===(i=this.params)||void 0===i?void 0:i.toolConfig,systemInstruction:null===(a=this.params)||void 0===a?void 0:a.systemInstruction,cachedContent:null===(r=this.params)||void 0===r?void 0:r.cachedContent,contents:[...this._history,d]},u=Object.assign(Object.assign({},this._requestOptions),t);return this._sendPromise=this._sendPromise.then(()=>eE(this._apiKey,this.model,c,u)).then(e=>{var t,n;if(e.response.candidates&&e.response.candidates.length>0&&(null===(t=e.response.candidates[0])||void 0===t?void 0:t.content)!==void 0){this._history.push(d);let t=Object.assign({parts:[],role:"model"},null===(n=e.response.candidates)||void 0===n?void 0:n[0].content);this._history.push(t)}else{let t=eh(e.response);t&&console.warn(`sendMessage() was unsuccessful. ${t}. Inspect response object for details.`)}l=e}),await this._sendPromise,l}async sendMessageStream(e,t={}){var n,o,s,i,a,r;await this._sendPromise;let l=eC(e),d={safetySettings:null===(n=this.params)||void 0===n?void 0:n.safetySettings,generationConfig:null===(o=this.params)||void 0===o?void 0:o.generationConfig,tools:null===(s=this.params)||void 0===s?void 0:s.tools,toolConfig:null===(i=this.params)||void 0===i?void 0:i.toolConfig,systemInstruction:null===(a=this.params)||void 0===a?void 0:a.systemInstruction,cachedContent:null===(r=this.params)||void 0===r?void 0:r.cachedContent,contents:[...this._history,l]},c=Object.assign(Object.assign({},this._requestOptions),t),u=ep(this._apiKey,this.model,d,c);return this._sendPromise=this._sendPromise.then(()=>u).catch(e=>{throw Error(eT)}).then(e=>e.response).then(e=>{var t;if(e.candidates&&e.candidates.length>0&&(null===(t=e.candidates[0])||void 0===t?void 0:t.content)!==void 0){this._history.push(l);let t=Object.assign({},e.candidates[0].content);t.role||(t.role="model"),this._history.push(t)}else{let t=eh(e);t&&console.warn(`sendMessageStream() was unsuccessful. ${t}. Inspect response object for details.`)}}).catch(e=>{e.message!==eT&&console.error(e)}),u}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ew(e,t,n,o){return(await ei(t,j.COUNT_TOKENS,e,!1,JSON.stringify(n),o)).json()}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eN(e,t,n,o){return(await ei(t,j.EMBED_CONTENT,e,!1,JSON.stringify(n),o)).json()}async function eA(e,t,n,o){let s=n.requests.map(e=>Object.assign(Object.assign({},e),{model:t}));return(await ei(t,j.BATCH_EMBED_CONTENTS,e,!1,JSON.stringify({requests:s}),o)).json()}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eS{constructor(e,t,n={}){this.apiKey=e,this._requestOptions=n,t.model.includes("/")?this.model=t.model:this.model=`models/${t.model}`,this.generationConfig=t.generationConfig||{},this.safetySettings=t.safetySettings||[],this.tools=t.tools,this.toolConfig=t.toolConfig,this.systemInstruction=ey(t.systemInstruction),this.cachedContent=t.cachedContent}async generateContent(e,t={}){var n;let o=ev(e),s=Object.assign(Object.assign({},this._requestOptions),t);return eE(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:null===(n=this.cachedContent)||void 0===n?void 0:n.name},o),s)}async generateContentStream(e,t={}){var n;let o=ev(e),s=Object.assign(Object.assign({},this._requestOptions),t);return ep(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:null===(n=this.cachedContent)||void 0===n?void 0:n.name},o),s)}startChat(e){var t;return new e_(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:null===(t=this.cachedContent)||void 0===t?void 0:t.name},e),this._requestOptions)}async countTokens(e,t={}){let n=function(e,t){var n;let o={model:null==t?void 0:t.model,generationConfig:null==t?void 0:t.generationConfig,safetySettings:null==t?void 0:t.safetySettings,tools:null==t?void 0:t.tools,toolConfig:null==t?void 0:t.toolConfig,systemInstruction:null==t?void 0:t.systemInstruction,cachedContent:null===(n=null==t?void 0:t.cachedContent)||void 0===n?void 0:n.name,contents:[]},s=null!=e.generateContentRequest;if(e.contents){if(s)throw new et("CountTokensRequest must have one of contents or generateContentRequest, not both.");o.contents=e.contents}else if(s)o=Object.assign(Object.assign({},o),e.generateContentRequest);else{let t=eC(e);o.contents=[t]}return{generateContentRequest:o}}(e,{model:this.model,generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:this.cachedContent}),o=Object.assign(Object.assign({},this._requestOptions),t);return ew(this.apiKey,this.model,n,o)}async embedContent(e,t={}){let n="string"==typeof e||Array.isArray(e)?{content:eC(e)}:e,o=Object.assign(Object.assign({},this._requestOptions),t);return eN(this.apiKey,this.model,n,o)}async batchEmbedContents(e,t={}){let n=Object.assign(Object.assign({},this._requestOptions),t);return eA(this.apiKey,this.model,e,n)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eR{constructor(e){this.apiKey=e}getGenerativeModel(e,t){if(!e.model)throw new z("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");return new eS(this.apiKey,e,t)}getGenerativeModelFromCachedContent(e,t,n){if(!e.name)throw new et("Cached content must contain a `name` field.");if(!e.model)throw new et("Cached content must contain a `model` field.");for(let n of["model","systemInstruction"])if((null==t?void 0:t[n])&&e[n]&&(null==t?void 0:t[n])!==e[n]){if("model"===n&&(t.model.startsWith("models/")?t.model.replace("models/",""):t.model)===(e.model.startsWith("models/")?e.model.replace("models/",""):e.model))continue;throw new et(`Different value for "${n}" specified in modelParams (${t[n]}) and cachedContent (${e[n]})`)}let o=Object.assign(Object.assign({},t),{model:e.model,tools:e.tools,toolConfig:e.toolConfig,systemInstruction:e.systemInstruction,cachedContent:e});return new eS(this.apiKey,o,n)}}C(W).setLevel("info"),C(W).info("Application started");let eb=[],eL=[],eM=!1;const ex=JSON.parse(localStorage.getItem("email")),eD=JSON.parse(localStorage.getItem("userID"));async function eB(){y=new eR((await (0,X.getDoc)((0,X.doc)(V.db,"apikey","googlegenai"))).data().key).getGenerativeModel({model:"gemini-1.5-flash"})}async function eH(e){return await y.generateContent(e)}async function eF(){let e=(0,X.query)((0,X.collection)(V.db,"logs",eD,"logs"),(0,X.orderBy)("addTime","desc"));return await (0,X.getDocs)(e)}async function ek(e,t,n,o,s){return(await (0,X.addDoc)((0,X.collection)(V.db,"logs",eD,"logs"),{title:e,author:t,genre:n,rating:o,thoughts:s,addTime:(0,X.Timestamp).now(),deleted:!1})).id}async function eP(e){(0,X.updateDoc)((0,X.doc)(V.db,"logs",eD,"logs",e),{deleted:!0}),document.getElementById(`id_${e}`).remove()}async function eU(){E||(E=[],(await eF()).docs.forEach(e=>{let t=e.data();t.deleted||E.push({id:e.id,data:{title:t.title,author:t.author,genre:t.genre,rating:parseInt(t.rating),thoughts:t.thoughts}})})),e.innerHTML="",E.forEach(e=>{let o=e.data;e$(o.author),eG(o.genre),0==t.value.length&&0==n.value.length?ej(e.id,o.title,o.author,o.genre,o.rating,o.thoughts):0==t.value&&n.value==o.genre?ej(e.id,o.title,o.author,o.genre,o.rating,o.thoughts):t.value==o.author&&0==n.value?ej(e.id,o.title,o.author,o.genre,o.rating,o.thoughts):t.value==o.author&&n.value==o.genre&&ej(e.id,o.title,o.author,o.genre,o.rating,o.thoughts)})}function e$(e){if(!eb.includes(e)){eb.push(e),eb.sort(),t.innerHTML="";let n=document.createElement("option");n.value="",n.innerText="No Author Filter",t.appendChild(n),eb.forEach(e=>{let n=document.createElement("option");n.value=e,n.innerText=e,t.appendChild(n)})}}function eG(e){if(!eL.includes(e)){eL.push(e),eL.sort(),n.innerHTML="";let t=document.createElement("option");t.value="",t.innerText="No Genre Filter",n.appendChild(t),eL.forEach(e=>{let t=document.createElement("option");t.value=e,t.innerText=e,n.appendChild(t)})}}function ej(t,n,o,s,a,g,f=!1,m=!1){let p=document.createElement("h3");p.innerText=n;let E=document.createElement("p"),y="";for(let e=1;e<=a;e++)y+="★";E.innerText=y.padEnd(5,"☆"),E.ariaLabel=`Rated ${a} of 5`;let C=document.createElement("p");C.innerText=o,C.ariaLabel=`By ${o}`;let v=document.createElement("p");v.innerText=s,v.ariaLabel=`Genre ${s}`;let O=document.createElement("div");O.appendChild(p),O.appendChild(E),O.appendChild(C),O.appendChild(v);let I=document.createElement("p");I.innerText=g;let T=document.createElement("button");T.type="button",T.innerText="Delete",T.addEventListener("click",()=>{confirm(`Are you sure you want to delete ${n}.`)&&eP(t)});let _=document.createElement("button");_.type="button",_.innerText="Edit",_.addEventListener("click",()=>{i.style.display="block",r.value=n,l.value=o,d.value=s,c.value=`${a}`,u.value=g,h.value=t});let w=document.createElement("div");w.append(T),w.append(_);let N=document.createElement("li");N.id=`id_${t}`,N.appendChild(O),N.appendChild(I),N.appendChild(w),f?e.prepend(N):m?m.after(N):e.appendChild(N)}function eK(e){let t={"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","&":"&amp;","/":"&#x2F;"};return e.replace(/[<>"'&/]/g,e=>t[e])}async function eY(e){e.preventDefault();let t=Object.fromEntries(new FormData(e.target).entries()),n=eK(t.title.trim()),i=eK(t.author.trim()),a=eK(t.genre.trim()),r=parseInt(t.rating),l=eK(t.thoughts.trim()),d=!1;if(n.length<1?d=!0:i.length<1?d=!0:a.length<1&&(d=!0),d){alert("You must fill in all fields.");return}o.style.display="none",s.reset(),eG(a),e$(i);let c=await ek(n,i,a,r,l);E.push({id:c,data:{title:n,author:i,genre:a,rating:parseInt(r),thoughts:l}}),ej(c,n,i,a,r,l,!0)}function eq(e){e.preventDefault();let t=Object.fromEntries(new FormData(e.target).entries()),n=t.id,o=eK(t.title.trim()),s=eK(t.author.trim()),a=eK(t.genre.trim()),r=parseInt(t.rating),l=eK(t.thoughts.trim()),d=!1;if(o.length<1?d=!0:s.length<1?d=!0:a.length<1&&(d=!0),d){alert("You must fill in all fields.");return}(0,X.updateDoc)((0,X.doc)(V.db,"logs",eD,"logs",n),{title:o,author:s,genre:a,rating:r,thoughts:l}),E.find(e=>e.id==n).data={title:o,author:s,genre:a,rating:r,thoughts:l},eG(a),e$(s);let c=document.getElementById(`id_${n}`);c.id="tempId",ej(n,o,s,a,r,l,!1,c),i.style.display="none",E.fin,c.remove()}async function eJ(e){e.preventDefault();let t=Object.fromEntries(new FormData(e.target).entries()).message.trim();if(!(t.length>0))return;let n=document.createElement("p");n.innerText=eK(t),n.classList.add("userMessage"),m.appendChild(n),m.scrollTop=m.scrollHeight,p.reset();let o="";t.toLowerCase().startsWith("add ")?o='Honestly, asking an AI to add a book to a list instead of entering it yourself is unnecesary. Please press "Add" at the top of the screen to add a new book log.':t.toLowerCase().startsWith("delete ")?o='Honestly, asking an AI to delete a book from a list instead of deleting it yourself is unnecesary. Please press "Delete" on the entry you wish to delete.':t.toLowerCase().startsWith("update ")||t.toLowerCase().startsWith("edit ")?o='Honestly, asking an AI to edit a book in a list instead of editing it yourself is unnecesary. Please press "Edit" on the entry you want to edit.':t.toLowerCase().startsWith("logout")||t.toLowerCase().startsWith("sign out")?(o="Ok. Goodbye.",localStorage.removeItem("email"),window.location.href="index.html"):o=(await eH(t)).response.candidates[0].content.parts[0].text;let s=document.createElement("p");s.innerHTML=eK(o),s.classList.add("aiMessage"),m.appendChild(s),m.scrollTop=m.scrollHeight}ex||(window.location.href="index.html"),window.addEventListener("load",()=>{document.getElementById("logout").addEventListener("click",()=>{localStorage.removeItem("email"),window.location.href="index.html"}),e=document.getElementById("logList"),(t=document.getElementById("authorFilter")).addEventListener("change",()=>{eU()}),(n=document.getElementById("genreFilter")).addEventListener("change",()=>{eU()}),document.getElementById("add").addEventListener("click",()=>{o.style.display="block"}),document.getElementById("closeAdd").addEventListener("click",()=>{o.style.display="none",s.reset()}),o=document.getElementById("addBookSection"),(s=document.getElementById("addBook")).addEventListener("submit",eY),i=document.getElementById("editBookSection"),(a=document.getElementById("editBook")).addEventListener("submit",eq),r=document.getElementById("editTitle"),l=document.getElementById("editAuthor"),d=document.getElementById("editGenre"),c=document.getElementById("editRating"),u=document.getElementById("editThoughts"),h=document.getElementById("editId"),document.getElementById("closeEdit").addEventListener("click",()=>{i.style.display="none",a.reset()}),(g=document.getElementById("chatButton")).addEventListener("click",()=>{eM?(eM=!1,g.innerText="Open Chat",f.style.display=""):(eM=!0,g.innerText="Close Chat",f.style.display="flex")}),f=document.getElementById("chatBox"),m=document.getElementById("chatMessages"),(p=document.getElementById("messageForm")).addEventListener("submit",eJ),eB(),eU()});
//# sourceMappingURL=logs.e5da8238.js.map
