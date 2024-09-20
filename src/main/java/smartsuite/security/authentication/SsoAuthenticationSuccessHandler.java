package smartsuite.security.authentication;

import java.io.IOException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.common.collect.Maps;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.web.servlet.FlashMap;
import org.springframework.web.servlet.FlashMapManager;
import org.springframework.web.servlet.support.RequestContextUtils;
import org.springframework.web.servlet.support.SessionFlashMapManager;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import smartsuite.app.common.shared.service.SharedService;
import smartsuite.security.userdetails.UserDetailsProxy;

public class SsoAuthenticationSuccessHandler extends
		SavedRequestAwareAuthenticationSuccessHandler {
	
	@Inject
	private SharedService sharedService;
	
	@Inject
	public AuthenticationPostService authenticationPostService;	
	
	private final RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();
	
	// 싱글페이지 URL
	private String singlePageTargetUrl;
	
	// 싱글페이지 여부
	private boolean useSinglePage;
	
    protected final String getSinglePageTargetUrl() {
        return singlePageTargetUrl;
    }
    
    public void setSinglePageTargetUrl(String targetUrl) {
        this.singlePageTargetUrl = targetUrl;
    }
    
    protected boolean getUseSinglePage() {
    	return useSinglePage;
    }
    protected void setUseSinglePage(boolean useSingle){
    	this.useSinglePage = useSingle;
    }
	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
			throws ServletException, IOException, JsonProcessingException{
		
		// 현재 로그인 성공한 user 객체 조회
		Object principal = authentication.getPrincipal();
		UserDetailsProxy proxy = null;
		if (principal instanceof UserDetails) {
			proxy = (UserDetailsProxy)principal;
		}
		
		// 사용자 역할에 따른 메뉴-기능-URL 역할정보 session 저장
		if(proxy != null){
			proxy.setUserRoles(sharedService.findListMenuFunctionAndUrlByUserRoleList());
			// 사용자 운영조직 정보 저장
			proxy.setUserOperationOrganizationCodes(sharedService.findListOperationOrganizationByUser(null));
		}
		
		Map<String, Object> loginInfo = Maps.newHashMap();
		loginInfo.put("log_id", UUID.randomUUID().toString());
		loginInfo.put("usr_typ_ccd", (String)Auth.getCurrentUserInfo().get("usr_typ_ccd"));
		loginInfo.put("login_ip", request.getRemoteAddr());
		sharedService.insertLoginLogInfo(loginInfo);

		// Parameter Set, redirect 시 url에 파라미터가 포함되지 않도록 flashMap을 이용하여 사용
		FlashMap flashMap = new FlashMap();
		Map<String, Object> paramMap = Maps.newHashMap();
		Enumeration<String> params = request.getParameterNames();
		while (params.hasMoreElements()){
			String key = (String) params.nextElement();
		    paramMap.put(key, request.getParameter(key));
		}
		// Json parsing Set
		flashMap.put("paramMap", new ObjectMapper().writeValueAsString(paramMap));
		
		// Parameter MenuId Check 
		boolean existsMenuId = (paramMap.get("menuId") != null) ? true : false;
		setUseSinglePage(existsMenuId);
		
		FlashMapManager flashMapManager = RequestContextUtils.getFlashMapManager(request);
		if (flashMapManager == null) {
			flashMapManager = new SessionFlashMapManager();
		}
		flashMapManager.saveOutputFlashMap(flashMap, request, response);
		
		authenticationPostService.authenticationSuccess(request, response, authentication);
		
		super.onAuthenticationSuccess(request, response, authentication);
	}
	
	// Redirect Page 설정
	protected void handle(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
		      throws IOException {
		  
      String targetUrl = determineTargetUrl();
      if (response.isCommitted()) {
          logger.debug("Response has already been committed. Unable to redirect to " + targetUrl);
          return;
      }
      redirectStrategy.sendRedirect(request, response, targetUrl);
    }
	
	// Target Url 설정
	protected String determineTargetUrl() {
        if (getUseSinglePage()) {
            return getSinglePageTargetUrl();
        } else  {
            return getDefaultTargetUrl();
        } 
    }
}
