import{b as oe}from"./chunk-36XJXSFI.js";import"./chunk-C4QY7PVW.js";import{H as ie,Ua as b,Ya as u,Za as x,_a as R,oa as ae,qa as re,ra as w,sa as g}from"./chunk-WRLF2H3U.js";import{Ga as N,Ia as d,Kb as Z,La as U,Mb as ee,N as P,Pa as c,Q as y,Qa as p,Ra as T,V as F,Va as G,Ya as I,Z as r,Za as H,Zb as te,ca as W,fb as h,ha as B,hb as A,ia as k,k as m,ma as L,mb as C,nb as J,ob as K,pb as Q,q as s,qb as X,qc as _,r as v,ub as o,vb as n,wb as Y,x as S,xa as l,y as O,z as $}from"./chunk-JOLOG3TI.js";var M=(()=>{class t{destroyRef=r(L);tmdbApiService=r(w);authorizationService=r(g);currentPage$=new m(1);state$=new m(u());favoriteFilms$=this.state$.pipe(s(e=>e.value?.results??[]));isLoading$=this.state$.pipe(s(e=>e.status===b.Loading));totalPages$=this.state$.pipe(s(e=>e.value?.total_pages));initialize(){this.loadFilmsEffect()}pageChange(e){this.currentPage$.next(e)}loadFilmsEffect(){let e=this.authorizationService.getSessionId();v([this.currentPage$,this.authorizationService.account$]).pipe(y(()=>{this.state$.next(u())}),P(([i,a])=>this.tmdbApiService.getFavoriteFilms(i,a.id,e)),$(i=>(this.state$.next(R(i)),S)),_(this.destroyRef)).subscribe(i=>{this.state$.next(x(i))})}static \u0275fac=function(i){return new(i||t)};static \u0275prov=F({token:t,factory:t.\u0275fac})}return t})();var q=(()=>{class t{destroyRef=r(L);tmdbApiService=r(w);authorizationService=r(g);currentPage$=new m(1);state$=new m(u());ratedFilms$=this.state$.pipe(s(e=>e.value?.results??[]));isLoading$=this.state$.pipe(s(e=>e.status===b.Loading));totalPages$=this.state$.pipe(s(e=>e.value?.total_pages));initialize(){this.loadFilmsEffect()}pageChange(e){this.currentPage$.next(e)}loadFilmsEffect(){let e=this.authorizationService.getSessionId();v([this.currentPage$,this.authorizationService.account$]).pipe(y(()=>{this.state$.next(u())}),P(([i,a])=>this.tmdbApiService.getRatedFilms(i,a.id,e)),$(i=>(this.state$.next(R(i)),S)),_(this.destroyRef)).subscribe(i=>{this.state$.next(x(i))})}static \u0275fac=function(i){return new(i||t)};static \u0275prov=F({token:t,factory:t.\u0275fac})}return t})();var V=(()=>{class t{destroyRef=r(L);tmdbApiService=r(w);authorizationService=r(g);currentPage$=new m(1);state$=new m(u());watchList$=this.state$.pipe(s(e=>e.value?.results??[]));isLoading$=this.state$.pipe(s(e=>e.status===b.Loading));totalPages$=this.state$.pipe(s(e=>e.value?.total_pages));initialize(){this.loadFilmsEffect()}pageChange(e){this.currentPage$.next(e)}loadFilmsEffect(){let e=this.authorizationService.getSessionId();v([this.currentPage$,this.authorizationService.account$]).pipe(y(()=>{this.state$.next(u())}),P(([i,a])=>this.tmdbApiService.getWatchList(i,a.id,e)),$(i=>(this.state$.next(R(i)),S)),_(this.destroyRef)).subscribe(i=>{this.state$.next(x(i))})}static \u0275fac=function(i){return new(i||t)};static \u0275prov=F({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function ce(t,ne){t&1&&(T(0,"tui-avatar",4),c(1,"div",5),T(2,"div",6)(3,"div",6)(4,"div",6),p()),t&2&&d("tuiSkeleton",!0)}function pe(t,ne){if(t&1&&(T(0,"tui-avatar",7),o(1,"tuiFallbackSrc"),o(2,"async"),c(3,"div",5)(4,"div",8),h(5),p(),c(6,"div",9),h(7),p(),c(8,"div",10),h(9),p()()),t&2){H();let e=K(0);d("src",n(2,7,Y(1,4,"https://image.tmdb.org/t/p/w500/"+e.avatar.tmdb.avatar_path,"@tui.user"))),l(5),A(" ",e.name," "),l(2),A(" ",e.username," "),l(2),A("ID: ",e.id,"")}}var et=(()=>{class t{authorizationService=r(g);favoriteFilmsService=r(M);watchListFilmsService=r(V);ratedFilmsService=r(q);router=r(te);account$=this.authorizationService.account$;accountLoading$=this.authorizationService.accountLoading$;favoriteFilms$=this.favoriteFilmsService.favoriteFilms$;watchList$=this.watchListFilmsService.watchList$;watchListTotalPages$=this.watchListFilmsService.totalPages$;favoriteTotalPages$=this.favoriteFilmsService.totalPages$;isLoadingFavorites$=this.favoriteFilmsService.isLoading$;isLoadingWathList$=this.watchListFilmsService.isLoading$;ratedFilms$=this.ratedFilmsService.ratedFilms$;ratedTotalPages$=this.ratedFilmsService.totalPages$;isLoadingRated$=this.ratedFilmsService.isLoading$;ngOnInit(){this.favoriteFilmsService.initialize(),this.watchListFilmsService.initialize(),this.ratedFilmsService.initialize(),this.account$.pipe(O(e=>!e)).subscribe(()=>this.router.navigate(["/"]))}onWatchlistPageChanged(e){this.watchListFilmsService.pageChange(e)}onFavoritePageChanged(e){this.favoriteFilmsService.pageChange(e)}onRatedPageChanged(e){this.ratedFilmsService.pageChange(e)}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=W({type:t,selectors:[["app-profile-page"]],standalone:!0,features:[Q([M,V,q]),X],decls:31,vars:36,consts:[[1,"profile-row"],[1,"profile-row","profile-row_films"],[1,"profile-item-title","tui-text_body-m",3,"tuiSkeleton"],[3,"pageChanged","films","totalPages","isLoading"],["size","xxl",3,"tuiSkeleton"],[1,"account-info"],["tuiSkeleton","Thistextwillbereplacedby"],["size","xxl",1,"avatar",3,"src"],[1,"tui-text_h4"],[1,"tui-text_body-l"],[1,"tui-text_body-s"]],template:function(i,a){if(i&1){let E=G();C(0),o(1,"async"),C(2),o(3,"async"),C(4),o(5,"async"),C(6),o(7,"async"),C(8),o(9,"async"),c(10,"div",0),N(11,ce,5,1)(12,pe,10,9),p(),c(13,"div",1)(14,"div",2),h(15," \u0418\u0437\u0431\u0440\u0430\u043D\u043D\u044B\u0435 \u0444\u0438\u043B\u044C\u043C\u044B: "),p(),c(16,"app-film-cards",3),o(17,"async"),o(18,"async"),I("pageChanged",function(f){return B(E),k(a.onFavoritePageChanged(f))}),p()(),c(19,"div",1)(20,"div",2),h(21," \u0411\u0443\u0434\u0443 \u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C: "),p(),c(22,"app-film-cards",3),o(23,"async"),o(24,"async"),I("pageChanged",function(f){return B(E),k(a.onWatchlistPageChanged(f))}),p()(),c(25,"div",1)(26,"div",2),h(27," \u041E\u0446\u0435\u043D\u043A\u0438 \u0444\u0438\u043B\u044C\u043C\u043E\u0432: "),p(),c(28,"app-film-cards",3),o(29,"async"),o(30,"async"),I("pageChanged",function(f){return B(E),k(a.onRatedPageChanged(f))}),p()()}if(i&2){let E=J(n(1,13,a.account$)),z=n(3,16,a.accountLoading$),f=n(5,18,a.isLoadingFavorites$),j=n(7,20,a.isLoadingWathList$),se=n(9,22,a.isLoadingRated$);l(11),U(z?11:E?12:-1),l(3),d("tuiSkeleton",f),l(2),d("films",n(17,24,a.favoriteFilms$))("totalPages",n(18,26,a.favoriteTotalPages$))("isLoading",f),l(4),d("tuiSkeleton",j),l(2),d("films",n(23,28,a.watchList$))("totalPages",n(24,30,a.watchListTotalPages$))("isLoading",j),l(4),d("tuiSkeleton",j),l(2),d("films",n(29,32,a.ratedFilms$))("totalPages",n(30,34,a.ratedTotalPages$))("isLoading",se)}},dependencies:[ee,Z,ae,re,ie,oe],styles:["[_nghost-%COMP%]{display:block;padding:20px 0;background-color:var(--tui-background-base-alt)}.profile-row[_ngcontent-%COMP%]{display:flex;justify-content:space-around;gap:16px;padding:0 24px}.profile-row_films[_ngcontent-%COMP%]{flex-direction:column}.profile-row[_ngcontent-%COMP%] + .profile-row[_ngcontent-%COMP%]{margin-top:40px}@media screen and (max-width: 47.9625em){.profile-row[_ngcontent-%COMP%]{flex-direction:column;align-items:center;margin-left:0}}.account-info[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center}"],changeDetection:0})}return t})();export{et as ProfilePageComponent};